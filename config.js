const Config = {
  rateTukar: 0.05, // 1 koin = Rp0,05
  minimalPenarikan: 10000, // Minimal penarikan Rp10.000

  getInfoPenarikan: function () {
    return `⚠️ Minimal penarikan adalah Rp${this.minimalPenarikan.toLocaleString('id-ID')}. Kumpulkan lebih banyak koin!`;
  },

  // 🔁 Dinamis: rate tukar naik seiring level
  getRateTukarDinamis: function () {
    const level = parseInt(localStorage.getItem("level") || "1");
    if (level >= 10) return 0.07;
    if (level >= 5) return 0.06;
    return this.rateTukar;
  }
};
