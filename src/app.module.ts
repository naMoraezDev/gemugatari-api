import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './modules/tags/tags.module';
import { PostsModule } from './modules/posts/posts.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MatchesModule } from './modules/matches/matches.module';
import { ContentModule } from './modules/content/content.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { GlobalExceptionFilter } from './common/filters/http-exceptions.filter';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TagsModule,
    PostsModule,
    MatchesModule,
    ContentModule,
    CategoriesModule,
    TournamentsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
