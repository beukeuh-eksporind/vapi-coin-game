const BonusHarian = {
  jumlahBonus: 50, // kamu bisa ubah jadi 10, 100, dst.

  cekDanKlaim: function () {
    const hariIni = new Date().toDateString();
    const terakhirKlaim = localStorage.getItem("bonusTerakhir");

    if (terakhirKlaim === hariIni) {
      console.log("Bonus harian sudah diambil hari ini.");
      return;
    }

    // Tambah koin
    const coins = parseInt(localStorage.getItem("coins") || "0") + this.jumlahBonus;
    localStorage.setItem("coins", coins);
    document.getElementById("coins").textContent = coins;
    document.getElementById("idr").textContent = coins * 1;

    // Simpan waktu klaim
    localStorage.setItem("bonusTerakhir", hariIni);

    // Tambah notifikasi animasi atau efek jika ingin
    alert(`Bonus Harian +${this.jumlahBonus} koin! 🎉`);
  }
};
