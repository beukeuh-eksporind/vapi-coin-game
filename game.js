const Game = {
  xpPerTap: 5,
  coinPerTap: 1,

  interaksiVideo: function (event) {
    // Tambah koin & XP
    Wallet.tambahCoin(this.coinPerTap);
    Wallet.tambahXP(this.xpPerTap);

    // Putar suara baby-laugh
    const laugh = document.getElementById("laugh-sound");
    if (laugh) laugh.play();

    // Animasi koin dari posisi klik
    Game.animasiKoin(event.clientX, event.clientY);
  },

  animasiKoin: function (x, y) {
    const wrapper = document.getElementById("coin-animation-wrapper");
    if (!wrapper) return;

    const coin = document.createElement("div");
    coin.className = "coin";
    coin.textContent = "🪙";
    coin.style.left = `${x - 10}px`;
    coin.style.top = `${y - 10}px`;

    wrapper.appendChild(coin);

    setTimeout(() => coin.remove(), 1000);
  },

  putarDadu: function () {
    const hasil = Math.floor(Math.random() * 6) + 1;
    let reward = hasil * 2; // Setiap angka dadu ×2 jadi koin

    Wallet.tambahCoin(reward);
    Wallet.tambahXP(hasil);

    alert(`🎲 Kamu dapat angka ${hasil} dan menerima ${reward} koin!`);
  },

  bagiKoin: function () {
    alert("🔄 Fitur berbagi koin segera hadir!");
  }
};
