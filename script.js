// Fungsi bawaan OneCompiler (diberi pengecekan agar tidak error jika elemen currentTime tidak ada)
function showTime() {
  const timeEl = document.getElementById('currentTime');
  if (timeEl) {
    timeEl.innerHTML = new Date().toUTCString();
  }
}
showTime();
setInterval(function () {
  showTime();
}, 1000);

// ============ SE: FUNGSI KALKULATOR SIMULASI BIAYA ============
function hitungTotalSesi() {
  // 1. Membaca nilai harga paket yang dipilih dan jumlah pemesanan
  const hargaPaket = parseFloat(document.getElementById("paket-layanan").value);
  const jumlahSesi = parseInt(document.getElementById("jumlah-sesi").value) || 0;
  const inputPromo = document.getElementById("kode-promo");
  
  // Memastikan teks kode promo menjadi huruf kapital (CAPSLOCK)
  inputPromo.value = inputPromo.value.toUpperCase();
  const kodePromo = inputPromo.value.trim();

  const elemenHasil = document.getElementById("hasil-kalkulator");

  // Validasi agar jumlah pemesanan minimal 1 sesi
  if (jumlahSesi < 1) {
    elemenHasil.innerHTML = "<p style='color:red;'>Jumlah sesi pemesanan minimal 1!</p>";
    return;
  }

  // 2. Mengalikan harga paket dengan jumlah pemesanan
  const totalHargaAwal = hargaPaket * jumlahSesi;

  // 3. Menghitung diskon kode promo NOVANEXT (15%)
  let potonganDiskon = 0;
  let keteranganPromo = "Tidak menggunakan kode promo";

  if (kodePromo === "NOVANEXT") {
    potonganDiskon = totalHargaAwal * 0.15;
    keteranganPromo = "<span style='color:green;'>Kode <strong>NOVANEXT</strong> aktif (Diskon 15%)</span>";
  } else if (kodePromo !== "") {
    keteranganPromo = "<span style='color:red;'>Kode promo tidak ditemukan (Diskon 0%)</span>";
  }

  // 4. Menghitung total akhir setelah dikurangi diskon
  const totalAkhir = totalHargaAwal - potonganDiskon;

  // 5. Menampilkan hasil perhitungan ke elemen HTML
  elemenHasil.innerHTML = `
    <h3>Rincian Simulasi Biaya</h3>
    <p>Harga Paket per Sesi: Rp${hargaPaket.toLocaleString('id-ID')}</p>
    <p>Jumlah Pemesanan: ${jumlahSesi} Sesi</p>
    <p>Subtotal Harga: Rp${totalHargaAwal.toLocaleString('id-ID')}</p>
    <p>Status Promo: ${keteranganPromo}</p>
    <p>Potongan Diskon: -Rp${potonganDiskon.toLocaleString('id-ID')}</p>
    <hr>
    <p><strong>Total Biaya Akhir: Rp${totalAkhir.toLocaleString('id-ID')}</strong></p>
  `;
}