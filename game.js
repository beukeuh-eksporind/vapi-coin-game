const Game = {
  koinPerTap: 1,
  xpPerTap: 5,

  interaksiVideo: function (event) {
    Game.tambahKoin(Game.koinPerTap);
    Game.tambahXP(Game.xpPerTap);
    Game.putarSuaraKoin();
    Game.animasiKoin(event.clientX, event.clientY);
  },

  tambahKoin: function (jumlah) {
    let coins = parseInt(localStorage.getItem("coins") || "0");
    coins += jumlah;
    localStorage.setItem("coins", coins);
    Wallet.perbaruiTampilan();
  },

  tambahXP: function (jumlah) {
    let xp = parseInt(localStorage.getItem("xp") || "0");
    let level = parseInt(localStorage.getItem("level") || "1");

    xp += jumlah;
    const xpDibutuhkan = Game.xpUntukNaikLevel(level);

    if (xp >= xpDibutuhkan) {
      xp = xp - xpDibutuhkan;
      level++;
      localStorage.setItem("level", level);
    }

    localStorage.setItem("xp", xp);
    Wallet.perbaruiTampilan();
  },

  xpUntukNaikLevel: function (level) {
    return 100 + (level - 1) * 50;
  },

  putarSuaraKoin: function () {
    const sound = document.getElementById("coin-sound");
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  },

  animasiKoin: function (x, y) {
    const wrapper = document.getElementById("coin-animation-wrapper");
    if (!wrapper) return;

    const coin = document.createElement("div");
    coin.className = "coin";
    coin.style.left = x + "px";
    coin.style.top = y + "px";
    coin.textContent = "🪙";

    wrapper.appendChild(coin);

    setTimeout(() => {
      wrapper.removeChild(coin);
    }, 1000);
  },

  putarDadu: function () {
    const hasil = Math.floor(Math.random() * 6) + 1;
    const koinBonus = hasil * 5;
    Game.tambahKoin(koinBonus);
    Game.tambahXP(hasil * 2);
    alert(`🎲 Kamu mendapat angka ${hasil} → +${koinBonus} koin!`);
  },

  bagiKoin: function () {
    alert("🔄 Fitur berbagi koin belum tersedia di versi ini.");
  }
};
