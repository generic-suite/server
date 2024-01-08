import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { MidUserService } from './mid-user.service';
import { CreateMidUserDto } from './dto/create-mid-user.dto';
import { UpdateMidUserDto } from './dto/update-mid-user.dto';
import { ChangeBalanceDto } from './dto/change-balance.dto';

import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
@Controller('mid-user')
export class MidUserController {
  constructor(private readonly midUserService: MidUserService) {}

  // 修改用户基础信息
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMidUserDto: UpdateMidUserDto) {
    // 循环更新字段
    for (const key in updateMidUserDto) {
      if (Object.prototype.hasOwnProperty.call(updateMidUserDto, key)) {
        const value = updateMidUserDto[key];
        await this.midUserService.updateField(+id, key, value);
      }
    }
    return;
  }

  // 加扣款
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('change-balance')
  async changeBalance(@Body() body: ChangeBalanceDto) {
    const { userId, amount, isRecharge } = body;
    await this.midUserService.changeBalance(userId, amount, isRecharge);
    return;
  }

  // 重置任务
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('reset-task')
  async resetTask(@Body() body: { userId: number }) {
    const { userId } = body;
    await this.midUserService.resetTask(userId);
    return;
  }
}
