// auth.js

const Auth = {
  cekLoginOtomatis() {
    const nama = localStorage.getItem("nama");
    if (nama) {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("user-name").textContent = nama;
      Wallet.loadDariBackend(nama); // Ambil data dari server
    } else {
      document.getElementById("login-form").style.display = "block";
    }
  },

  loginManual() {
    const nama = document.getElementById("input-name").value.trim();
    if (!nama) return alert("Masukkan nama dulu");

    localStorage.setItem("nama", nama);
    document.getElementById("user-name").textContent = nama;
    document.getElementById("login-form").style.display = "none";
    Wallet.loadDariBackend(nama); // Ambil data dari server
  }
};

// Event listener untuk tombol login
document.getElementById("submit-name").addEventListener("click", Auth.loginManual);
