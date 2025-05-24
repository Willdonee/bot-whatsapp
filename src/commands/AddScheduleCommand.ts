import { Message } from "whatsapp-web.js";
import { Jadwal, ScheduleService } from "../services/ScheduleService";
import { formatHari, isValidHari } from "../validators/DayValidator";
import { isValidWaktuLokal } from "../validators/TimeValidator";

export class AddScheduleCommand {
    private service = new ScheduleService();

    async execute(msg: Message): Promise<void> {
        const args = msg.body.split(' ');
        args.shift(); // hapus !tambahjadwal

        const rawHari = args[0];
        const waktu = args[1];
        const ruang = args[args.length - 1];
        const mataKuliah = args.slice(2, args.length - 1).join(' ');

        const hari = formatHari(rawHari);

        if (!hari || !waktu || !mataKuliah || !ruang) {
            await msg.reply('❌ Format salah. Gunakan:\n!tambahjadwal <hari> <waktu> <mata kuliah> <ruang>\nContoh: !tambahjadwal Senin 09:30 Algoritma H58');
            return;
        }

        // Validasi input
        if (!hari) {
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

        const jadwal: Jadwal = { hari, waktu, mataKuliah, ruang };
        const result = this.service.add(msg.from, jadwal);
        await msg.reply(result.message);
    }
}
