const Game = {
  // Interaksi saat video bayi disentuh
  interaksiVideo: (event) => {
    // Tambah coin & XP
    Wallet.tambahKoin(1);
    Wallet.tambahXP(2);

    // Putar suara bayi
    const laughSound = document.getElementById("laugh-sound");
    if (laughSound) {
      laughSound.currentTime = 0;
      laughSound.play().catch(() => {});
    }

    // Tampilkan animasi koin
    Game.tampilkanAnimasiKoin(event.clientX, event.clientY);
  },

  // Animasi koin dari posisi tap
  tampilkanAnimasiKoin: (x, y) => {
    const coin = document.createElement("div");
    coin.className = "coin";
    coin.textContent = "💰";
    coin.style.left = x + "px";
    coin.style.top = y + "px";

    const wrapper = document.getElementById("coin-animation-wrapper");
    wrapper.appendChild(coin);

    setTimeout(() => {
      coin.remove();
    }, 1000);
  },

  // Fitur bonus bagikan (dummy)
  bagiKoin: () => {
    alert("🎁 Kamu dapat 5 koin dari berbagi!");
    Wallet.tambahKoin(5);
  },

  // Fitur putar dadu (dummy)
  putarDadu: () => {
    const hasil = Math.floor(Math.random() * 6) + 1;
    alert(`🎲 Kamu dapat angka ${hasil}!\n+${hasil} koin`);
    Wallet.tambahKoin(hasil);
  }
};
