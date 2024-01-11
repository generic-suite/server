import { Test, TestingModule } from '@nestjs/testing';
import { MidWithdrawController } from './mid-withdraw.controller';
import { MidWithdrawService } from './mid-withdraw.service';

describe('MidWithdrawController', () => {
  let controller: MidWithdrawController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MidWithdrawController],
      providers: [MidWithdrawService],
    }).compile();

    controller = module.get<MidWithdrawController>(MidWithdrawController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
