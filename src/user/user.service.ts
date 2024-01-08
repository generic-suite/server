import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { makeSalt, encryptPassword } from '../utils/cryptogram';

// 连接数据库
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';

import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    const name = username;
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: name,
        },
      });
      return user;
    } catch (error) {
      return void 0;
    }
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { username, realname, password, repassword, mobile, deal_pass, invite_code } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码不一致',
      };
    }
    const user = await this.findOne(username);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }

    // 制作密码盐
    const passwordSalt = makeSalt();
    // 制作密码
    const hashPwd = encryptPassword(password, passwordSalt);
    // 创建用户
    const newUser = {
      username,
      realname,
      password: hashPwd,
      passwordSalt,
      mobile,
    };
    // 保存用户
    const createUser = await this.userRepository.save(newUser);
    const resUser = {
      username: newUser.username,
      realname: newUser.realname,
      mobile: newUser.mobile,
      userId: createUser.userId,
      deal_pass: deal_pass, // 提现密码
      invite_code: invite_code, // 邀请码
    };
    // 触发事件
    this.eventEmitter.emit('new_user_register', resUser);
    return resUser;
  }

  async enter() {
    // 创建一个异步任务
    const task = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('异步任务执行成功');
        }, 3000);
      });
    };

    const result = await task(); // 等待异步任务执行完成
    return result;
  }
}
