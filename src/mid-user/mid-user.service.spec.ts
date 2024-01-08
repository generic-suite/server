import { Test, TestingModule } from '@nestjs/testing';
import { MidUserService } from './mid-user.service';

describe('MidUserService', () => {
  let service: MidUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidUserService],
    }).compile();

    service = module.get<MidUserService>(MidUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
