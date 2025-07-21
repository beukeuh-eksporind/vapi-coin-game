const BonusHarian = {
  cekDanKlaim: () => {
    const nama = localStorage.getItem('nama');
    if (!nama) return;

    const hariIni = new Date().toLocaleDateString();
    const terakhirKlaim = localStorage.getItem('lastBonus');

    if (terakhirKlaim === hariIni) {
      // Sudah klaim hari ini
      return;
    }

    // Tambah bonus
    const bonusKoin = 10;
    Wallet.tambahKoin(bonusKoin);

    // Simpan tanggal klaim
    localStorage.setItem('lastBonus', hariIni);

    // Tampilkan popup
    BonusHarian.tampilkanPopup(`+${bonusKoin} KOIN Harian! ☀️`);
  },

  tampilkanPopup: (teks) => {
    const popup = document.getElementById("bonus-popup");
    popup.textContent = teks;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2500);
  }
};
