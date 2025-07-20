const Wallet = {
  inisialisasi: function () {
    const coins = parseInt(localStorage.getItem("coins") || "0");
    const xp = parseInt(localStorage.getItem("xp") || "0");
    const level = parseInt(localStorage.getItem("level") || "1");
    const nama = localStorage.getItem("namaPengguna") || "Tamu";

    const idr = coins * Config.rateTukar;

    // Update tampilan UI
    document.getElementById("user-name").innerText = nama;
    document.getElementById("coins").innerText = coins;
    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = level;
    document.getElementById("idr").innerText = idr.toLocaleString("id-ID");

    // Update progress bar XP juga
    const persenXP = Math.min(100, (xp % 50) * 2);
    document.getElementById("xp-bar").style.width = `${persenXP}%`;
  }
};
