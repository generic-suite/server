// import * as Redis from 'ioredis';
import { Logger } from '../utils/log4js';
import config from '../../config/db';
// import * as Redis from 'ioredis';
import { createClient } from 'redis';

let n: number = 0;
const redisIndex = []; // 用来记录redis实例索引
const redisList = []; // 用来记录redis实例

export class RedisInstance {
  static async initRedis(method: string, db: number = 0) {
    const isExist = redisIndex.some((x) => x === db); // 判断是否已经实例化
    if (!isExist) {
      Logger.debug(`redis-${db} 来自 ${method} 方法调用 实例化了${++n}次 init...`);
      redisIndex.push(db);
      const client = createClient({
        ...config.redis,
      });
      await client.connect();
      redisList[db] = client;
    } else {
      Logger.info(`redis-${db} has been init`);
    }
    return redisList[db];
  }
}
