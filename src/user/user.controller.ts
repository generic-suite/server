import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { MidUserService } from '../mid-user/mid-user.service';
import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { RegisterInfoDTO } from './dto/user.dto';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly midUserService: MidUserService,
  ) {}

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  // 注册
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('register')
  async register(@Body() body: RegisterInfoDTO, @Request() req: any) {
    const user = await this.userService.register(body);
    // 用户ip
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (user) {
      return {
        code: 200,
        msg: '注册成功',
        data: user,
        success: true,
      };
    } else {
      return {
        code: 600,
        msg: '注册失败',
        success: false,
      };
    }
  }

  // 查找用户
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post('find-one')
  async findOne(@Body() body: any) {
    const user = await this.userService.findOne(body.username);
    if (user) {
      return {
        code: 200,
        msg: '查询成功',
        data: user,
        success: true,
      };
    } else {
      return {
        code: 600,
        msg: '查无此人',
        success: false,
      };
    }
  }

  // 获取用户信息
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post('getUserInfo')
  async getUserInfo(@Request() req: any) {
    const user = await this.midUserService.getUserInfo(req.user.userId);
    console.log('🚀  file: user.controller.ts:107  UserController  getUserInfo  user:', user)
    return {
      code: 200,
      msg: '查询成功',
      data: user,
      success: true,
    };
  }
}
