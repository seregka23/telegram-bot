import { Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from 'telegraf'
import { SceneContext } from 'telegraf/scenes'

@Update()
export class TelegramService extends Telegraf<SceneContext> {

    @Start()
    onStart(@Ctx() ctx: SceneContext) {
        ctx.replyWithHTML(`
            <b>Hello world!</b>
            `);
    }

    @On('text')
    onMessage(@Message('text') message: string, @Ctx() ctx: SceneContext) {
        ctx.replyWithHTML(
            `<i>${message}</i>`
        );
    }
}
