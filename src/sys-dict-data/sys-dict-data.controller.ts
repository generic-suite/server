import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { SysDictDataService } from './sys-dict-data.service';
import { CreateSysDictDatumDto } from './dto/create-sys-dict-datum.dto';
import { UpdateSysDictDatumDto } from './dto/update-sys-dict-datum.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';

import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
@Controller('sys-dict-data')
export class SysDictDataController {
  constructor(private readonly sysDictDataService: SysDictDataService) {}

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSysDictDatumDto: CreateSysDictDatumDto) {
    return this.sysDictDataService.create(createSysDictDatumDto);
  }

  @Get(':dictType')
  findAll(@Param('dictType') dictType: string, @Query() query: any) {
    return this.sysDictDataService.findOfType(dictType, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysDictDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSysDictDatumDto: UpdateSysDictDatumDto) {
    return this.sysDictDataService.update(+id, updateSysDictDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysDictDataService.remove(+id);
  }
}
