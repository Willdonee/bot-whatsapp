import { Message } from "whatsapp-web.js";
import { isValidHari, Jadwal, ScheduleService } from "../services/ScheduleService";

export class AddScheduleCommand {
    private service = new ScheduleService();

    async execute(msg: Message): Promise<void> {
        const args = msg.body.split(' ');
        args.shift(); // hapus !tambahjadwal

        const hari = args[0];
        const waktu = args[1];
        const ruang = args[args.length - 1];
        const mataKuliah = args.slice(2, args.length - 1).join(' ');

        if (!hari || !waktu || !mataKuliah || !ruang) {
            await msg.reply('❌ Format salah.\nContoh: !tambahjadwal Senin 12:30 Pemrograman D23');
            return;
        }

        if (!isValidHari(hari)) {
            await msg.reply("❌ Hari tidak valid. Gunakan format:\nSenin, Selasa, Rabu, dst.");
            return;
        }

        const jadwal: Jadwal = { hari, waktu, mataKuliah, ruang};
        this.service.add(msg.from, jadwal); // pakai ID chat
        await msg.reply(`✅ Jadwal ditambahkan:\n${hari} ${waktu} - ${mataKuliah} - ${ruang}`);
    }
}
