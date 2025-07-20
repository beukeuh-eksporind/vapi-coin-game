const Config = {
  rateTukar: 10, // 1 koin = Rp10
  minimalPenarikan: 100, // Minimal 100 koin = Rp1000

  getInfoPenarikan: function () {
    const rupiah = this.minimalPenarikan * this.rateTukar;
    return `💡 Penarikan minimal adalah ${this.minimalPenarikan} koin (Rp${rupiah.toLocaleString("id-ID")}).`;
  }
};
