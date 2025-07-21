const Auth = {
  cekLoginOtomatis: () => {
    const nama = localStorage.getItem("nama");
    if (nama) {
      Auth.login(nama);
    } else {
      document.getElementById("login-form").style.display = "block";
    }
  },

  login: (nama) => {
    localStorage.setItem("nama", nama);
    document.getElementById("user-name").textContent = nama;
    document.getElementById("login-form").style.display = "none";

    Wallet.tampilkan();
    Wallet.simpanKeServer(); // ⬅️ Sinkron otomatis saat login
  }
};

// Event listener untuk tombol login
document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit-name");
  if (submit) {
    submit.addEventListener("click", () => {
      const nama = document.getElementById("input-name").value.trim();
      if (nama) Auth.login(nama);
    });
  }
});
