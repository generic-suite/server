import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { RedisInstance } from 'src/database/redis';
import { Observable } from 'rxjs';

@Injectable()
export class RbacGuard implements CanActivate {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  constructor(private readonly role: number) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // 获取请求头的token
    const authorization = request.headers.authorization || void 0;
    const token = authorization && authorization.split(' ')[1];

    // 获取redis缓存里的token
    const redis = await RedisInstance.initRedis('auth.certificate', 0);
    const key = `${user.userId}-${user.username}`;
    const cache = await redis.get(key);
    if (token !== cache) {
      throw new UnauthorizedException('鉴权失败');
    }
    if (user.role > this.role) {
      throw new ForbiddenException('对不起，您无权操作');
    }
    return true;
  }
}
