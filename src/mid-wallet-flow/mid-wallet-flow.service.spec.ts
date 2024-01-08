import { Test, TestingModule } from '@nestjs/testing';
import { MidWalletFlowService } from './mid-wallet-flow.service';

describe('MidWalletFlowService', () => {
  let service: MidWalletFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidWalletFlowService],
    }).compile();

    service = module.get<MidWalletFlowService>(MidWalletFlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
