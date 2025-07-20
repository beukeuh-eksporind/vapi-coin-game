const BonusHarian = {
  jumlahBonus: 50,

  cekDanKlaim: function () {
    const hariIni = new Date().toDateString();
    const terakhirBonus = localStorage.getItem("terakhirBonus");

    if (terakhirBonus !== hariIni) {
      this.berikanBonus();
      localStorage.setItem("terakhirBonus", hariIni);
    }
  },

  berikanBonus: function () {
    let coins = parseInt(localStorage.getItem("coins") || "0");
    let xp = parseInt(localStorage.getItem("xp") || "0");

    coins += this.jumlahBonus;
    xp += 20;

    localStorage.setItem("coins", coins.toString());
    localStorage.setItem("xp", xp.toString());

    Wallet.inisialisasi();
    this.tampilkanPopupBonus();
    this.animasiBonusKoin();
  },

  tampilkanPopupBonus: function () {
    const popup = document.getElementById("bonus-popup");
    if (!popup) return;

    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 2000);
  },

  animasiBonusKoin: function () {
    const container = document.getElementById("bonus-coins-container");
    if (!container) return;

    for (let i = 0; i < 10; i++) {
      const koin = document.createElement("div");
      koin.className = "bonus-coin";
      koin.innerText = "🪙";
      koin.style.left = `${Math.random() * 90 + 5}%`;
      container.appendChild(koin);

      setTimeout(() => {
        koin.remove();
      }, 2000);
    }
  }
};
