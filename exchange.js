const Game = {
  cooldown: false,
  tapHarian: 0,
  delayTap: 500, // milidetik

  interaksiVideo(event) {
    if (this.cooldown) return;
    this.cooldown = true;

    // Tambahkan reward
    const tambahCoin = 5;
    const tambahXP = 3;
    const tambahIDR = 2;

    Wallet.tambahCoin(tambahCoin);
    Wallet.tambahXP(tambahXP);
    Wallet.tambahIDR(tambahIDR);

    this.tambahTapHarian();

    this.animasiKoin(event.clientX, event.clientY);
    this.mainkanSuara();
    this.cekLevelNaik();

    setTimeout(() => {
      this.cooldown = false;
    }, this.delayTap);
  },

  tambahTapHarian() {
    const hariIni = new Date().toLocaleDateString("id-ID");
    const data = JSON.parse(localStorage.getItem("misiHarian") || "{}");

    if (data.tanggal !== hariIni) {
      // Reset jika hari berbeda
      data.tanggal = hariIni;
      data.tapHariIni = 1;
      data.selesai = false;
    } else {
      data.tapHariIni = (data.tapHariIni || 0) + 1;
    }

    if (data.tapHariIni >= 10 && !data.selesai) {
      Wallet.tambahCoin(50); // Bonus misi
      this.popupBonus("+50 KOIN dari Misi Harian! 🎉");
      data.selesai = true;
    }

    localStorage.setItem("misiHarian", JSON.stringify(data));
  },

  popupBonus(teks) {
    const el = document.getElementById("bonus-popup");
    el.innerText = teks;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2000);
  },

  animasiKoin(x, y) {
    const el = document.createElement("div");
    el.className = "coin";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.textContent = "+5 🪙";
    document.getElementById("coin-animation-wrapper").appendChild(el);
    setTimeout(() => el.remove(), 1000);
  },

  mainkanSuara() {
    document.getElementById("coin-sound")?.play();
    document.getElementById("laugh-sound")?.play();
  },

  cekLevelNaik() {
    const xp = Wallet.ambilXP();
    const level = Wallet.ambilLevel();
    const batas = level * 50;

    if (xp >= batas) {
      Wallet.tambahLevel(1);
      Wallet.setXP(xp - batas);
      this.popupBonus(`Naik ke Lv.${level + 1} 🚀`);
    }

    // Update XP bar
    const xpBar = document.getElementById("xp-bar");
    const persent = Math.min((xp / (level * 50)) * 100, 100);
    xpBar.style.width = persent + "%";
  },

  putarDadu() {
    const hasil = Math.floor(Math.random() * 6) + 1;
    const bonus = hasil * 2;

    Wallet.tambahCoin(bonus);
    Wallet.tambahXP(bonus);
    Wallet.tambahIDR(bonus);

    this.popupBonus(`🎲 Dadu: ${hasil} ➜ +${bonus} semua`);
    this.mainkanSuara();
    this.cekLevelNaik();
  },

  bagiKoin() {
    alert("Bagikan fitur belum tersedia. Nantikan update selanjutnya ya! 🙌");
  }
};
