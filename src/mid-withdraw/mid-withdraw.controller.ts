import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards, UsePipes } from '@nestjs/common';
import { MidWithdrawService } from './mid-withdraw.service';
import { CreateMidWithdrawDto } from './dto/create-mid-withdraw.dto';
import { UpdateMidWithdrawDto } from './dto/update-mid-withdraw.dto';

import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';

@Controller('mid-withdraw')
export class MidWithdrawController {
  constructor(private readonly midWithdrawService: MidWithdrawService) {}

  // 申请提现
  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.HUMAN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Post()
  create(@Body() createMidWithdrawDto: CreateMidWithdrawDto, @Request() req: any) {
    return this.midWithdrawService.create(createMidWithdrawDto, req.user);
  }

  // 提现列表-用户
  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.HUMAN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Get('getMyList')
  findUserAll(@Query() query: any, @Request() req: any) {
    return this.midWithdrawService.findUserAll(query, req.user);
  }

  // 提现列表-admin
  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.ADMIN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Get()
  findAll(@Query() query: any) {
    return this.midWithdrawService.findAll(query);
  }

  // 提现审核-admin
  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.ADMIN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMidWithdrawDto: UpdateMidWithdrawDto, @Request() req: any) {
    return this.midWithdrawService.update(+id, updateMidWithdrawDto, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.midWithdrawService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.midWithdrawService.remove(+id);
  }
}
