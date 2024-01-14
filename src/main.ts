import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger/logger.middleware';
import { TransformInterceptor, LoggerInterceptor } from './interceptor/transform/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域访问
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger); // 日志中间件
  app.useGlobalInterceptors(new TransformInterceptor()); // 使用全局拦截器处理返回格式
  app.useGlobalInterceptors(new LoggerInterceptor()); // 使用全局拦截器打印出参
  app.useGlobalFilters(new HttpExceptionFilter()); // 使用全局过滤器处理异常
  app.setGlobalPrefix('api'); // 前缀
  app.use('/uploads', express.static(`${__dirname}/../uploads`)); // 允许访问的静态资源
  await app.listen(3000);
}
bootstrap();
