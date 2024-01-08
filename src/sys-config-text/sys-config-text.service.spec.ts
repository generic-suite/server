import { Test, TestingModule } from '@nestjs/testing';
import { SysConfigTextService } from './sys-config-text.service';

describe('SysConfigTextService', () => {
  let service: SysConfigTextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysConfigTextService],
    }).compile();

    service = module.get<SysConfigTextService>(SysConfigTextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
