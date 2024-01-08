import { Test, TestingModule } from '@nestjs/testing';
import { AppListService } from './app-list.service';

describe('AppListService', () => {
  let service: AppListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppListService],
    }).compile();

    service = module.get<AppListService>(AppListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
