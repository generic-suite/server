import { Test, TestingModule } from '@nestjs/testing';
import { MidWalletFlowController } from './mid-wallet-flow.controller';
import { MidWalletFlowService } from './mid-wallet-flow.service';

describe('MidWalletFlowController', () => {
  let controller: MidWalletFlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MidWalletFlowController],
      providers: [MidWalletFlowService],
    }).compile();

    controller = module.get<MidWalletFlowController>(MidWalletFlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
