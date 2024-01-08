import { Test, TestingModule } from '@nestjs/testing';
import { MidOrderService } from './mid-order.service';

describe('MidOrderService', () => {
  let service: MidOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidOrderService],
    }).compile();

    service = module.get<MidOrderService>(MidOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
