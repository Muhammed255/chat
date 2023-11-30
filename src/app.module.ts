import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { configService } from './config/config.service';
import { Chat } from './database/entity/chat.entity';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), TypeOrmModule.forFeature([Chat])],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
