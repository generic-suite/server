import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { SysConfigTextService } from './sys-config-text.service';
import { CreateSysConfigTextDto } from './dto/create-sys-config-text.dto';
import { UpdateSysConfigTextDto } from './dto/update-sys-config-text.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
@Controller('sys-config-text')
export class SysConfigTextController {
  constructor(private readonly sysConfigTextService: SysConfigTextService) {}

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSysConfigTextDto: CreateSysConfigTextDto) {
    return this.sysConfigTextService.create(createSysConfigTextDto);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() query: UpdateSysConfigTextDto) {
    return this.sysConfigTextService.findAll(query);
  }

  // 删除
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysConfigTextService.remove(+id);
  }
}
