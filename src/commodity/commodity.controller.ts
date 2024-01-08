import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';
import { AuthGuard } from '@nestjs/passport';
import { RbacInterceptor } from '../interceptor/rbac/rbac.interceptor';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() body: any, @Request() req: any) {
    const username = req.user.username;
    return await this.commodityService.create(body, username);
  }

  // 查询商品列表
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Post('list')
  async findAll(@Body() body: any) {
    return await this.commodityService.findAll(body);
  }

  // 修改商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    const username = req.user.username;
    return await this.commodityService.update(id, body, username);
  }

  // 删除商品
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(1)) // 调用 RBAC 拦截器
  @Delete('delete')
  async remove(@Body() data: any) {
    return this.commodityService.remove(data.ids);
  }
}
