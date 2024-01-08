import { Test, TestingModule } from '@nestjs/testing';
import { MidOrderController } from './mid-order.controller';
import { MidOrderService } from './mid-order.service';

describe('MidOrderController', () => {
  let controller: MidOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MidOrderController],
      providers: [MidOrderService],
    }).compile();

    controller = module.get<MidOrderController>(MidOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
