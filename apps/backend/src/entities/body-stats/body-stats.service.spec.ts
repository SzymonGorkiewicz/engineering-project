import { Test, TestingModule } from '@nestjs/testing';
import { BodyStatsService } from './body-stats.service';

describe('BodyStatsService', () => {
  let service: BodyStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyStatsService],
    }).compile();

    service = module.get<BodyStatsService>(BodyStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
