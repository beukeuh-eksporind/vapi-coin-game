const Game = {
  interaksiVideo(event) {
    // Tambah coin, XP, dan IDR saat video diklik
    Wallet.tambahKoin(1);
    Wallet.tambahXP(1);
    Wallet.tambahIDR(10);

    Game.animasiKoin(event.clientX, event.clientY);
    Game.putarSuara("coin-sound");
  },

  animasiKoin(x, y) {
    const koin = document.createElement("div");
    koin.className = "coin";
    koin.textContent = "+1 💰";
    koin.style.left = `${x}px`;
    koin.style.top = `${y}px`;

    document.getElementById("coin-animation-wrapper").appendChild(koin);

    setTimeout(() => koin.remove(), 1000);
  },

  putarSuara(id) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  },

  // Fitur bonus dari dadu
  putarDadu() {
    const hasil = Math.floor(Math.random() * 6) + 1;
    const bonus = hasil * 5;

    Wallet.tambahKoin(bonus);
    Wallet.tambahXP(hasil);
    Wallet.tambahIDR(bonus * 3);

    Game.tampilkanBonus(`🎲 Dadu: ${hasil} → +${bonus} Koin`);
    Game.putarSuara("laugh-sound");
  },

  // Fitur bonus berbagi
  bagiKoin() {
    const bonus = 20;
    Wallet.tambahKoin(bonus);
    Wallet.tambahIDR(bonus * 2);
    Wallet.tambahXP(3);

    Game.tampilkanBonus(`🔄 Berbagi → +${bonus} Koin!`);
  },

  tampilkanBonus(teks) {
    const popup = document.getElementById("bonus-popup");
    if (popup) {
      popup.textContent = teks;
      popup.classList.add("show");
      setTimeout(() => popup.classList.remove("show"), 1800);
    }
  }
};
