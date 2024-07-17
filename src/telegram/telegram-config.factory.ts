import { ConfigService } from "@nestjs/config";
import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from "nestjs-telegraf";

export function options(): TelegrafModuleAsyncOptions {
    return {
        inject: [ConfigService],
        useFactory: (config: ConfigService): TelegrafModuleOptions => {
            return {
                token: config.get('TELEGRAM_API')
            }
        }
    }
}