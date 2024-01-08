import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MidVipService } from './mid-vip.service';
import { CreateMidVipDto } from './dto/create-mid-vip.dto';
import { UpdateMidVipDto } from './dto/update-mid-vip.dto';

@Controller('mid-vip')
export class MidVipController {
  constructor(private readonly midVipService: MidVipService) {}
}
