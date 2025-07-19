// === exchange.js: Penarikan Otomatis Tanpa Admin ===

const Exchange = (() => { const KONVERSI = Config.rasioKoin; const MIN_COINS = Config.minWithdraw;

function formatRupiah(amount) { return "Rp " + amount.toLocaleString("id-ID"); }

function tampilkanFormTukar() { const koinSekarang = Wallet.getCoins();

if (!Wallet.canWithdraw(Config.batasPenarikanPerHari)) {
  alert("Kamu sudah menarik koin hari ini. Coba lagi besok ya!");
  return;
}

if (koinSekarang < MIN_COINS) {
  alert(`Minimal ${MIN_COINS} koin (${formatRupiah(MIN_COINS / 100 * KONVERSI)}) untuk penarikan.`);
  return;
}

const koinYangDitarik = Math.floor(koinSekarang / 100) * 100;
const jumlahIDR = (koinYangDitarik / 100) * KONVERSI;

const konfirmasi = confirm(`Tukar ${koinYangDitarik} koin menjadi ${formatRupiah(jumlahIDR)}?`);
if (konfirmasi) {
  const sukses = Wallet.deductCoins(koinYangDitarik, "auto-withdraw");
  if (sukses) {
    alert(`Berhasil dicairkan: ${formatRupiah(jumlahIDR)} ke saldo virtual kamu. 🟢`);
    tampilkanRiwayat();
    Game && Game.updateDisplay && Game.updateDisplay();
  } else {
    alert("Gagal mencairkan. Saldo tidak cukup.");
  }
}

}

function tampilkanRiwayat() { const history = Wallet.getHistory(); const wrapper = document.getElementById("riwayat"); if (!wrapper) return;

wrapper.innerHTML = "<h3>Riwayat Transaksi</h3>";
const list = document.createElement("ul");

history.forEach(item => {
  const li = document.createElement("li");
  const waktu = new Date(item.time).toLocaleString("id-ID");
  if (item.type === "add") {
    li.innerText = `+${item.amount} koin dari ${item.source} • ${waktu}`;
  } else {
    const rupiah = formatRupiah(item.amount / 100 * KONVERSI);
    li.innerText = `- ${item.amount} koin untuk ${item.reason} • ${waktu} • ${rupiah}`;
  }
  list.appendChild(li);
});

wrapper.appendChild(list);

}

return { tampilkanFormTukar, tampilkanRiwayat }; })();

