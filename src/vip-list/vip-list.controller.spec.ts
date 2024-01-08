import { Test, TestingModule } from '@nestjs/testing';
import { VipListController } from './vip-list.controller';
import { VipListService } from './vip-list.service';

describe('VipListController', () => {
  let controller: VipListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VipListController],
      providers: [VipListService],
    }).compile();

    controller = module.get<VipListController>(VipListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
