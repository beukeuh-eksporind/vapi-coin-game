const Config = {
  namaGame: "VapiCoin",
  versi: "1.0.0",

  // Minimal coin untuk bisa tarik uang
  minimalPenarikan: 1000,

  // Admin WA untuk backup manual (tidak wajib)
  adminWhatsApp: "081282541982",

  // Rate tukar: 1 coin = Rp 1
  rateTukar: 1,

  getInfoPenarikan: function () {
    return `Minimal penarikan adalah Rp ${this.minimalPenarikan.toLocaleString('id-ID')}.`;
  }
};
