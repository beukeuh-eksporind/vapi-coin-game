document.addEventListener("DOMContentLoaded", () => {
  const namaTersimpan = localStorage.getItem("namaPengguna");

  if (namaTersimpan) {
    // Jika sudah login sebelumnya
    document.getElementById("login-form").style.display = "none";
    Wallet.inisialisasi();
    Game.perbaruiXP();
  } else {
    // Jika belum login, tampilkan form
    document.getElementById("login-form").style.display = "flex";
  }

  document.getElementById("submit-name").addEventListener("click", () => {
    const inputNama = document.getElementById("input-name").value.trim();
    if (!inputNama) {
      alert("⚠️ Silakan masukkan nama dulu.");
      return;
    }

    // Simpan nama & sembunyikan form
    localStorage.setItem("namaPengguna", inputNama);
    document.getElementById("login-form").style.display = "none";

    // Mulai game
    Wallet.inisialisasi();
    Game.perbaruiXP();
  });
});
