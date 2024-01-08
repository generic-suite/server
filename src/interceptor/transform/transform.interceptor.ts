import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 打印日志
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((result) => {
        if (result && result.__code) {
          return {
            code: result.__code,
            msg: result.__message,
            success: result.__success,
            data: null,
          };
        }
        // 兼容之前的写法
        if (result && result.code && result.msg) {
          console.log('兼容了之前的写法');
          return result;
        }
        return {
          code: 200,
          msg: '操作成功',
          success: true,
          data: result,
        };
      }),
    );
  }
}

export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 打印日志
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${JSON.stringify(data?.data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        // Logger.info(logFormat);
        Logger.access(logFormat);
        return data;
      }),
    );
  }
}
