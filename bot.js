const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Ganti dengan token bot kamu dari @BotFather
const token = '8531162710:AAGSh2F2cRP8cMVNbB18OlS4X9kB6kET2Bs';
const bot = new TelegramBot(token, { polling: true });

// Command /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    `🤖 **Bot AI Siap!**\n\n` +
    `Halo ${msg.from.first_name}! Ada yang bisa dibantu?\n` +
    `Gunakan /help untuk bantuan.`, 
    { parse_mode: 'Markdown' }
  );
});

// Command /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `📚 **Daftar Perintah:**\n` +
    `/start - Mulai bot\n` +
    `/help - Bantuan ini\n` +
    `/ask [pertanyaan] - Tanya AI\n` +
    `/code [request] - Minta kode\n\n` +
    `Atau kirim pesan biasa!`,
    { parse_mode: 'Markdown' }
  );
});

// Welcome member baru
bot.on('new_chat_members', (msg) => {
  msg.new_chat_members.forEach(member => {
    bot.sendMessage(msg.chat.id, 
      `🎉 Selamat datang ${member.first_name} di grup!`,
      { parse_mode: 'Markdown' }
    );
  });
});

// Pesan biasa
bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  bot.sendMessage(msg.chat.id, `Hai! Pesanmu diterima: "${msg.text}"`);
});

// Route utama buat cek bot online
app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'Bot Telegram aktif!' });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server jalan di port ${PORT}`);
});
