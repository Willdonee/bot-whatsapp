// src/schedulers/ReminderScheduler.ts
import { Client } from "whatsapp-web.js";
import { ScheduleService } from "../services/ScheduleService";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id'); // Gunakan lokal Indonesia

const scheduleService = new ScheduleService();

// Cache sederhana untuk mencegah pengiriman reminder duplikat
const sentReminders = new Set<string>();

export function ReminderSchedule(bot: Client) {
    setInterval(async () => {
        try {
            const allSchedules = scheduleService.getAllData();
            const now = dayjs();

            console.log(`[Reminder] Memeriksa jadwal pada ${now.format('dddd, DD MMMM YYYY HH:mm:ss')}`);

            for (const [chatId, schedules] of Object.entries(allSchedules)) {
                for (const jadwal of schedules) {
                    // Parsing waktu jadwal (format: "HH:mm")
                    const jadwalTime = dayjs(`${now.format('YYYY-MM-DD')} ${jadwal.waktu}`, "YYYY-MM-DD HH:mm");

                    // Validasi hari
                    const isToday = jadwal.hari.toLowerCase() === now.format('dddd').toLowerCase();
                    const diffMinutes = jadwalTime.diff(now, 'minute');

                    // ID unik reminder untuk mencegah pengulangan
                    const uniqueId = `${chatId}-${jadwal.mataKuliah}-${jadwal.waktu}-${now.format('YYYY-MM-DD')}`;

                    if (isToday && diffMinutes === 60 && !sentReminders.has(uniqueId)) {
                        const reminderMessage = `⏰ *Pengingat Jadwal*\n` +
                            `Mata kuliah: *${jadwal.mataKuliah}*\n` +
                            `Waktu: *${jadwal.waktu}*\n` +
                            `Ruang: *${jadwal.ruang}*\n\n` +
                            `⏳ 1 Jam lagi ada kelas ${jadwal.mataKuliah}. Jangan lupa mandi ges!`;

                        await bot.sendMessage(chatId, reminderMessage);
                        sentReminders.add(uniqueId);
                    }
                }
            }
        } catch (err) {
            console.error("❌ Terjadi error saat reminder berjalan:", err);
        }
    }, 60 * 1000); // Cek setiap 1 menit
}
