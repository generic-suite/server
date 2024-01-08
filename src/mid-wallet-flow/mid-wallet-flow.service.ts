import { Injectable } from '@nestjs/common';
import { CreateMidWalletFlowDto } from './dto/create-mid-wallet-flow.dto';
import { UpdateMidWalletFlowDto } from './dto/update-mid-wallet-flow.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MidWalletFlow } from './entities/mid-wallet-flow.entity';

@Injectable()
export class MidWalletFlowService {
  constructor(
    @InjectRepository(MidWalletFlow)
    private readonly midWalletFlowRepository: Repository<MidWalletFlow>,
  ) {}
  async create(createMidWalletFlowDto: CreateMidWalletFlowDto) {
    const data = {
      ...createMidWalletFlowDto,
    }
    const res = await this.midWalletFlowRepository.save(data);
  }

  findAll() {
    return `This action returns all midWalletFlow`;
  }

  findOne(id: number) {
    return `This action returns a #${id} midWalletFlow`;
  }

  update(id: number, updateMidWalletFlowDto: UpdateMidWalletFlowDto) {
    return `This action updates a #${id} midWalletFlow`;
  }

  remove(id: number) {
    return `This action removes a #${id} midWalletFlow`;
  }
}
