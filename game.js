const Game = {
  interaksiVideo: function (event) {
    const coinTambahan = 1;
    const xpTambahan = 2;

    // Ambil posisi tap
    const x = event.clientX;
    const y = event.clientY;

    // Tambah coin dan xp
    const koinSaatIni = parseInt(localStorage.getItem("coins") || "0");
    const xpSaatIni = parseInt(localStorage.getItem("xp") || "0");

    localStorage.setItem("coins", koinSaatIni + coinTambahan);
    localStorage.setItem("xp", xpSaatIni + xpTambahan);

    // Update UI
    Wallet.inisialisasi();
    Game.perbaruiXP();

    // Tampilkan animasi koin
    Game.animasiKoin(x, y);

    // Mainkan suara
    Game.mainkanSuara();
  },

  animasiKoin: function (x, y) {
    const wrapper = document.getElementById("coin-animation-wrapper");
    const koin = document.createElement("div");
    koin.className = "coin";
    koin.innerText = "🪙";
    koin.style.left = `${x}px`;
    koin.style.top = `${y}px`;
    wrapper.appendChild(koin);

    setTimeout(() => {
      wrapper.removeChild(koin);
    }, 1000);
  },

  mainkanSuara: function () {
    const audio = document.getElementById("coin-sound");
    const laugh = document.getElementById("laugh-sound");
    if (audio) audio.play();
    if (laugh) laugh.play();
  },

  putarDadu: function () {
    const hasil = Math.floor(Math.random() * 6) + 1;
    const coinTambahan = hasil * 2;
    const xpTambahan = hasil;

    const koinSaatIni = parseInt(localStorage.getItem("coins") || "0");
    const xpSaatIni = parseInt(localStorage.getItem("xp") || "0");

    localStorage.setItem("coins", koinSaatIni + coinTambahan);
    localStorage.setItem("xp", xpSaatIni + xpTambahan);

    alert(`🎲 Dadu menunjukkan angka ${hasil}! Kamu dapat ${coinTambahan} koin dan ${xpTambahan} XP!`);

    Wallet.inisialisasi();
    Game.perbaruiXP();
  },

  bagiKoin: function () {
    alert("🔄 Fitur ini akan segera tersedia. Kamu bisa kirim koin ke teman!");
  },

  perbaruiXP: function () {
    const xp = parseInt(localStorage.getItem("xp") || "0");
    const level = Math.floor(xp / 50) + 1;
    const persen = Math.min(100, (xp % 50) * 2);

    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = level;
    document.getElementById("xp-bar").style.width = `${persen}%`;

    localStorage.setItem("level", level);
  }
};
