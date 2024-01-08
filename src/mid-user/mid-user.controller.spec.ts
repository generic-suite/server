import { Test, TestingModule } from '@nestjs/testing';
import { MidUserController } from './mid-user.controller';
import { MidUserService } from './mid-user.service';

describe('MidUserController', () => {
  let controller: MidUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MidUserController],
      providers: [MidUserService],
    }).compile();

    controller = module.get<MidUserController>(MidUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
