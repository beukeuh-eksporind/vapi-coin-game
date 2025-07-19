const Auth = {
  mulai: function () {
    const namaTersimpan = localStorage.getItem("namaPengguna");

    if (namaTersimpan) {
      document.getElementById("user-name").textContent = namaTersimpan;
      document.getElementById("login-form").style.display = "none";
    }

    document.getElementById("submit-name").addEventListener("click", function () {
      const namaInput = document.getElementById("input-name").value.trim();

      if (namaInput !== "") {
        localStorage.setItem("namaPengguna", namaInput);
        document.getElementById("user-name").textContent = namaInput;
        document.getElementById("login-form").style.display = "none";
        Wallet.inisialisasi();
      } else {
        alert("Silakan masukkan nama terlebih dahulu.");
      }
    });
  }
};

// Panggil saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  Auth.mulai();
});
