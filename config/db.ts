import { env } from 'process';
const productConfig = {
  redis: {
    port: '6379',
    host: '127.0.0.1',
    db: 'generic-redis',
    password: '',
  },
};

const localConfig = {
  redis: {
    port: '6379',
    host: 'localhost',
    db: 'harley',
    password: '',
  },
};

const config = process.env.NODE_ENV === 'production' ? productConfig : localConfig;

export default config;
