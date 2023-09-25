import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesModule } from './resources/resources.module';
import { ResourceEntity } from './resources/entities/resource.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(
          'configService.get("DB_HOST")',
          configService.get('DB_HOST'),
        );
        console.log(
          'configService.get("DB_PORT")',
          configService.get('DB_PORT'),
        );

        console.log(
          'configService.get("DB_USERNAME")',
          configService.get('DB_USERNAME'),
        );

        console.log(
          'configService.get("DB_PASSWORD")',
          configService.get('DB_PASSWORD'),
        );
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [ResourceEntity],
          synchronize: true,
          ssl: {
            rejectUnauthorized: false, // You might need this if RDS is using self-signed certificates
          },
        };
      },
      inject: [ConfigService],
    }),
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
