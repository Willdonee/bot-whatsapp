// File: src/services/ScheduleService.ts
import fs from 'fs';
import path from 'path';

export interface Jadwal {
  hari: string;
  waktu: string;
  mataKuliah: string;
  ruang: string;
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
    data[chatId].push(jadwal);
    this.writeData(data);
  }
}
