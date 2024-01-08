import { Test, TestingModule } from '@nestjs/testing';
import { SysConfigTextController } from './sys-config-text.controller';
import { SysConfigTextService } from './sys-config-text.service';

describe('SysConfigTextController', () => {
  let controller: SysConfigTextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysConfigTextController],
      providers: [SysConfigTextService],
    }).compile();

    controller = module.get<SysConfigTextController>(SysConfigTextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
