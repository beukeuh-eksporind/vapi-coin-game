const Exchange = {
  tampilkanFormTukar: () => {
    const koin = Wallet.ambilKoin();
    if (koin < 10) {
      alert("Kumpulkan minimal 10 koin untuk menarik uang.");
      return;
    }

    // Tampilkan modal iklan
    document.getElementById("ads-modal").style.display = "block";
  },

  iklanSelesai: () => {
    const koin = Wallet.ambilKoin();
    const idr = Wallet.ambilIDR();

    alert(`💸 Anda menarik Rp${idr}. Uang masuk otomatis!`);
    localStorage.setItem("coins", 0);
    Wallet.tampilkan();
    Wallet.simpanKeServer();

    document.getElementById("ads-modal").style.display = "none";
  },

  resetSemua: (kode) => {
    fetch("/api/admin/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kode })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("✅ Semua data berhasil direset.");
        } else {
          alert("❌ Gagal: " + data.error);
        }
      });
  },

  tampilkanRiwayat: () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        const div = document.getElementById("riwayat");
        if (!div) return;

        div.innerHTML = `<h3>🧾 Riwayat Pengguna</h3>`;
        users.forEach(u => {
          const item = document.createElement("div");
          item.className = "riwayat-item";
          item.innerHTML = `👤 <strong>${u.nama}</strong> — 💰 ${u.coins} koin • 🧬 XP ${u.xp} • 🎯 Lv ${u.level}`;
          div.appendChild(item);
        });
      })
      .catch(err => {
        console.error("❌ Gagal ambil riwayat:", err);
      });
  }
};
