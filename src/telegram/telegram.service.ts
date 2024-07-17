import { ConfigService } from "@nestjs/config";
import { Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { ChatgptService } from "src/chatgpt/chatgpt.service";
import { Context, Telegraf } from 'telegraf'
import { SceneContext } from 'telegraf/scenes'

@Update()
export class TelegramService extends Telegraf<SceneContext> {

    constructor(
        private readonly configService: ConfigService,
        private readonly gptService: ChatgptService
    ) {
        super(configService.get('TELEGRAM_API'));
    }

    @Start()
    onStart(@Ctx() ctx: SceneContext) {
        ctx.replyWithHTML(`
            <b>Hello world!</b>
            `);
    }

    @On('text')
    onMessage(@Message('text') message: string, @Ctx() ctx: SceneContext) {
        
        return this.gptService.generateResponse(message);
        
        // ctx.replyWithHTML(
        //     `<i>${message}</i>`
        // );
    }
}
