const Game = {
  nilaiPerTap: 1,
  nilaiXpPerTap: 1,

  interaksiVideo: function (event) {
    // Hilangkan ikon tunjuk jika ada
    const icon = document.getElementById("tap-hand-icon");
    if (icon) icon.remove();

    Wallet.tambahKoin(this.nilaiPerTap);
    Wallet.tambahXp(this.nilaiXpPerTap);

    this.mainkanSuara("coin-sound");
    this.animasiKoin(event.clientX, event.clientY);
  },

  putarDadu: function () {
    const hasil = Math.floor(Math.random() * 6) + 1;
    alert("🎲 Kamu mendapatkan angka: " + hasil);
    const bonus = hasil;
    Wallet.tambahKoin(bonus);
    Wallet.tambahXp(bonus);
  },

  bagiKoin: function () {
    const bonus = 3;
    alert("📣 Terima kasih sudah berbagi! Bonus +3 koin & XP");
    Wallet.tambahKoin(bonus);
    Wallet.tambahXp(bonus);
  },

  animasiKoin: function (x, y) {
    const wrapper = document.getElementById("coin-animation-wrapper");
    const el = document.createElement("div");
    el.className = "coin";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.innerText = "+1 🪙";
    wrapper.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1000);
  },

  mainkanSuara: function (id) {
    const audio = document.getElementById(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
};
