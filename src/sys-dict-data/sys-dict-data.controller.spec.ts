import { Test, TestingModule } from '@nestjs/testing';
import { SysDictDataController } from './sys-dict-data.controller';
import { SysDictDataService } from './sys-dict-data.service';

describe('SysDictDataController', () => {
  let controller: SysDictDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysDictDataController],
      providers: [SysDictDataService],
    }).compile();

    controller = module.get<SysDictDataController>(SysDictDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
