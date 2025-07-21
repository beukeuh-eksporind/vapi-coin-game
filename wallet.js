const Wallet = {
  tambahKoin: (jumlah) => {
    let current = Wallet.ambilKoin();
    let baru = current + jumlah;
    localStorage.setItem("coins", baru);
    Wallet.tampilkan();
    simpanKeServer();
  },

  ambilKoin: () => {
    return parseInt(localStorage.getItem("coins")) || 0;
  },

  tambahXP: (jumlah) => {
    let current = Wallet.ambilXP();
    let baru = current + jumlah;
    localStorage.setItem("xp", baru);

    // Cek level up
    let xpPerLevel = 100;
    let level = Wallet.ambilLevel();
    while (baru >= xpPerLevel) {
      baru -= xpPerLevel;
      level++;
    }

    localStorage.setItem("xp", baru);
    localStorage.setItem("level", level);
    Wallet.tampilkan();
    simpanKeServer();
  },

  ambilXP: () => {
    return parseInt(localStorage.getItem("xp")) || 0;
  },

  ambilLevel: () => {
    return parseInt(localStorage.getItem("level")) || 1;
  },

  ambilIDR: () => {
    // 1 coin = 10 IDR (misalnya)
    return Wallet.ambilKoin() * 10;
  },

  tampilkan: () => {
    document.getElementById("coins").textContent = Wallet.ambilKoin();
    document.getElementById("xp").textContent = Wallet.ambilXP();
    document.getElementById("level").textContent = Wallet.ambilLevel();
    document.getElementById("idr").textContent = Wallet.ambilIDR();

    // XP Bar UI
    const xpBar = document.getElementById("xp-bar");
    const persen = (Wallet.ambilXP() / 100) * 100;
    xpBar.style.width = persen + "%";
    xpBar.dataset.percent = persen.toFixed(0);
  }
};

// ===== 🔄 Simpan Otomatis ke Backend =====
function simpanKeServer() {
  const nama = localStorage.getItem('nama');
  if (!nama) return;

  const data = {
    nama: nama,
    coins: Wallet.ambilKoin(),
    xp: Wallet.ambilXP(),
    level: Wallet.ambilLevel()
  };

  fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(res => {
      if (!res.success) console.error('❌ Gagal simpan:', res);
    }).catch(err => console.error('❌ Error simpan ke server:', err));
}
