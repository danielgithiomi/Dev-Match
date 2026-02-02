import {
  CallHandler,
  ExecutionContext,
  Global,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { ResponseSummary } from '@shared/types';
import { RESPONSE_SUMMARY_REFLECTOR_KEY as summary_key } from '@shared/constants';

interface GlobalInterceptor<T> {
  body: T;
  success: boolean;
  statusCode: number;
  summary: ResponseSummary;
  metadata: {
    endpoint: string;
    timestamp: string;
    requestId: string;
  };
}

@Global()
@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<
  T,
  GlobalInterceptor<T>
> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GlobalInterceptor<T>> {
    const cxt = context.switchToHttp();
    const request = cxt.getRequest();
    const response = cxt.getResponse();

    const summary = this.reflector.get<ResponseSummary>(
      summary_key,
      context.getHandler(),
    ) ?? { message: 'Operation Successful' };

    return next.handle().pipe(
      map((body) => ({
        success: true,
        statusCode: response.statusCode,
        body,
        summary: {
          message: summary.message,
          description: summary.description,
        },
        metadata: {
          endpoint: request.url,
          timestamp: new Date().toISOString(),
          requestId: randomUUID(),
        },
      })),
    );
  }
}
