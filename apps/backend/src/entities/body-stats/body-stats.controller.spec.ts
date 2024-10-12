import { Test, TestingModule } from '@nestjs/testing';
import { BodyStatsController } from './body-stats.controller';
import { BodyStatsService } from './body-stats.service';

describe('BodyStatsController', () => {
  let controller: BodyStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodyStatsController],
      providers: [BodyStatsService],
    }).compile();

    controller = module.get<BodyStatsController>(BodyStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
