// src/schedulers/DailyNotificationScheduler.ts
import { Client } from "whatsapp-web.js";
import { ScheduleService } from "../services/ScheduleService";
import dayjs from "dayjs";

const scheduleService = new ScheduleService();

export function DailyReminderScheduler(client: Client) {
    const notificationTime = "07:00";

    // Menggunakan setInterval untuk memeriksa setiap menit
    setInterval(async () => {
        const now = dayjs();
        const currentTime = now.format("HH:mm");

        // Cek apakah waktu saat ini sama dengan waktu notifikasi
        if (currentTime === notificationTime) {
            const allSchedules = scheduleService.getAllData();

            for (const [chatId, schedules] of Object.entries(allSchedules)) {
                if (schedules.length > 0) {
                    const reminderMessage = `📅 *Notifikasi Harian*\n` +
                    `Berikut adalah jadwal kuliah Anda untuk hari ini:\n\n` +
                    schedules.map((jadwal, index) => {
                        return `${index + 1}. ${jadwal.hari} ${jadwal.waktu} - ${jadwal.mataKuliah} (${jadwal.ruang})`;
                    }).join('\n');

                    await client.sendMessage(chatId, reminderMessage);

                } else {
                    await client.sendMessage(chatId, `📭 Tidak ada jadwal kuliah untuk hari ini.`);
                }
            }
        }
    }, 60 * 1000); // Cek setiap 1 menit
}
