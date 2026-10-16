
"use strict";

// ========================================
// 1. KONFIGURASI DAN ELEMEN HTML
// ========================================

const STORAGE_KEY = "miniPOS_keranjang";
const BATAS_DISKON = 50000;
const PERSENTASE_DISKON = 0.10;
const KODE_PROMO = "HEMAT10";

const formBarang = document.getElementById("formBarang");
const namaBarang = document.getElementById("namaBarang");
const hargaBarang = document.getElementById("hargaBarang");
const jumlahBarang = document.getElementById("jumlahBarang");

const daftarKeranjang = document.getElementById("daftarKeranjang");
const subtotalElement = document.getElementById("subtotal");
const diskonElement = document.getElementById("diskon");
const totalBayarElement = document.getElementById("totalBayar");

const kodePromoInput = document.getElementById("kodePromo");
const gunakanPromoButton = document.getElementById("gunakanPromo");
const pesanPromo = document.getElementById("pesanPromo");

const uangBayar = document.getElementById("uangBayar");
const hasilKembalian = document.getElementById("hasilKembalian");
const tombolTransaksiBaru = document.getElementById("transaksiBaru");

let keranjang = muatKeranjang();
let promoAktif = false;

// ========================================
// 2. LOCALSTORAGE
// ========================================

function muatKeranjang() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (data === null) {
            return [];
        }

        const hasil = JSON.parse(data);

        if (!Array.isArray(hasil)) {
            return [];
        }

        return hasil.filter(function (barang) {
            return barang &&
                typeof barang.nama === "string" &&
                barang.nama.trim().length >= 3 &&
                Number.isSafeInteger(barang.harga) &&
                barang.harga >= 500 &&
                Number.isSafeInteger(barang.jumlah) &&
                barang.jumlah >= 1 &&
                Number.isFinite(barang.id);
        });
    } catch (error) {
        console.error("Gagal memuat keranjang:", error);
        return [];
    }
}

function simpanKeranjang() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(keranjang)
        );
    } catch (error) {
        console.error("Gagal menyimpan keranjang:", error);
        alert("Keranjang gagal disimpan di browser.");
    }
}

// ========================================
// 3. FORMAT RUPIAH
// ========================================

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// ========================================
// 4. VALIDASI INPUT
// ========================================

function tampilkanError(input, idError, pesan) {
    document.getElementById(idError).textContent = pesan;

    input.classList.toggle("input-error", pesan !== "");

    input.setAttribute(
        "aria-invalid",
        pesan !== "" ? "true" : "false"
    );
}

function validasiBarang() {
    let valid = true;

    const nama = namaBarang.value.trim();
    const hargaText = hargaBarang.value.trim();
    const jumlahText = jumlahBarang.value.trim();

    const harga = Number(hargaText);
    const jumlah = Number(jumlahText);

    if (nama.length < 3) {
        tampilkanError(
            namaBarang,
            "errorNama",
            "Nama barang wajib minimal 3 karakter."
        );
        valid = false;
    } else {
        tampilkanError(namaBarang, "errorNama", "");
    }

    if (
        hargaText === "" ||
        !Number.isSafeInteger(harga) ||
        harga < 500
    ) {
        tampilkanError(
            hargaBarang,
            "errorHarga",
            "Harga harus berupa angka minimal Rp500."
        );
        valid = false;
    } else {
        tampilkanError(hargaBarang, "errorHarga", "");
    }

    if (
        jumlahText === "" ||
        !Number.isSafeInteger(jumlah) ||
        jumlah < 1
    ) {
        tampilkanError(
            jumlahBarang,
            "errorJumlah",
            "Jumlah harus bilangan bulat minimal 1."
        );
        valid = false;
    } else {
        tampilkanError(jumlahBarang, "errorJumlah", "");
    }

    if (!valid) {
        return null;
    }

    return {
        nama: nama,
        harga: harga,
        jumlah: jumlah
    };
}

// ========================================
// 5. TAMBAH BARANG
// ========================================

formBarang.addEventListener("submit", function (event) {
    event.preventDefault();

    const barang = validasiBarang();

    if (barang === null) {
        return;
    }

    keranjang.push({
        id: Date.now() + Math.random(),
        nama: barang.nama,
        harga: barang.harga,
        jumlah: barang.jumlah
    });

    simpanKeranjang();
    renderKeranjang();

    formBarang.reset();

    tampilkanError(namaBarang, "errorNama", "");
    tampilkanError(hargaBarang, "errorHarga", "");
    tampilkanError(jumlahBarang, "errorJumlah", "");

    namaBarang.focus();
});

// ========================================
// 6. TAMPILKAN KERANJANG
// ========================================

function renderKeranjang() {
    daftarKeranjang.replaceChildren();

    if (keranjang.length === 0) {
        const baris = document.createElement("tr");
        const kolom = document.createElement("td");

        kolom.colSpan = 6;
        kolom.className = "empty-message";
        kolom.textContent = "Keranjang masih kosong.";

        baris.appendChild(kolom);
        daftarKeranjang.appendChild(baris);
    } else {
        keranjang.forEach(function (barang, index) {
            const baris = document.createElement("tr");

            const data = [
                index + 1,
                barang.nama,
                formatRupiah(barang.harga),
                barang.jumlah,
                formatRupiah(barang.harga * barang.jumlah)
            ];

            data.forEach(function (nilai) {
                const kolom = document.createElement("td");
                kolom.textContent = nilai;
                baris.appendChild(kolom);
            });

            const kolomAksi = document.createElement("td");
            const tombolHapus = document.createElement("button");

            tombolHapus.type = "button";
            tombolHapus.textContent = "Hapus";
            tombolHapus.className = "btn btn-secondary";

            tombolHapus.addEventListener("click", function () {
                hapusBarang(barang.id);
            });

            kolomAksi.appendChild(tombolHapus);
            baris.appendChild(kolomAksi);

            daftarKeranjang.appendChild(baris);
        });
    }

    hitungTotal();
}

// ========================================
// 7. HAPUS BARANG
// ========================================

function hapusBarang(id) {
    keranjang = keranjang.filter(function (barang) {
        return barang.id !== id;
    });

    simpanKeranjang();
    renderKeranjang();
}

// ========================================
// 8. HITUNG TOTAL DAN DISKON
// ========================================

function hitungTotal() {
    const subtotal = keranjang.reduce(function (total, barang) {
        return total + barang.harga * barang.jumlah;
    }, 0);

    let diskon = 0;

    // Diskon otomatis 10% jika subtotal minimal Rp50.000.
    // Kode promo juga memberi diskon 10% untuk subtotal di bawah batas.
    if (subtotal >= BATAS_DISKON || promoAktif) {
        diskon = Math.round(subtotal * PERSENTASE_DISKON);
    }

    const totalAkhir = subtotal - diskon;

    subtotalElement.textContent = formatRupiah(subtotal);
    diskonElement.textContent = formatRupiah(diskon);
    totalBayarElement.textContent = formatRupiah(totalAkhir);

    hitungKembalian();
}

// ========================================
// 9. KODE PROMO HEMAT10
// ========================================

gunakanPromoButton.addEventListener("click", function () {
    const kode = kodePromoInput.value.trim().toUpperCase();

    if (kode === KODE_PROMO) {
        promoAktif = true;

        pesanPromo.textContent =
            "Kode HEMAT10 berhasil digunakan! Diskon 10% aktif.";

        pesanPromo.className = "promo-success";
    } else {
        promoAktif = false;

        pesanPromo.textContent =
            "Kode promo tidak valid. Gunakan HEMAT10.";

        pesanPromo.className = "promo-error";
    }

    hitungTotal();
});

// Jika kode promo diedit, minta pengguna menerapkannya kembali.
kodePromoInput.addEventListener("input", function () {
    if (promoAktif) {
        promoAktif = false;
        pesanPromo.textContent =
            "Klik Gunakan untuk menerapkan kode promo.";
        pesanPromo.className = "";
        hitungTotal();
    }
});

// ========================================
// 10. UANG BAYAR DAN KEMBALIAN
// ========================================

function hitungKembalian() {
    const subtotal = keranjang.reduce(function (total, barang) {
        return total + barang.harga * barang.jumlah;
    }, 0);

    let diskon = 0;

    if (subtotal >= BATAS_DISKON || promoAktif) {
        diskon = Math.round(subtotal * PERSENTASE_DISKON);
    }

    const totalAkhir = subtotal - diskon;
    const uangText = uangBayar.value.trim();

    hasilKembalian.className = "payment-message";

    if (uangText === "") {
        hasilKembalian.textContent =
            "Masukkan uang bayar untuk menghitung kembalian.";
        return;
    }

    const uang = Number(uangText);

    if (
        !Number.isSafeInteger(uang) ||
        uang < 0
    ) {
        hasilKembalian.textContent =
            "Masukkan nominal uang bayar berupa bilangan bulat yang valid.";
        hasilKembalian.classList.add("payment-error");
        return;
    }

    if (keranjang.length === 0) {
        hasilKembalian.textContent =
            "Tambahkan barang terlebih dahulu.";
        return;
    }

    if (uang < totalAkhir) {
        hasilKembalian.textContent =
            "Uang kurang " + formatRupiah(totalAkhir - uang) + ".";

        hasilKembalian.classList.add("payment-error");
    } else {
        hasilKembalian.textContent =
            "Kembalian: " + formatRupiah(uang - totalAkhir);

        hasilKembalian.classList.add("payment-success");
    }
}

uangBayar.addEventListener("input", hitungKembalian);

// ========================================
// 11. TRANSAKSI BARU
// ========================================

tombolTransaksiBaru.addEventListener("click", function () {
    const konfirmasi = confirm(
        "Kosongkan keranjang dan mulai transaksi baru?"
    );

    if (!konfirmasi) {
        return;
    }

    keranjang = [];
    promoAktif = false;

    localStorage.removeItem(STORAGE_KEY);

    formBarang.reset();
    uangBayar.value = "";
    kodePromoInput.value = "";

    pesanPromo.textContent = "";
    pesanPromo.className = "";

    tampilkanError(namaBarang, "errorNama", "");
    tampilkanError(hargaBarang, "errorHarga", "");
    tampilkanError(jumlahBarang, "errorJumlah", "");

    renderKeranjang();
    namaBarang.focus();
});

// ========================================
// 12. PERBARUI VALIDASI SAAT INPUT DIUBAH
// ========================================

[namaBarang, hargaBarang, jumlahBarang].forEach(function (input) {
    input.addEventListener("input", function () {
        if (input.classList.contains("input-error")) {
            validasiBarang();
        }
    });
});

// ========================================
// 13. TAMPILKAN DATA SAAT HALAMAN DIBUKA
// ========================================

renderKeranjang();
