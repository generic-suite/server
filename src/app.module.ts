import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
// import { LoggerMiddleware } from './middleware/logger/logger.middleware'; // 日志
import { CommodityModule } from './commodity/commodity.module';

import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express'; // 文件上传
import { diskStorage } from 'multer';
import * as path from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SystemConfigModule } from './system-config/system-config.module';
import { SysDictTypeModule } from './sys-dict-type/sys-dict-type.module';
import { SysDictDataModule } from './sys-dict-data/sys-dict-data.module';
import { SysConfigTextModule } from './sys-config-text/sys-config-text.module';
import { GoodsModule } from './goods/goods.module';
import { AppListModule } from './app-list/app-list.module';
import { MidBankModule } from './mid-bank/mid-bank.module';
import { MidOrderModule } from './mid-order/mid-order.module';
import { VipListModule } from './vip-list/vip-list.module';
import { MidVipModule } from './mid-vip/mid-vip.module';
import { MidUserModule } from './mid-user/mid-user.module';
import { MidWalletFlowModule } from './mid-wallet-flow/mid-wallet-flow.module';
import { MidWithdrawModule } from './mid-withdraw/mid-withdraw.module';
import { CustomerModule } from './customer/customer.module';
import envConfig from '../config/env';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CommodityModule,
    // 文件上传
    MulterModule.register({
      storage: diskStorage({
        // 指定文件存储目录
        destination: path.join(__dirname, '../uploads'), // 通过时间戳来重命名上传的文件名
        filename: (_, file, callback) => {
          const fileName = `${new Date().getTime() + path.extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),
    ScheduleModule.forRoot(), // 定时任务模块
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块
      envFilePath: [envConfig.path], // 环境配置文件
    }),
    // 数据库链接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config) => {
        const isProd = config.get('NODE_ENV') === 'production';
        return {
          type: 'mysql', // 数据库类型
          host: config.get('DB_HOST'), // 主机，默认为localhost
          port: config.get('DB_PORT'), // 端口，默认为3306
          username: config.get('DB_USER') || 'root', // 用户名
          password: config.get('DB_PASSWORD') || '123456', // 密码
          database: config.get('DB_DATABASE'), // 数据库名
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: !isProd,
          timezone: '+08:00', // 服务器上配置的时区
        };
      },
    }),
    SystemConfigModule,
    SysDictTypeModule,
    SysDictDataModule,
    SysConfigTextModule,
    GoodsModule,
    AppListModule,
    MidBankModule,
    MidOrderModule,
    VipListModule,
    MidVipModule,
    MidUserModule,
    MidWalletFlowModule,
    MidWithdrawModule,
    CustomerModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
// 日志
// export class AppModule implements NestModule {
//   configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('user');
//   }
// }
export class AppModule {}
