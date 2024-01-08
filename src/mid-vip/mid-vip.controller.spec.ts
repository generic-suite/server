import { Test, TestingModule } from '@nestjs/testing';
import { MidVipController } from './mid-vip.controller';
import { MidVipService } from './mid-vip.service';

describe('MidVipController', () => {
  let controller: MidVipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MidVipController],
      providers: [MidVipService],
    }).compile();

    controller = module.get<MidVipController>(MidVipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
