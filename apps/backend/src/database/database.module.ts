import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('HEROKU_DATABASE_URL') !== undefined;

        return {
          type: 'postgres',
          url: isProduction ? configService.get<string>('HEROKU_DATABASE_URL') : undefined,
          host: isProduction ? undefined : configService.get('POSTGRES_HOST'),
          port: isProduction ? undefined : parseInt(configService.get<string>('POSTGRES_PORT'), 10),
          username: isProduction ? undefined : configService.get('POSTGRES_USER'),
          password: isProduction ? undefined : configService.get<string>('POSTGRES_PASSWORD'),
          database: isProduction ? undefined : configService.get('POSTGRES_DB'),
          ssl: isProduction ? { rejectUnauthorized: false } : false, 
          options: isProduction? {encryption: true} : undefined,
          entities: [__dirname + '/../**/**/**/*.entity{.ts,.js}'],
          synchronize: true,
        };

      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
