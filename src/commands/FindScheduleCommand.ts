import { Message } from 'whatsapp-web.js';
import { ScheduleService } from '../services/ScheduleService';
import { formatJadwalList } from '../utils/FormatSchedule';
import { isValidHari, formatHari } from '../validators/DayValidator';

export class CariJadwalCommand {
    private scheduleService: ScheduleService;

    constructor() {
        this.scheduleService = new ScheduleService();
    }

    async execute(msg: Message): Promise<void> {
        const chat = await msg.getChat();
        const chatId = chat.id._serialized;
        const args = msg.body.split(' ').slice(1);

        if (args.length === 0) {
            await msg.reply('❗ Contoh penggunaan: *!carijadwal Selasa*');
            return;
        }

        const hariInput = args[0];
        if (!isValidHari(hariInput)) {
            await msg.reply('❌ Hari tidak valid. Masukkan nama hari seperti *Senin*, *Selasa*, dst.');
            return;
        }

        const hari = formatHari(hariInput);
        if (!hari) {
            await msg.reply('❌ Hari tidak valid. Masukkan nama hari seperti *Senin*, *Selasa*, dst.');
            return;
        }
        const allJadwal = this.scheduleService.getAll(chatId);
        const filtered = allJadwal.filter(j => j.hari.toLowerCase() === hari.toLowerCase());

        if (filtered.length === 0) {
            await msg.reply(`📭 Tidak ada jadwal pada hari *${hari}*.`);
        } else {
            await msg.reply(`📌 Jadwal pada hari *${hari}*:\n\n${formatJadwalList(filtered)}`);
        }
    }
}
