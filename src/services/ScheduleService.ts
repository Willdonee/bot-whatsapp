// src/services/ScheduleService.ts
import fs from 'fs';

export interface Jadwal {
  hari: string;
  waktu: string;
  mataKuliah: string;
}

export class ScheduleService {
  private filePath = 'jadwal.json';

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]');
    }
  }

  getAll(): Jadwal[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  add(jadwal: Jadwal): void {
    const all = this.getAll();
    all.push(jadwal);
    fs.writeFileSync(this.filePath, JSON.stringify(all, null, 2));
  }

  delete(jadwal: Jadwal): void {
    const all = this.getAll();
    const filtered = all.filter((j) => j.hari !== jadwal.hari || j.waktu !== jadwal.waktu || j.mataKuliah !== jadwal.mataKuliah);
    fs.writeFileSync(this.filePath, JSON.stringify(filtered, null, 2));
  }
}