import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UsePipes, Request } from '@nestjs/common';
import { MidWalletFlowService } from './mid-wallet-flow.service';
import { CreateMidWalletFlowDto } from './dto/create-mid-wallet-flow.dto';
import { UpdateMidWalletFlowDto } from './dto/update-mid-wallet-flow.dto';

import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
import { query } from 'express';
@Controller('mid-wallet-flow')
export class MidWalletFlowController {
  constructor(private readonly midWalletFlowService: MidWalletFlowService) {}

  @Post()
  create(@Body() createMidWalletFlowDto: CreateMidWalletFlowDto) {
    return this.midWalletFlowService.create(createMidWalletFlowDto);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findPage(@Query() query: any) {
    return this.midWalletFlowService.findPage(query);
  }

  // 获取该用户的所有流水
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get('getList')
  findUserPage(@Query() query: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.midWalletFlowService.findUserPage(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.midWalletFlowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMidWalletFlowDto: UpdateMidWalletFlowDto) {
    return this.midWalletFlowService.update(+id, updateMidWalletFlowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.midWalletFlowService.remove(+id);
  }
}
