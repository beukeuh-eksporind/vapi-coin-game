const BonusHarian = {
  jumlahBonus: 50, // jumlah coin yang diberikan

  cekDanKlaim: function () {
    const hariIni = new Date().toDateString();
    const terakhirBonus = localStorage.getItem("terakhirBonus");

    if (terakhirBonus !== hariIni) {
      this.klaimBonus(hariIni);
    }
  },

  klaimBonus: function (hariIni) {
    // Tambah koin
    const koinSekarang = parseInt(localStorage.getItem("coins") || "0");
    const koinBaru = koinSekarang + this.jumlahBonus;
    localStorage.setItem("coins", koinBaru);

    // Simpan waktu klaim terakhir
    localStorage.setItem("terakhirBonus", hariIni);

    // Update tampilan koin
    Wallet.inisialisasi();

    // Efek visual
    this.tampilkanPopup();
    this.animasiBonusMeluncur();

    // Suara (jika ada elemen audio)
    const coinSound = document.getElementById("coin-sound");
    if (coinSound) coinSound.play();
  },

  tampilkanPopup: function () {
    const popup = document.getElementById("bonus-popup");
    if (!popup) return;

    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  },

  animasiBonusMeluncur: function () {
    const container = document.getElementById("bonus-coins-container");
    if (!container) return;

    for (let i = 0; i < 6; i++) {
      const span = document.createElement("span");
      span.className = "bonus-coin";
      span.style.left = `${10 + Math.random() * 80}%`;
      span.textContent = "🪙";
      container.appendChild(span);

      setTimeout(() => {
        container.removeChild(span);
      }, 2000);
    }
  }
};
