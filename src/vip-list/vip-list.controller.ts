import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { VipListService } from './vip-list.service';
import { CreateVipListDto } from './dto/create-vip-list.dto';
import { UpdateVipListDto } from './dto/update-vip-list.dto';

import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
@Controller('vip-list')
export class VipListController {
  constructor(private readonly vipListService: VipListService) {}
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createVipListDto: CreateVipListDto) {
    return this.vipListService.create(createVipListDto);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.vipListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const data = this.vipListService.findOne(+id);
    if (data) {
      return data;
    }
    const res = {
      code: 200,
      msg: '数据不存在',
      success: false,
    };
    return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVipListDto: UpdateVipListDto) {
    return this.vipListService.update(+id, updateVipListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vipListService.remove(+id);
  }
}
