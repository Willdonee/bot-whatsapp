# Bot WhatsApp untuk Manajemen Jadwal Kuliah
&nbsp;
&nbsp;

Bot WhatsApp ini dirancang untuk membantu pengguna mengelola jadwal kuliah mereka. Bot ini memungkinkan pengguna untuk menambah, mengedit, menghapus, dan menampilkan jadwal kuliah melalui pesan WhatsApp.
&nbsp;
&nbsp;

## Fitur Utama
&nbsp;
&nbsp;

- **Menambah Jadwal**: Pengguna dapat menambahkan jadwal kuliah dengan perintah `!tambahjadwal <hari> <waktu> <mata kuliah> <ruang>`.
- **Mengedit Jadwal**: Pengguna dapat mengedit jadwal yang sudah ada dengan perintah `!editjadwal <index> <hari> <waktu> <mata kuliah> <ruang>`.
- **Menghapus Jadwal**: Pengguna dapat menghapus jadwal dengan perintah `!hapusjadwal <index>`, yang memerlukan konfirmasi sebelum penghapusan.
- **Menampilkan Jadwal**: Pengguna dapat melihat jadwal kuliah dengan perintah `!jadwal`.
- **Mencari Jadwal**: Pengguna dapat mencari jadwal berdasarkan hari tertentu dengan perintah `!carijadwal <hari>`.
- **Pengingat Jadwal**: Bot akan mengirimkan pengingat satu jam sebelum kelas dimulai.
&nbsp;
&nbsp;

## Prerequisites
&nbsp;
&nbsp;

Sebelum menjalankan bot ini, pastikan Anda memiliki:
&nbsp;
&nbsp;

- Node.js (versi 14 atau lebih baru)
- NPM (Node Package Manager)
- Akun WhatsApp yang terdaftar
&nbsp;
&nbsp;

## Instalasi
&nbsp;
&nbsp;

1. Clone repository ini ke mesin lokal Anda:
&nbsp;
&nbsp;

   ```bash
   git clone https://github.com/Willdonee/bot-whatsapp.git
   cd bot-whatsapp

2. Instal dependensi yang diperlukan:
&nbsp;
&nbsp;

   ```bash
   npm install

3. Jalankan Bot:
&nbsp;
&nbsp;

   ```bash
   npm start

4. Scan QR code yang muncul di terminal menggunakan aplikasi WhatsApp Anda untuk mengautentikasi bot.
