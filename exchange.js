const Exchange = {
  tampilkanFormTukar: function () {
    const nama = localStorage.getItem("userName") || "Tamu";
    const coins = parseInt(localStorage.getItem("coins") || "0");
    const idr = coins * 1;

    if (idr < 1000) {
      alert("Minimal penarikan adalah Rp 1000 (1000 koin)");
      return;
    }

    const riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");

    // Cek apakah sudah tarik hari ini
    const last = riwayat.length > 0 ? new Date(riwayat[riwayat.length - 1].waktu) : null;
    const now = new Date();

    if (last && (now - new Date(last)) < 86400000) {
      alert("Kamu sudah tarik uang hari ini. Coba lagi besok.");
      return;
    }

    const request = {
      nama: nama,
      jumlah: idr,
      waktu: now.toISOString(),
      status: "Menunggu verifikasi sistem"
    };

    riwayat.push(request);
    localStorage.setItem("riwayat", JSON.stringify(riwayat));

    alert("Permintaan penarikan dikirim!\nDana akan diproses dalam 1x24 jam.");
    localStorage.setItem("coins", "0");
    document.getElementById("coins").textContent = "0";
    document.getElementById("idr").textContent = "0";

    this.tampilkanRiwayat();
  },

  tampilkanRiwayat: function () {
    const container = document.getElementById("riwayat");
    const riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");

    if (riwayat.length === 0) {
      container.innerHTML = "<h3>Belum ada riwayat penarikan</h3>";
      return;
    }

    let html = "<h3>Riwayat Penarikan</h3><ul>";
    for (const item of riwayat) {
      const tgl = new Date(item.waktu).toLocaleString("id-ID");
      html += `<li>${tgl} - Rp${item.jumlah} (${item.status})</li>`;
    }
    html += "</ul>";
    container.innerHTML = html;
  }
};
