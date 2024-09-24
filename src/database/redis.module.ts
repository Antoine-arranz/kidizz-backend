import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log('Redis configuration:', configService.get('redis'));
        return {
          redis: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
          },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  exports: [BullModule],
})
export class RedisModule {}