import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // type: 'postgres',
        // host: configService.get('POSTGRES_HOST'),
        // port: configService.get('POSTGRES_PORT'),
        // username: configService.get('POSTGRES_USER'),
        // password: String(configService.get('POSTGRES_PASSWORD')),
        // database: configService.get('POSTGRES_DB'),
        // entities: [__dirname + '/../**/**/**/*.entity{.ts,.js}'],
        // synchronize: true,
        const isProduction = configService.get('HEROKU_DATABASE_URL') !== undefined;

        return {
          type: 'postgres',
          url: isProduction ? configService.get<string>('HEROKU_DATABASE_URL') : undefined,
          host: isProduction ? undefined : configService.get('POSTGRES_HOST'),
          port: isProduction ? undefined : parseInt(configService.get<string>('POSTGRES_PORT'), 10),
          username: isProduction ? undefined : configService.get('POSTGRES_USER'),
          password: isProduction ? undefined : configService.get<string>('POSTGRES_PASSWORD'),
          database: isProduction ? undefined : configService.get('POSTGRES_DB'),
          ssl: isProduction ? { rejectUnauthorized: false } : false,  // Wymuszamy SSL tylko na produkcji
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
