import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UsePipes } from '@nestjs/common';
import { MidBankService } from './mid-bank.service';
import { SaveMidBankDto } from './dto/save-mid-bank.dto';

import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';

@Controller('mid-bank')
export class MidBankController {
  constructor(private readonly midBankService: MidBankService) {}

  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.HUMAN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Post('setCard')
  save(@Body() saveMidBankDto: SaveMidBankDto, @Request() req: any) {
    return this.midBankService.save(saveMidBankDto, req.user.userId);
  }

  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.HUMAN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Get('getCard')
  findAll(@Request() req: any) {
    return this.midBankService.findData(req.user.userId);
  }
}
