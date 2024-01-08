import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { SysDictTypeService } from './sys-dict-type.service';
import { CreateSysDictTypeDto } from './dto/create-sys-dict-type.dto';
import { UpdateSysDictTypeDto } from './dto/update-sys-dict-type.dto';

import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
@Controller('sys-dict-type')
export class SysDictTypeController {
  constructor(private readonly sysDictTypeService: SysDictTypeService) {}

  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSysDictTypeDto: CreateSysDictTypeDto) {
    return this.sysDictTypeService.create(createSysDictTypeDto);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.sysDictTypeService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysDictTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSysDictTypeDto: UpdateSysDictTypeDto) {
    return this.sysDictTypeService.update(+id, updateSysDictTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysDictTypeService.remove(+id);
  }
}
