import { Jadwal } from '../services/ScheduleService';

export function formatJadwal(jadwal: Jadwal): string {
    return `📅 Hari : ${jadwal.hari}
🕒 Waktu    : ${jadwal.waktu}
📚 Mata Kuliah  : ${jadwal.mataKuliah}
🏫 Ruang    : ${jadwal.ruang}`;
}

export function formatJadwalList(jadwalList: Jadwal[]): string {
    if (jadwalList.length === 0) {
        return '📭 Jadwal kamu masih kosong.';
    }

    const sortedList = [...jadwalList].sort((a, b) => {
        const hariUrutan = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        const hariA = hariUrutan.indexOf(capitalize(a.hari));
        const hariB = hariUrutan.indexOf(capitalize(b.hari));
        if (hariA !== hariB) return hariA - hariB;
        return a.waktu.localeCompare(b.waktu);
    });

    return (
        '📅 Jadwal Kuliah Kamu:\n\n' +
        sortedList
        .map((item, index) => {
            return `${index + 1}. ${item.hari} ${item.waktu} - ${item.mataKuliah} (${item.ruang})`;
        })
        .join('\n')
    );
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}