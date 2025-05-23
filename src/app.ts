import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import commands from "./commands";

import { AddScheduleCommand } from "./commands/AddScheduleCommand";
import { ShowScheduleCommand } from "./commands/ShowScheduleCommand";
import { EditScheduleCommand } from "./commands/EditScheduleCommand";
import { DeleteScheduleCommand } from "./commands/DeleteScheduleCommand";
import { CariJadwalCommand } from "./commands/FindScheduleCommand";

import { ReminderSchedule } from "./schedulers/ReminderScheduler";

const client = new Client({
    restartOnAuthFail: true,
    webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html",
    },
    puppeteer: {
        headless: true,
        args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        ],
    },
    authStrategy: new LocalAuth(),
});

// 🔁 QR Code generator
client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrcode.generate(qr, { small: true });
});

// ✅ Bot ready
client.on("ready", () => {
    console.log("✅ Bot is ready!");

    // ⏰ Mulai scheduler reminder
    ReminderSchedule(client);
});

// 💬 Tangani pesan
client.on("message", async (msg) => {
  const body = msg.body.toLowerCase();

    // Commands khusus
    if (body.startsWith("!tambahjadwal")) {
        await new AddScheduleCommand().execute(msg);
    } else if (body === "!jadwal") {
        await new ShowScheduleCommand().execute(msg);
    } else if (body.startsWith("!editjadwal")) {
        await new EditScheduleCommand().execute(msg);
    } else if (body.startsWith("!carijadwal")) {
        await new CariJadwalCommand().execute(msg);
    } else if (body.startsWith("!hapusjadwal")) {
        await new DeleteScheduleCommand().execute(msg);
    } else {
        // Konfirmasi penghapusan (jika ada)
        await DeleteScheduleCommand.handleConfirmation(msg);
    }

    // Jalankan command handler tambahan jika ada
    for (const command of commands) {
        command.handle(msg);
    }
});

// 🚀 Inisialisasi bot
client.initialize();