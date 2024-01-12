import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards, UsePipes } from '@nestjs/common';
import { MidOrderService } from './mid-order.service';
import { CreateMidOrderDto } from './dto/create-mid-order.dto';
import { UpdateMidOrderDto } from './dto/update-mid-order.dto';
import { submitMidOrderDto } from './dto/submit-mid-order.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac/rbac.guard';
import { roleConstans as role } from 'src/auth/constants';
@Controller('mid-order')
export class MidOrderController {
  constructor(private readonly midOrderService: MidOrderService) {}

  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.HUMAN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Post('startOrder')
  async create(@Body() createMidOrderDto: CreateMidOrderDto, @Request() req: any) {
    const user = req.user; // 获取用户id
    return this.midOrderService.startOrder(user);
  }

  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.HUMAN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Post('SubmitOrder')
  async submit(@Body() body: submitMidOrderDto, @Request() req: any) {
    const orderId = body.order_id;
    const userId = req.user.userId;
    return this.midOrderService.submitOrder(orderId, userId);
  }

  @UsePipes(new ValidationPipe()) // 校验字段
  @UseGuards(new RbacGuard(role.ADMIN)) // 校验权限
  @UseGuards(AuthGuard('jwt')) // 校验是否合法用户
  @Get()
  async findPage(@Query() query: any) {
    return this.midOrderService.findPage(query);
  }
}
