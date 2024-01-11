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

  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.HUMAN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Post()
  create(@Body() createMidWithdrawDto: CreateMidWithdrawDto, @Request() req: any) {
    return this.midWithdrawService.create(createMidWithdrawDto, req.user);
  }

  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.ADMIN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Get()
  findAll(@Query() query: any) {
    return this.midWithdrawService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.midWithdrawService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMidWithdrawDto: UpdateMidWithdrawDto) {
    return this.midWithdrawService.update(+id, updateMidWithdrawDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.midWithdrawService.remove(+id);
  }
}
