const Exchange = {
  tampilkanFormTukar: () => {
    const metode = prompt("Metode penarikan (Dana/Gopay/BCA/etc):");
    if (!metode) return;

    const namaRek = prompt("Nama penerima rekening:");
    if (!namaRek) return;

    const noRek = prompt("Nomor rekening/HP tujuan:");
    if (!noRek) return;

    const idr = Wallet.ambilIDR();
    if (idr < 1000) {
      alert("Minimal penarikan adalah Rp 1.000");
      return;
    }

    if (!confirm(`Kamu akan tarik Rp ${idr} ke ${metode} atas nama ${namaRek}. Lanjut?`)) return;

    Exchange.kirimKeSheets({
      nama: localStorage.getItem("nama"),
      coins: Wallet.ambilKoin(),
      idr,
      xp: Wallet.ambilXP(),
      level: Wallet.ambilLevel(),
      metode,
      namaRek,
      noRek
    });
  },

  kirimKeSheets: (data) => {
    fetch("https://script.google.com/macros/s/AKfycbzThBQMzMqIt1vLeZntGjyq1_E8S9fiQrl2dkSILZDlHkydvyDoztR5L4h9WZMMrGNN/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(res => {
      if (res === "OK") {
        alert("✅ Permintaan penarikan berhasil dikirim! Dana akan segera diproses.");
        // Reset saldo lokal
        localStorage.setItem("coins", 0);
        Wallet.tampilkan();
      } else {
        alert("❌ Gagal mengirim permintaan. Coba lagi nanti.");
        console.error("Server response:", res);
      }
    })
    .catch(err => {
      alert("❌ Error jaringan. Coba lagi nanti.");
      console.error(err);
    });
  },

  tampilkanRiwayat: () => {
    // Dummy: bisa diganti ambil dari backend jika ada
    const riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
    const riwayatDiv = document.getElementById("riwayat");
    if (!riwayatDiv) return;

    riwayatDiv.innerHTML = `
      <h3>Riwayat Penarikan</h3>
      <ul>
        ${riwayat.map(r => `<li>${r}</li>`).join("")}
      </ul>
    `;
  },

  resetSemua: (kode) => {
    if (kode !== "admin123") return alert("Kode salah!");
    localStorage.clear();
    location.reload();
  }
};
