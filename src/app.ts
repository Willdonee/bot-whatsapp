import { Client, LocalAuth }  from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import commands from "./commands";
import fs from 'fs';
import { AddScheduleCommand } from "./commands/AddScheduleCommand";
import { ShowScheduleCommand } from "./commands/ShowScheduleCommand";
import { EditScheduleCommand } from "./commands/EditScheduleCommand";
import { DeleteScheduleCommand } from "./commands/DeleteScheduleCommand";

const client = new Client({
    restartOnAuthFail: true,
    webVersionCache:{
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
    },

    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelarated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
        ],
    },
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    for (const command of commands) {
        command.handle(msg);
    }
});

client.on('message', async (msg) => {
    const body = msg.body.toLowerCase();

    if (body.startsWith('!tambahjadwal')) {
        const command = new AddScheduleCommand();
      await command.execute(msg);
    }

    if (body === '!jadwal') {
        const command = new ShowScheduleCommand();
        await command.execute(msg);
    }

    if (body.startsWith('!editjadwal')) {
        const command = new EditScheduleCommand();
        await command.execute(msg);
    }

    if (body.startsWith('!hapusjadwal')){
        const command = new DeleteScheduleCommand();
        await command.execute(msg);
    }
});

client.initialize();