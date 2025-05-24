import { Message } from 'whatsapp-web.js';
import { ScheduleService, Jadwal } from '../services/ScheduleService';
import { isValidHari } from '../validators/DayValidator';
import { isValidWaktuLokal } from '../validators/TimeValidator';

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

        // Validasi input
        if (isNaN(index) || index < 0) {
            await msg.reply('❌ Format salah. Pastikan index adalah angka yang valid.');
            return;
        }

        if (!hari || !isValidHari(hari)) {
            await msg.reply('❌ Hari tidak valid. Gunakan format:\nSenin, Selasa, Rabu, dst.');
            return;
        }

        if (!waktu || !isValidWaktuLokal(waktu)) {
            await msg.reply('❌ Format waktu tidak valid atau di luar jam kuliah (06:00 - 22:00 WIB). Contoh: 09:30');
            return;
        }

        if (!mataKuliah || mataKuliah.trim().length === 0) {
            await msg.reply('❌ Mata kuliah tidak boleh kosong.');
            return;
        }

        if (!ruang || ruang.trim().length === 0) {
            await msg.reply('❌ Ruang tidak boleh kosong.');
            return;
        }

        const updated: Jadwal = { hari, waktu, mataKuliah, ruang };
        const success = this.service.update(msg.from, index, updated);

        if (!success) {
            await msg.reply('❌ Gagal mengedit jadwal. Pastikan index benar.');
            return;
        }

        await msg.reply(`✅ Jadwal ke-${index + 1} berhasil diubah:\n${hari} ${waktu} - ${mataKuliah} - ${ruang}`);
    }

}
