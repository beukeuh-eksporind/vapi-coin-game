const Auth = {
  namaDefault: "Tamu",

  mulai: function () {
    let nama = localStorage.getItem("namaPengguna");

    // Jika belum ada nama, buat otomatis
    if (!nama) {
      const randomId = Math.floor(1000 + Math.random() * 9000); // 4 digit acak
      nama = `${this.namaDefault}#${randomId}`;
      localStorage.setItem("namaPengguna", nama);
    }

    // Tampilkan di UI
    document.getElementById("user-name").textContent = nama;
    Wallet.inisialisasi();
  }
};

// Jalankan langsung
document.addEventListener("DOMContentLoaded", () => {
  Auth.mulai();
});
