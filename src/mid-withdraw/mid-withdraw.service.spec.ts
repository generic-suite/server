import { Test, TestingModule } from '@nestjs/testing';
import { MidWithdrawService } from './mid-withdraw.service';

describe('MidWithdrawService', () => {
  let service: MidWithdrawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidWithdrawService],
    }).compile();

    service = module.get<MidWithdrawService>(MidWithdrawService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
