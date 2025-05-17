// src/commands/DeleteScheduleCommand.ts
import { Message } from 'whatsapp-web.js';
import { ScheduleService } from '../services/ScheduleService';

const pendingConfirmations = new Map<string, number>();

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

        // konfirmasi hapus jadwal
        pendingConfirmations.set(msg.from, index -1);
        await msg.reply(`❗️ Apakah Anda yakin ingin menghapus jadwal ke-${index}?\nKetik !konfirmasi untuk melanjutkan.`);
        return;
    }

    static async handleConfirmation(msg: Message): Promise<void> {
        const chatId = msg.from;
        const text = msg.body.trim().toLowerCase();

        if (text === '!konfirmasi' && pendingConfirmations.has(chatId)) {
            const index = pendingConfirmations.get(chatId)!;
            const service = new ScheduleService();
            const success = service.delete(chatId, index);
                
            if (success) {
                await msg.reply(`✅ Jadwal ke-${index + 1} berhasil dihapus.`);
            } else {
                await msg.reply('❌ Gagal menghapus. Jadwal tidak ditemukan.');
            }
            pendingConfirmations.delete(chatId);
        }
    }
}
