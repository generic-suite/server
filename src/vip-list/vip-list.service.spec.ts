import { Test, TestingModule } from '@nestjs/testing';
import { VipListService } from './vip-list.service';

describe('VipListService', () => {
  let service: VipListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VipListService],
    }).compile();

    service = module.get<VipListService>(VipListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
