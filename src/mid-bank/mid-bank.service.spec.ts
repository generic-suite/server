import { Test, TestingModule } from '@nestjs/testing';
import { MidBankService } from './mid-bank.service';

describe('MidBankService', () => {
  let service: MidBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidBankService],
    }).compile();

    service = module.get<MidBankService>(MidBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
