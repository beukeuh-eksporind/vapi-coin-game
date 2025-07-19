const Config = {
  // Rate konversi koin ke rupiah
  rateTukar: 1, // 1 coin = Rp1

  // Batas minimal penarikan dalam COIN
  minimalPenarikan: 1000, // 1000 coin = Rp1.000

  // Info penarikan yang ditampilkan ke user
  getInfoPenarikan: function () {
    return `💡 Kamu perlu minimal ${this.minimalPenarikan} coin untuk bisa tarik uang. Terus kumpulkan ya!`;
  }
};
