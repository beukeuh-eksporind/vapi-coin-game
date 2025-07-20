const Config = {
  rateTukar: 100, // 1 coin = Rp100
  minimalPenarikan: 50, // Minimal coin yang bisa ditarik

  getInfoPenarikan: function () {
    return `💡 Minimal penarikan adalah ${this.minimalPenarikan} koin.\n1 koin = Rp${this.rateTukar}`;
  }
};
