import cron from 'node-cron';
import { ScheduleService } from '../services/ScheduleService';
import { Client } from 'whatsapp-web.js';
import moment from 'moment';
//import { Jadwal } from '../services/ScheduleService';

export class ReminderService {
  constructor(private client: Client, private scheduleService: ScheduleService) {}

  start() {
    cron.schedule('* * * * *', () => {
      const now = moment();
      const currentDay = now.format('dddd'); // eg. 'Monday'
      const currentTime = now.format('HH:mm');

      const allSchedules = this.scheduleService.getAllData(); // custom method

      for (const [chatId, jadwals] of Object.entries(allSchedules)) {
        for (const jadwal of jadwals) {
          if (
            jadwal.hari.toLowerCase() === currentDay.toLowerCase() &&
            moment(jadwal.waktu, 'HH:mm').subtract(10, 'minutes').format('HH:mm') === currentTime
          ) {
            this.client.sendMessage(
              chatId,
              `⏰ Reminder: Kamu punya mata kuliah *${jadwal.mataKuliah}* jam *${jadwal.waktu}* di *${jadwal.ruang}*`
            );
          }
        }
      }
    });
  }
}
