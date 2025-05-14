// File: src/services/ScheduleService.ts
import fs from 'fs';
import path from 'path';

export interface Jadwal {
    hari: string;
    waktu: string;
    mataKuliah: string;
    ruang: string;
}

export enum Hari {
    Senin = "Senin",
    Selasa = "Selasa",
    Rabu = "Rabu",
    Kamis = "Kamis",
    Jumat = "Jumat",
    Sabtu = "Sabtu",
    Minggu = "Minggu"
}

export function isValidHari(input: string): boolean {
    const formattedInput = capitalizeFirstLetter(input.trim().toLowerCase());
    return Object.values(Hari).includes(formattedInput as Hari);
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export class ScheduleService {
    private filePath: string;

    constructor() {
        this.filePath = path.join(__dirname, '../data/jadwal.json');

        // Buat folder data jika belum ada
        const dirPath = path.dirname(this.filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Buat file jadwal.json jika belum ada
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '{}', 'utf8');
        }
    }

    private readData(): Record<string, Jadwal[]> {
        try {
            const raw = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(raw || '{}');
        } catch (error) {
            console.error('❌ Gagal membaca file jadwal.json:', error);
            return {};
        }
    }

    private writeData(data: Record<string, Jadwal[]>): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error('❌ Gagal menulis ke file jadwal.json:', error);
        }
    }

    getAll(chatId: string): Jadwal[] {
        const data = this.readData();
        return data[chatId] || [];
    }

    add(chatId: string, jadwal: Jadwal): void {
        const data = this.readData();
        if (!data[chatId]) data[chatId] = [];

        const isDuplicate = data[chatId].some(
            (j) =>
                j.hari.toLowerCase() === jadwal.hari.toLowerCase() &&
                j.waktu === jadwal.waktu &&
                j.mataKuliah.toLowerCase() === jadwal.mataKuliah.toLowerCase() &&
                j.ruang.toLowerCase() === jadwal.ruang.toLowerCase()
        );

        if (!isDuplicate) {
            data[chatId].push(jadwal);
            this.writeData(data);
        }
    }

    update(chatId: string, index: number, updated: Jadwal): boolean {
        const data = this.readData();

        if (!data[chatId] || !data[chatId][index]) {
            return false; // Jadwal tidak ditemukan
        }

        data[chatId][index] = updated;
        this.writeData(data);
        return true;
    }

    delete(chatId: string, index: number): boolean{
        const data = this.readData();
        if(!data[chatId] || !data[chatId][index]){
            return false;
        }

        data[chatId].splice(index, 1);
        this.writeData(data);
        return true;
    }
}
