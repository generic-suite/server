import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../utils/cryptogram';
import { RedisInstance } from '../database/redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证-step2
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const hashedPassword = user.password;
      const passwordSalt = user.passwordSalt;
      const hashPassword = encryptPassword(password, passwordSalt);
      console.log('🚀  :', hashedPassword, hashPassword);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user: user,
        };
      } else {
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      realname: user.realname,
      role: user.role,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      // 实例化redis
      const redis = await RedisInstance.initRedis('auth.certificate', 0);
      const key = `${user.userId}-${user.username}`;
      await redis.set(key, token);
      return {
        code: 200,
        data: {
          token,
        },
        success: true,
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        success: false,
        msg: `账号或密码错误`,
      };
    }
  }
}
