import { Test, TestingModule } from '@nestjs/testing';
import { MealProductService } from './meal-product.service';

describe('MealProductService', () => {
  let service: MealProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealProductService],
    }).compile();

    service = module.get<MealProductService>(MealProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
