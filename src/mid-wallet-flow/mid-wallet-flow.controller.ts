import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MidWalletFlowService } from './mid-wallet-flow.service';
import { CreateMidWalletFlowDto } from './dto/create-mid-wallet-flow.dto';
import { UpdateMidWalletFlowDto } from './dto/update-mid-wallet-flow.dto';

@Controller('mid-wallet-flow')
export class MidWalletFlowController {
  constructor(private readonly midWalletFlowService: MidWalletFlowService) {}

  @Post()
  create(@Body() createMidWalletFlowDto: CreateMidWalletFlowDto) {
    return this.midWalletFlowService.create(createMidWalletFlowDto);
  }

  @Get()
  findAll() {
    return this.midWalletFlowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.midWalletFlowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMidWalletFlowDto: UpdateMidWalletFlowDto) {
    return this.midWalletFlowService.update(+id, updateMidWalletFlowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.midWalletFlowService.remove(+id);
  }
}
