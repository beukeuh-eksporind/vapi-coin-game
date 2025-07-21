const Wallet = {
  tambahKoin: (jumlah) => {
    let current = Wallet.ambilKoin();
    let baru = current + jumlah;
    localStorage.setItem("coins", baru);
    Wallet.tampilkan();
    Wallet.simpanKeServer();
  },

  ambilKoin: () => {
    return parseInt(localStorage.getItem("coins")) || 0;
  },

  tambahXP: (jumlah) => {
    let current = Wallet.ambilXP();
    let baru = current + jumlah;
    let level = Wallet.ambilLevel();
    const xpPerLevel = 100;

    while (baru >= xpPerLevel) {
      baru -= xpPerLevel;
      level++;
    }

    localStorage.setItem("xp", baru);
    localStorage.setItem("level", level);
    Wallet.tampilkan();
    Wallet.simpanKeServer();
  },

  ambilXP: () => {
    return parseInt(localStorage.getItem("xp")) || 0;
  },

  ambilLevel: () => {
    return parseInt(localStorage.getItem("level")) || 1;
  },

  ambilIDR: () => {
    return Wallet.ambilKoin() * 10; // 1 coin = 10 IDR
  },

  tampilkan: () => {
    document.getElementById("coins").textContent = Wallet.ambilKoin();
    document.getElementById("xp").textContent = Wallet.ambilXP();
    document.getElementById("level").textContent = Wallet.ambilLevel();
    document.getElementById("idr").textContent = Wallet.ambilIDR();

    const xpBar = document.getElementById("xp-bar");
    const persen = (Wallet.ambilXP() / 100) * 100;
    xpBar.style.width = persen + "%";
    xpBar.dataset.percent = persen.toFixed(0);
  },

  simpanKeServer: () => {
    const nama = localStorage.getItem("nama");
    if (!nama) return;

    const data = {
      nama: nama,
      coins: Wallet.ambilKoin(),
      xp: Wallet.ambilXP(),
      level: Wallet.ambilLevel()
    };

    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          console.error("❌ Gagal simpan:", res);
        }
      })
      .catch(err => {
        console.error("❌ Error simpan ke server:", err);
      });
  }
};
