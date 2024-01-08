import { Test, TestingModule } from '@nestjs/testing';
import { MidVipService } from './mid-vip.service';

describe('MidVipService', () => {
  let service: MidVipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidVipService],
    }).compile();

    service = module.get<MidVipService>(MidVipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
