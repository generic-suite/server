import { env } from 'process';

const redisConfig = {
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  host: process.env.REDIS_HOST || '127.0.0.1',
  password: process.env.REDIS_PASSWORD || '',
  // 保留原有的 db 字段以防万一，但优先使用环境变量配置
  db: 0, 
};

const config = {
  redis: redisConfig
};

export default config;
