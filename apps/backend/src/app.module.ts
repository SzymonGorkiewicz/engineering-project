import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { BodyStatsModule } from './entities/body-stats/body-stats.module';
import { MealProductModule } from './entities/meal-product/meal-product.module';
import { MealsModule } from './entities/meals/meals.module';
import { DaysModule } from './entities/days/days.module';
import { ProductsModule } from './entities/products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JwtModule.register({}),
    ProductsModule,
    DaysModule,
    MealsModule,
    MealProductModule,
    BodyStatsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(AuthMiddleware)
    .forRoutes('days','body-stats','meal-product','meals','products','auth/check-auth', 'auth/logout')
  }
}
