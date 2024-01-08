import { Test, TestingModule } from '@nestjs/testing';
import { AppListController } from './app-list.controller';
import { AppListService } from './app-list.service';

describe('AppListController', () => {
  let controller: AppListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppListController],
      providers: [AppListService],
    }).compile();

    controller = module.get<AppListController>(AppListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
