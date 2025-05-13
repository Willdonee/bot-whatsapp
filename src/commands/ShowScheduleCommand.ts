import { Message } from "whatsapp-web.js";
import { ScheduleService } from "../services/ScheduleService";

export class ShowScheduleCommand {
    private service = new ScheduleService();

    async execute(msg: Message): Promise<void> {
        const jadwalList = this.service.getAll(msg.from);

        if (jadwalList.length === 0) {
            await msg.reply('📭 Belum ada jadwal.');
            return;
        }

        // Hindari duplikat berdasarkan kombinasi hari + waktu + mata kuliah + ruang
        const uniqueSet = new Set<string>();
        const uniqueList = jadwalList.filter(jadwal => {
            const key = `${jadwal.hari}|${jadwal.waktu}|${jadwal.mataKuliah}|${jadwal.ruang}`.toLowerCase();
            if (uniqueSet.has(key)) return false;
            uniqueSet.add(key);
            return true;
        });

        const teks = uniqueList
        .map((j, i) => `${i + 1}. ${j.hari} ${j.waktu} - ${j.mataKuliah} - ${j.ruang}`)
        .join('\n');

        await msg.reply(`📅 Jadwal Kuliah:\n${teks}`);
    }
}

