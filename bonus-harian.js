const BonusHarian = {
  BONUS_KOIN: 50,
  KEY_TANGGAL_TERAKHIR: "tanggal_bonus",

  // Mengecek dan memberi bonus jika belum diklaim hari ini
  cekDanKlaim() {
    const hariIni = new Date().toISOString().split("T")[0];
    const terakhir = localStorage.getItem(this.KEY_TANGGAL_TERAKHIR);

    if (terakhir !== hariIni) {
      this.klaimBonus(hariIni);
    }
  },

  klaimBonus(tanggal) {
    localStorage.setItem(this.KEY_TANGGAL_TERAKHIR, tanggal);
    Wallet.tambahKoin(this.BONUS_KOIN);
    this.tampilkanPopupBonus();
  },

  tampilkanPopupBonus() {
    const popup = document.getElementById("bonus-popup");
    if (!popup) return;

    popup.textContent = `+${this.BONUS_KOIN} KOIN! 🎁`;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  }
};
