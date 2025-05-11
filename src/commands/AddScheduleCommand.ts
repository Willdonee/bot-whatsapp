import { Message } from "whatsapp-web.js";
import { Jadwal, ScheduleService } from "../services/ScheduleService";

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

    // // validasi penamaan hari
    // const validDays = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
    // if (!validDays.includes(hari.toLowerCase())) {
    //   await msg.reply('❌ Hari tidak valid. Gunakan: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu.');
    //   return;
    // }

    // // validasi waktu jam
    // const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    // if (!timePattern.test(waktu)) {
    //   await msg.reply('❌ Format waktu salah. Gunakan format HH:MM (24 jam).');
    //   return;
    // }

    // // validasi duplikasi data
    // const jadwalList = this.service.getAll(msg.from);
    // const isDuplicate = jadwalList.some(jadwal => {
    //   return (
    //     jadwal.hari.toLowerCase() === hari.toLowerCase() &&
    //     jadwal.waktu === waktu &&
    //     jadwal.mataKuliah.toLowerCase() === mataKuliah.toLowerCase() &&
    //     jadwal.ruang.toLowerCase() === ruang.toLowerCase()
    //   );
    // });
    // if (isDuplicate) {
    //   await msg.reply('❌ Jadwal sudah ada.');
    //   return;
    // }
    // Simpan jadwal
    // const jadwal: Jadwal = { hari, waktu, mataKuliah, ruang };

    const jadwal: Jadwal = { hari, waktu, mataKuliah, ruang};
    this.service.add(msg.from, jadwal); // pakai ID chat
    await msg.reply(`✅ Jadwal ditambahkan:\n${hari} ${waktu} - ${mataKuliah} - ${ruang}`);
  }
}
