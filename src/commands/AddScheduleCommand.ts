// src/commands/AddScheduleCommand.ts
import { ScheduleService, Jadwal } from '../services/ScheduleService';
import { Message } from 'whatsapp-web.js';

export class AddScheduleCommand {
    private service = new ScheduleService();

    async execute(msg: Message): Promise<void> {
        const args = msg.body.split(' ');
        args.shift(); // hapus !tambahjadwal

        const hari = args[0];
        const waktu = args[1];
        const mataKuliah = args.slice(2).join(' ');

    if (!hari || !waktu || !mataKuliah) {
        await msg.reply('❌ Format salah.\nContoh: !tambahjadwal Senin 12:30 Pemrograman');
        return;
    }

    const jadwal: Jadwal = { hari, waktu, mataKuliah };
    this.service.add(jadwal);
    await msg.reply(`✅ Jadwal ditambahkan:\n${hari} ${waktu} - ${mataKuliah}`);
    }
}
