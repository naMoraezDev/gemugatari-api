import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private modelName: string;
  private generativeAI: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não encontrada no .env');
    }

    this.modelName = 'gemini-2.0-flash';
    this.generativeAI = new GoogleGenAI({ apiKey });
  }

  async rewriteTitle(originalTitle: string): Promise<string | undefined> {
    try {
      const prompt = `
        Reescreva completamente o seguinte título em outras palavras, mantendo 
        exatamente o mesmo significado, mas com linguagem diferente do original e em português do Brasil. 
        Retorne apenas o título reescrito sem formatação adicional:

        ${originalTitle}
      `;

      const result = await this.generativeAI.models.generateContent({
        model: this.modelName,
        contents: prompt,
      });

      return result.text;
    } catch (error) {
      console.error('Error rewriting title with Gemini:', error);
      throw new Error(`Gemini API Failure: ${error.message}`);
    }
  }

  async rewriteDescriptionAsHTML(
    originalDescription: string,
  ): Promise<string | undefined> {
    try {
      const prompt = `
        Reescreva apenas a descrição principal do seguinte texto em outras palavras, 
        mantendo exatamente o mesmo significado, mas com linguagem diferente do original.
        
        INSTRUÇÕES CRÍTICAS:
        1. RETORNE APENAS a descrição principal reescrita
        2. NÃO INCLUA metadados, tags, palavras-chave ou informações adicionais
        3. NÃO MENCIONE o nome do site original, plataforma, ou fonte do conteúdo (como Esports Charts, HLTV, etc.)
        4. REMOVA qualquer frase que mencione "acompanhe na página de", "você pode conferir em", "visite nosso site"
        5. REMOVA qualquer referência a "página de cobertura", "página de relatórios" ou similares
        6. NÃO ADICIONE qualquer texto introdutório ou conclusivo seu
        7. FORMATE a descrição como HTML válido para WordPress:
           - Use <p> para parágrafos
           - Use <strong> para enfatizar informações importantes
           - Use <em> para ênfase secundária
           - Mantenha links originais utilizando tags <a>
        8. Retorne APENAS o HTML da descrição, sem qualquer texto adicional
        9. SEMPRE traduza o conteúdo para português do Brasil

        
        Descrição a ser reescrita:
  
        ${originalDescription}
      `;

      const result = await this.generativeAI.models.generateContent({
        model: this.modelName,
        contents: prompt,
      });

      return this.advancedCleanupHTML(result.text);
    } catch (error) {
      console.error('Error rewriting description with Gemini:', error);
      throw new Error(`Gemini API Failure: ${error.message}`);
    }
  }

  async rewriteContentAsHTML(
    originalContent: string,
  ): Promise<string | undefined> {
    try {
      const prompt = `
      Reescreva o seguinte conteúdo em outras palavras, mantendo exatamente o mesmo significado e informações essenciais, 
      mas com linguagem completamente diferente do original.

      INSTRUÇÕES CRÍTICAS:
      1. PARE DE ESCREVER imediatamente quando o conteúdo principal do artigo terminar
      2. NÃO INCLUA biografias de autores, seções "sobre o autor", assinaturas
      3. NÃO INCLUA seções de "artigos relacionados", "leia também", "notícias recentes"
      4. NÃO INCLUA comentários, formulários, anúncios, rodapés
      5. NÃO INCLUA tags, palavras-chave, categorias, metadados
      6. NÃO MENCIONE o nome do site original, plataforma, ou fonte do conteúdo (como Esports Charts, HLTV, etc.)
      7. REMOVA qualquer frase que mencione "acompanhe na página de", "você pode conferir em", "visite nosso site"
      8. REMOVA qualquer referência a "página de cobertura", "página de relatórios" ou similares
      9. NÃO ADICIONE nenhuma introdução ou conclusão sua
      10. NÃO INCLUA legendas de fotos ou descrições de imagens
      11. REMOVA qualquer menção a fontes de mídia ou créditos de fotos
      12. RETORNE APENAS o texto do corpo principal reformulado como HTML válido para WordPress
      13. Siga estas diretrizes de formatação:
          - Use <p> para parágrafos
          - Use <h2> para subtítulos importantes
          - Use <ul> e <li> para listas
          - Use <strong> para destaque
          - Use <em> para ênfase
          - Use <blockquote> para citações
      
      CONTEÚDO A SER REESCRITO:
      ${originalContent}
    `;

      const result = await this.generativeAI.models.generateContent({
        model: this.modelName,
        contents: prompt,
      });

      return this.advancedCleanupHTML(result.text);
    } catch (error) {
      console.error('Error rewriting content with Gemini:', error);
      throw new Error(`Gemini API Failure: ${error.message}`);
    }
  }

  private advancedCleanupHTML(html?: string): string {
    if (!html) return '';

    let cleanHTML: string = html
      .replace(/blocos de código/g, '')
      .replace(/delimitadores de código/g, '')
      .replace(/```html/g, '')
      .replace(/```/g, '')
      .replace(/^HTML:/i, '')
      .replace(/^Aqui está o conteúdo reescrito:/i, '')
      .replace(/^Conteúdo em HTML:/i, '')
      .replace(/^Aqui está:/i, '')
      .replace(/^Segue abaixo:/i, '')
      .replace(/^Segue o conteúdo:/i, '')
      .replace(/A seguir, o conteúdo reescrito:/i, '')
      .trim();

    cleanHTML = cleanHTML
      .replace(/Espero que isso atenda às suas necessidades\.?$/i, '')
      .replace(/Esse é o conteúdo reescrito\.?$/i, '')
      .replace(/O conteúdo foi reescrito conforme solicitado\.?$/i, '')
      .trim();

    const endContentPatterns = [
      /<p>\s*Espalhe a palavra/i,
      /<p>\s*Compartilhe/i,
      /<p>\s*Compartilhar[:\.]?/i,
      /<p>\s*Share[:\.]?/i,
      /<h2>\s*Artigos relacionados/i,
      /<h2>\s*Leia também/i,
      /<h2>\s*Veja mais/i,
      /<h2>\s*Sobre o autor/i,
      /<h2>\s*Em outras notícias/i,
      /<h2>\s*Palavras-chave/i,
      /<p>\s*Tags:/i,
      /<p>\s*Categoria/i,
      /<p>\s*<strong>Palavras-chave/i,
      /<p>\s*<strong>Tags/i,
      /<p>\s*<strong>Eventos/i,
      /<p>\s*<strong>Equipes/i,

      /<div class=["']?(?:share|social)/i,
      /<p>\s*Siga-nos/i,
      /<p>\s*Inscreva-se/i,
      /<p>\s*Newsletter/i,
    ];

    for (const pattern of endContentPatterns) {
      const match = cleanHTML.match(pattern);
      if (match && match.index !== undefined) {
        cleanHTML = cleanHTML.substring(0, match.index).trim();
      }
    }

    let match: any;
    let lastIndex = 0;
    const paragraphRegex = /<p>([^<]+)<\/p>/g;

    while ((match = paragraphRegex.exec(cleanHTML)) !== null) {
      if (
        match[1].trim().length < 30 &&
        /compartilh|share|follow|seguir|redes sociais|twitter|facebook|inscreva/i.test(
          match[1].trim(),
        )
      ) {
        cleanHTML = cleanHTML.substring(0, match.index).trim();
        break;
      }
      lastIndex = match.index + match[0].length;
    }

    const paragraphs = cleanHTML.split('</p>');
    if (paragraphs.length > 1) {
      const lastParagraph = paragraphs[paragraphs.length - 1];

      if (
        (lastParagraph.trim().length < 100 &&
          !lastParagraph.includes('<h2>')) ||
        /palavras-chave|tags|categorias|autor|compartilhe|compartilhar|follow|publicado/i.test(
          lastParagraph,
        )
      ) {
        paragraphs.pop();
        cleanHTML = paragraphs.join('</p>') + '</p>';
      }
    }

    const lastH2Match = cleanHTML.match(/<h2>[^<]+<\/h2>\s*$/i);
    if (lastH2Match) {
      cleanHTML = cleanHTML.substring(0, lastH2Match.index).trim();
    }

    if (!cleanHTML.startsWith('<')) {
      cleanHTML = `<p>${cleanHTML}</p>`;
    }

    cleanHTML = cleanHTML.replace(/<p>\s*<\/p>/g, '');
    cleanHTML = cleanHTML.replace(/<p><p>/g, '<p>');
    cleanHTML = cleanHTML.replace(/<\/p><\/p>/g, '</p>');

    cleanHTML = cleanHTML.replace(
      /(?<!["'=])https?:\/\/([^\s<>"']+)/g,
      '<a href="$&">$&</a>',
    );

    return cleanHTML;
  }
}
