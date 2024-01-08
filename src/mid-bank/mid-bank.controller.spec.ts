import { Test, TestingModule } from '@nestjs/testing';
import { MidBankController } from './mid-bank.controller';
import { MidBankService } from './mid-bank.service';

describe('MidBankController', () => {
  let controller: MidBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MidBankController],
      providers: [MidBankService],
    }).compile();

    controller = module.get<MidBankController>(MidBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
