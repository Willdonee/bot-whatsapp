import { Message } from 'whatsapp-web.js';
import { ScheduleService, Jadwal } from '../services/ScheduleService';

export class EditScheduleCommand {
    private service = new ScheduleService();

    async execute(msg: Message): Promise<void> {
        const args = msg.body.split(' ');
        args.shift(); // hapus !editjadwal

        const indexStr = args[0];
        const hari = args[1];
        const waktu = args[2];
        const ruang = args[args.length - 1];
        const mataKuliah = args.slice(3, args.length - 1).join(' ');

        const index = parseInt(indexStr) - 1;

        if (isNaN(index) || !hari || !waktu || !mataKuliah || !ruang) {
            await msg.reply('❌ Format salah.\nContoh: !editjadwal 1 Senin 14:00 Algoritma D25');
            return;
        }

            const updated: Jadwal = { hari, waktu, mataKuliah, ruang};
            const success = this.service.update(msg.from, index, updated);

        if (!success) {
            await msg.reply('❌ Gagal mengedit jadwal. Pastikan index benar.');
            return;
        }

        await msg.reply(`✅ Jadwal ke-${index + 1} berhasil diubah:\n${hari} ${waktu} - ${mataKuliah} - ${ruang}`);
    }
}
