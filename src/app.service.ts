import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from './user/user.service';

import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  // @Cron('45/2 * * * * *')
  // async handleCron() {
  //   // 生成2位的随机数
  //   const num = Math.floor(Math.random() * 100);
  //   const str = await this.userService.enter();
  //   console.log('2秒执行一次', str, num);
  // }
  getHello(): string {
    return 'Hello World!';
  }

  uploadFile(file: Express.Multer.File) {
    console.log(file);
    // 返回当前服务器的地址
    // const baseUrl = process.env.SYSTEM_SERVER_URL;
    return {
      code: 200,
      success: true,
      message: '上传成功',
      data: {
        url: `/uploads/${file.filename}`,
        size: file.size,
        originalname: file.originalname,
        suffix: file.mimetype.split('/')[1],
      },
    };
  }

  // 每日0点的定时任务
  @Cron('0 0 0 * * *')
  async handleCron() {
    this.eventEmitter.emit('clear_order_count');
  }
}
