import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { SystemConfigService } from './system-config.service';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';

import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';

@Controller('system-config')
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() createSystemConfigDto: CreateSystemConfigDto) {
    return await this.systemConfigService.create(createSystemConfigDto);
  }

  @Get()
  async findAll() {
    return await this.systemConfigService.findConfig();
  }

  @Put('')
  async update(@Body() updateSystemConfigDto: UpdateSystemConfigDto) {
    const parmas = updateSystemConfigDto;
    return await this.systemConfigService.update(parmas);
  }
}
