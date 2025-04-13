import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dtos/api-response.dto';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  private readonly excludedRoutes = [
    '/v1/health/liveness',
    '/v1/health/readiness',
  ];

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    const request = context.switchToHttp().getRequest();

    if (this.excludedRoutes.includes(request.url)) {
      return next.handle();
    }

    const request_id = uuidv4();
    const isCached = false;

    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Request-ID', request_id);

    return next.handle().pipe(
      map((data) => {
        if (data instanceof ApiResponseDto) {
          if (!data.meta) {
            data.meta = {
              timestamp: new Date().toISOString(),
            };
          }

          if (!data.meta.request_id) {
            data.meta.request_id = request_id;
          }

          if (data.meta.cached === undefined) {
            data.meta.cached = isCached;
          }

          return data;
        }

        return ApiResponseDto.success(data, {
          request_id,
          cached: isCached,
        });
      }),
    );
  }
}
