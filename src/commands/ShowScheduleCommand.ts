import { Message } from "whatsapp-web.js";
import { ScheduleService } from "../services/ScheduleService";
import { formatJadwalList } from "../utils/FormatSchedule";

export class ShowScheduleCommand {
    private service = new ScheduleService();

    async execute(msg: Message): Promise<void> {
        const jadwalList = this.service.getAll(msg.from);
        const formatted = formatJadwalList(jadwalList);
        await msg.reply(formatted);
    }
}

