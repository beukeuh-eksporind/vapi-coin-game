const BonusHarian = {
  syaratTap: 5, // jumlah tap bayi untuk klaim bonus

  // Ambil data dari localStorage atau buat baru
  ambilData: () => {
    const hariIni = BonusHarian.hariSekarang();
    let data = JSON.parse(localStorage.getItem('misiHarian')) || {};
    if (data.tanggal !== hariIni) {
      data = {
        tanggal: hariIni,
        tapHariIni: 0,
        selesai: false
      };
      localStorage.setItem('misiHarian', JSON.stringify(data));
    }
    return data;
  },

  // Simpan data ke localStorage
  simpanData: (data) => {
    localStorage.setItem('misiHarian', JSON.stringify(data));
  },

  // Format tanggal hari ini (DD/MM/YYYY)
  hariSekarang: () => {
    const d = new Date();
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  },

  // Tambah jumlah tap saat bayi disentuh
  tambahTap: () => {
    const data = BonusHarian.ambilData();
    if (data.selesai) return;
    data.tapHariIni++;
    BonusHarian.simpanData(data);

    if (data.tapHariIni >= BonusHarian.syaratTap && !data.selesai) {
      BonusHarian.klaimBonus();
    }
  },

  // Klaim bonus harian
  klaimBonus: () => {
    const data = BonusHarian.ambilData();
    if (data.selesai) return;

    // Tambahkan koin ke dompet
    Wallet.tambahKoin(50);

    // Tandai sudah selesai
    data.selesai = true;
    BonusHarian.simpanData(data);

    // Tampilkan animasi bonus
    BonusHarian.tampilkanBonusPopup();

    // Simpan ke backend
    simpanKeServer();

    console.log('🎁 Bonus harian diklaim!');
  },

  // Tampilkan popup bonus
  tampilkanBonusPopup: () => {
    const el = document.getElementById('bonus-popup');
    el.classList.add('show');
    setTimeout(() => {
      el.classList.remove('show');
    }, 2000);
  },

  // Saat game dimuat
  cekDanKlaim: () => {
    const data = BonusHarian.ambilData();
    if (!data.selesai && data.tapHariIni >= BonusHarian.syaratTap) {
      BonusHarian.klaimBonus();
    }
  }
};
