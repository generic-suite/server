import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDTO } from './dto/user.dto';

import { makeSalt, encryptPassword } from '../utils/cryptogram';
// 连接数据库
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MidUserService } from 'src/mid-user/mid-user.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
    private readonly midUserService: MidUserService,
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
        success: false,
        msg: '两次密码不一致',
      };
    }

    if (password.length < 6 || password.length > 16) {
      return {
        code: 400,
        success: false,
        msg: '密码长度为6-16位',
      };
    }

    const user = await this.findOne(username);
    if (user) {
      return {
        code: 400,
        success: false,
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
    // this.eventEmitter.emit('new_user_register', resUser);
    // 用户业务表初始化用户
    await this.midUserService.init(resUser);
    return resUser;
  }

  // 修改用户密码
  async changeLoginPassword(userId: number, changeBody: ChangePasswordDTO): Promise<any> {
    if (changeBody.password !== changeBody.repassword) {
      return {
        code: 400,
        success: false,
        msg: '两次密码不一致',
      };
    }
    if (changeBody.password.length < 6 || changeBody.password.length > 16) {
      return {
        code: 400,
        success: false,
        msg: '密码长度为6-16位',
      };
    }
    // 校验旧密码是否正确
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
    });
    const oldPwd = encryptPassword(changeBody.oldPassword, user.passwordSalt);
    if (oldPwd !== user.password) {
      return {
        code: 400,
        success: false,
        msg: '旧密码不正确',
      };
    }
    const newUser = await this.updatePassword(userId, changeBody.password);
    return newUser;
  }

  // 修改用户提现密码
  async changeDealPassword(userId: number, changeBody: ChangePasswordDTO): Promise<any> {
    if (changeBody.password !== changeBody.repassword) {
      return {
        code: 400,
        success: false,
        msg: '两次密码不一致',
      };
    }
    if (changeBody.password.length < 6 || changeBody.password.length > 16) {
      return {
        code: 400,
        success: false,
        msg: '密码长度为6-16位',
      };
    }
    // 校验旧密码是否正确
    const user = await this.midUserService.getUserInfo(userId);
    if (user.deal_pass !== changeBody.oldPassword) {
      return {
        code: 400,
        success: false,
        msg: '旧密码不正确',
      };
    }

    await this.midUserService.updateField(userId, 'deal_pass', changeBody.password);
    return;
  }

  // 修改密码
  async updatePassword(userId: number, password: string): Promise<any> {
    // 制作密码盐
    const passwordSalt = makeSalt();
    // 制作密码
    const hashPwd = encryptPassword(password, passwordSalt);
    // 创建用户
    const newUser = {
      password: hashPwd,
      passwordSalt,
    };
    // 保存用户
    const createUser = await this.userRepository.update(userId, newUser);
    return;
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
