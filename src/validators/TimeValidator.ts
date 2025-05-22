import moment from 'moment-timezone';

export function isValidWaktuLokal(waktu: string): boolean {
  const waktuMoment = moment.tz(waktu, 'HH:mm', true, 'Asia/Jakarta');
  if (!waktuMoment.isValid()) return false;

  const jam = waktuMoment.hour();
  return jam >= 6 && jam <= 22;
}

