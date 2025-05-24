import moment from 'moment-timezone';

export function isValidWaktuLokal(waktu: string | undefined): boolean {
    // Periksa apakah waktu tidak terdefinisi atau kosong
    if (!waktu || typeof waktu !== 'string' || waktu.trim().length === 0) {
        return false;
    }

    // Validasi format waktu
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!regex.test(waktu.trim())) {
        return false;
    }

    // Konversi waktu ke zona waktu Jakarta
    const waktuMoment = moment.tz(waktu.trim(), 'HH:mm', true, 'Asia/Jakarta');

    // cek rentang waktu
    if (!waktuMoment.isValid()) return false;

    const jam = waktuMoment.hour();
    return jam >= 6 && jam <= 22;
}


