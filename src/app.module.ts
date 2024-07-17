import { Module } from '@nestjs/common';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ChatgptModule, TelegramModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [],
})
export class AppModule { }
