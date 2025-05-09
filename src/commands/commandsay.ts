import { Message } from "whatsapp-web.js";
import Command from "./command";

export class CommandSay extends Command {
    constructor() {
        super('say', 'Say something', ['speak']);
    }

    execute(msg: Message, args: string[]): void {
        if(args.length < 1){
            msg.reply('mohon masukan kata kata!')
            return;
        }
        msg.reply(args.join(' '));
    }
}