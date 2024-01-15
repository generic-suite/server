// config/db.ts
const productConfig = {
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    user: 'generic-db',
    password: '3546PS7B5PTDiCw8',
    database: 'generic-db', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: '6379',
    host: '127.0.0.1',
    db: 'generic-redis',
    password: '',
  },
};

const localConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nest-zero2one', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: '6379',
    host: 'localhost',
    db: 'harley',
    password: '',
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
