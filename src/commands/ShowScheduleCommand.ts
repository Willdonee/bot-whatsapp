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

    const teks = jadwalList
      .map((j, i) => `${i + 1}. ${j.hari} ${j.waktu} - ${j.mataKuliah}`)
      .join('\n');

    await msg.reply(`📅 Jadwal Kuliah:\n${teks}`);
  }
}
