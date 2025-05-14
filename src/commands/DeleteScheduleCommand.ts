// src/commands/DeleteScheduleCommand.ts
import { Message } from 'whatsapp-web.js';
import { ScheduleService } from '../services/ScheduleService';

export class DeleteScheduleCommand {
    private service = new ScheduleService();

    async execute(msg: Message): Promise<void> {
        const args = msg.body.split(' ');
        args.shift(); // hapus !hapusjadwal

        const index = parseInt(args[0]);
            if (isNaN(index) || index < 1) {
            await msg.reply('❌ Format salah. Contoh: !hapusjadwal 2');
            return;
        }

        const success = this.service.delete(msg.from, index - 1);
        if (success) {
            await msg.reply(`✅ Jadwal ke-${index} berhasil dihapus.`);
        } else {
            await msg.reply('❌ Gagal menghapus. Jadwal tidak ditemukan.');
        }
    }
}
