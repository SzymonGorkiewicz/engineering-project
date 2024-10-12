import { Test, TestingModule } from '@nestjs/testing';
import { MealProductController } from './meal-product.controller';
import { MealProductService } from './meal-product.service';

describe('MealProductController', () => {
  let controller: MealProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealProductController],
      providers: [MealProductService],
    }).compile();

    controller = module.get<MealProductController>(MealProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
