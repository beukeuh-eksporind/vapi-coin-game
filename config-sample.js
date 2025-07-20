// config-sample.js
// 📦 Contoh konfigurasi untuk VapiCoin
// Salin file ini dan ubah namanya menjadi config.js
// Jangan pernah upload file config.js ke publik!

const Config = {
  // Minimal coin untuk bisa tarik uang (dalam satuan coin)
  minimalPenarikan: 1000,

  // Rasio konversi Coin → Rupiah
  rateTukar: 1, // 1 coin = Rp1

  // Token untuk reset admin (ganti dengan token pribadi di config.js)
  adminResetToken: "GANTI_TOKEN",

  // Aktifkan iklan sebelum penarikan
  iklanAktif: true
};
