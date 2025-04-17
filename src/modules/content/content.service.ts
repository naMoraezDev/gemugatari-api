import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { GeminiService } from 'src/integrations/gemini/gemini.service';
import { RewrittenArticle } from './interfaces/rewritten-article.interface';

@Injectable()
export class ContentService {
  constructor(private readonly geminiService: GeminiService) {}

  async scrapeAndRewriteArticle(articleUrl: string): Promise<RewrittenArticle> {
    try {
      const articleContent = await this.extractArticleContent(articleUrl);

      const rewrittenArticle = await this.rewriteArticleContent(articleContent);

      return rewrittenArticle;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to process article: ${error.message}`,
      );
    }
  }

  private async extractArticleContent(articleUrl: string): Promise<{
    url: string;
    title: string;
    content: string;
    description: string;
  }> {
    let browser: puppeteer.Browser | null = null;

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
        ],
      });

      const page = await browser.newPage();

      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      );

      await page.setViewport({ width: 1366, height: 768 });

      await page.goto(articleUrl, {
        timeout: 30000,
        waitUntil: 'networkidle2',
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const pageData = await page.evaluate(() => {
        const cleanText = (text: string): string => {
          return text
            .replace(/\s+/g, ' ')
            .replace(/\n\s*\n/g, '\n\n')
            .trim();
        };

        const extractTitle = (): string => {
          const titleSelectors = [
            'h1',
            '.headline',
            'article h1',
            '.post-title',
            '.entry-title',
            '.article-title',
            '[class*="Title_"]',
            '[class*="heading"]',
            '[class*="title"]:not(meta)',
            '[class*="blogentrypage_Title"]',
          ];

          for (const selector of titleSelectors) {
            const element = document.querySelector(selector);
            if (
              element &&
              element.textContent &&
              element.textContent.trim().length > 0
            ) {
              return element.textContent.trim();
            }
          }

          return document.title.trim();
        };

        const extractDescription = (): string => {
          const metaDesc = document.querySelector('meta[name="description"]');
          const ogDesc = document.querySelector(
            'meta[property="og:description"]',
          );

          return (
            metaDesc?.getAttribute('content') ||
            ogDesc?.getAttribute('content') ||
            ''
          );
        };

        const extractContent = (): string => {
          const contentSelectors = [
            'main',
            'article',
            '.content',
            '.news-text',
            '.article-body',
            '.post-content',
            '.entry-content',
            '[class*="Body_"]',
            '[class*="content"]',
            '[class*="blogentrypage_Body"]',
            '[class*="body"], [class*="article"], [class*="blog"]',
          ];

          for (const selector of contentSelectors) {
            const contentElement = document.querySelector(selector);
            if (contentElement) {
              Array.from(
                contentElement.querySelectorAll(
                  'script, style, iframe, aside, .advertisement, .comments, .social-share, .related-articles, .newsletter, .subscription',
                ),
              ).forEach((el) => el.remove());

              let content = '';

              const childNodes = contentElement.childNodes;
              for (let i = 0; i < childNodes.length; i++) {
                const node = childNodes[i];

                if (node.nodeType === Node.TEXT_NODE) {
                  const textContent = node.textContent;
                  if (textContent && textContent.trim()) {
                    content += textContent + '\n';
                  }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element;

                  if (element.tagName === 'IMG') {
                    const src = element.getAttribute('src');
                    if (src) {
                      content += `[IMAGE: ${src}]\n`;
                    }
                  } else if (
                    [
                      'P',
                      'H1',
                      'H2',
                      'H3',
                      'H4',
                      'H5',
                      'H6',
                      'DIV',
                      'SPAN',
                    ].includes(element.tagName)
                  ) {
                    const text = element.textContent;
                    if (text && text.trim()) {
                      content += text.trim() + '\n\n';
                    }
                  }
                }
              }

              if (content.trim()) {
                return cleanText(content);
              }
            }
          }

          const paragraphsAndHeadings = Array.from(
            document.querySelectorAll(
              'p, h1, h2, h3, h4, h5, h6, [class*="paragraph"]',
            ),
          )
            .filter((el) => {
              const text = el.textContent || '';
              return text.length > 20 || text.includes('.');
            })
            .map((el) => {
              const text = el.textContent;
              return text ? text.trim() : '';
            })
            .filter((text) => text.length > 0);

          if (paragraphsAndHeadings.length > 0) {
            return cleanText(paragraphsAndHeadings.join('\n\n'));
          }

          const mainContent = document.body;
          if (mainContent) {
            const nonContentSelectors = [
              'nav',
              'aside',
              '.menu',
              'footer',
              'header',
              '.latest',
              '.sidebar',
              '.related',
              '.comments',
              '.advertisement',
              '[class*="Header_"]',
              '[class*="Footer_"]',
              '[class*="NavItems"]',
              '[class*="LatestNews"]',
            ];

            for (const selector of nonContentSelectors) {
              const elements = document.querySelectorAll(selector);
              elements.forEach((el) => {
                (el as HTMLElement).style.display = 'none';
              });
            }

            const visibleTextNodes: string[] = [];
            const walker = document.createTreeWalker(
              mainContent,
              NodeFilter.SHOW_TEXT,
              {
                acceptNode: (node) => {
                  if (!node.textContent) {
                    return NodeFilter.FILTER_REJECT;
                  }

                  let parent = node.parentElement;
                  while (parent) {
                    const style = window.getComputedStyle(parent);
                    if (
                      style.display === 'none' ||
                      style.visibility === 'hidden'
                    ) {
                      return NodeFilter.FILTER_REJECT;
                    }
                    parent = parent.parentElement;
                  }

                  return node.textContent.trim().length > 0
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
                },
              },
            );

            let textNode;
            while ((textNode = walker.nextNode())) {
              const text = textNode.textContent;
              if (text && text.trim() && text.trim().length > 1) {
                visibleTextNodes.push(text.trim());
              }
            }

            if (visibleTextNodes.length > 0) {
              return cleanText(visibleTextNodes.join('\n'));
            }
          }

          return cleanText(document.body.innerText || '');
        };

        const title = extractTitle();
        const content = extractContent();
        const description = extractDescription();

        return {
          title,
          content,
          description,
        };
      });

      if (!pageData.title || !pageData.content) {
        throw new BadRequestException('Unable to extract article content');
      }

      return {
        url: articleUrl,
        title: pageData.title,
        content: pageData.content,
        description: pageData.description,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error extracting content from ${articleUrl}: ${error.message}`,
      );
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  private async rewriteArticleContent(article: {
    url: string;
    title: string;
    content: string;
    description: string;
  }): Promise<RewrittenArticle> {
    try {
      const rewrittenTitle = await this.geminiService.rewriteTitle(
        article.title,
      );

      const rewrittenDescription = article.description
        ? await this.geminiService.rewriteDescriptionAsHTML(article.description)
        : '';

      const maxContentLength = 4000;
      let rewrittenContent: string | undefined = '';

      if (article.content.length > maxContentLength) {
        const contentChunks = this.splitContentIntoChunks(
          article.content,
          maxContentLength,
        );

        let combinedHTML = '';
        for (const chunk of contentChunks) {
          const rewrittenChunk =
            await this.geminiService.rewriteContentAsHTML(chunk);
          combinedHTML += rewrittenChunk || '';
        }

        rewrittenContent = this.ensureValidHTML(combinedHTML);
      } else {
        rewrittenContent = await this.geminiService.rewriteContentAsHTML(
          article.content,
        );
      }

      return {
        title: rewrittenTitle,
        description: rewrittenDescription,
        content: rewrittenContent?.trim() || '',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error rewriting article ${article.url}: ${error.message}`,
      );
    }
  }

  private ensureValidHTML(html: string): string {
    if (!html) return '';

    let cleanHTML = html
      .replace(/```/g, '')
      .replace(/^HTML:/i, '')
      .replace(/```html/g, '')
      .replace(/^Conteúdo em HTML:/i, '')
      .replace(/^Aqui está o conteúdo reescrito:/i, '')
      .trim();

    if (!cleanHTML.startsWith('<')) {
      cleanHTML = `<p>${cleanHTML}</p>`;
    }

    cleanHTML = cleanHTML.replace(/<p>\s*<\/p>/g, '');

    cleanHTML = cleanHTML.replace(/<p><p>/g, '<p>');
    cleanHTML = cleanHTML.replace(/<\/p><\/p>/g, '</p>');

    cleanHTML = cleanHTML.replace(/\[IMAGE: ([^\]]+)\]/g, (match, src) => {
      return `<img src="${src}" alt="Article image" />`;
    });

    cleanHTML = cleanHTML.replace(
      /(?<!["'=])https?:\/\/([^\s<>"']+)/g,
      '<a href="$&">$&</a>',
    );

    return cleanHTML;
  }

  private splitContentIntoChunks(
    content: string,
    maxChunkSize: number,
  ): string[] {
    const chunks: string[] = [];
    const paragraphs = content.split(/\n\s*\n/);

    let currentChunk = '';

    for (const paragraph of paragraphs) {
      if (paragraph.startsWith('[IMAGE:')) {
        if (currentChunk.length > 0) {
          chunks.push(currentChunk);
        }
        chunks.push(paragraph);
        currentChunk = '';
        continue;
      }

      if (
        currentChunk.length + paragraph.length > maxChunkSize &&
        currentChunk.length > 0
      ) {
        chunks.push(currentChunk);
        currentChunk = '';
      }

      if (paragraph.length > maxChunkSize) {
        const sentences = paragraph.split(/(?<=[.!?])\s+/);
        let sentenceChunk = '';

        for (const sentence of sentences) {
          if (
            sentenceChunk.length + sentence.length > maxChunkSize &&
            sentenceChunk.length > 0
          ) {
            chunks.push(sentenceChunk);
            sentenceChunk = '';
          }
          sentenceChunk += sentence + ' ';
        }

        if (sentenceChunk.length > 0) {
          currentChunk += sentenceChunk;
        }
      } else {
        currentChunk += paragraph + '\n\n';
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk);
    }

    return chunks;
  }
}
