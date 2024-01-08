import { Test, TestingModule } from '@nestjs/testing';
import { SysDictTypeController } from './sys-dict-type.controller';
import { SysDictTypeService } from './sys-dict-type.service';

describe('SysDictTypeController', () => {
  let controller: SysDictTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysDictTypeController],
      providers: [SysDictTypeService],
    }).compile();

    controller = module.get<SysDictTypeController>(SysDictTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
