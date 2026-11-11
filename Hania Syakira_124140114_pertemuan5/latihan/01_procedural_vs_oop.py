
# ==============================================================================
# Berkas: 01_procedural_vs_oop.py
# Deskripsi: Perbandingan praktis penanganan data mahasiswa via Prosedural vs OOP
# ==============================================================================

# ------------------------------------------------------------------------------
# PENDEKATAN 1: PROSEDURAL (Data dan Fungsi Terpisah)
# ------------------------------------------------------------------------------

mahasiswa_proc = {
    "nama": "Budi Santoso",
    "nim": "121140001",
    "jurusan": "Teknik Informatika",
    "ipk": 3.45
}


def cetak_profil_prosedural(mhs):
    """Menampilkan profil mahasiswa menggunakan pendekatan prosedural."""
    print(
        f"[Prosedural] {mhs['nama']} ({mhs['nim']}) - "
        f"{mhs['jurusan']} | IPK: {mhs['ipk']}"
    )


def perbarui_ipk_prosedural(mhs, ipk_baru):
    """Memperbarui IPK mahasiswa jika nilainya valid."""
    if 0.0 <= ipk_baru <= 4.0:
        mhs['ipk'] = ipk_baru
    else:
        print("Nilai IPK tidak valid!")


cetak_profil_prosedural(mahasiswa_proc)
perbarui_ipk_prosedural(mahasiswa_proc, 3.75)
cetak_profil_prosedural(mahasiswa_proc)


# ------------------------------------------------------------------------------
# PENDEKATAN 2: OBJECT-ORIENTED
# ------------------------------------------------------------------------------

class Mahasiswa:
    """Class untuk merepresentasikan data dan perilaku mahasiswa."""

    def __init__(self, nama: str, nim: str, jurusan: str, ipk: float):
        """Menginisialisasi atribut objek mahasiswa."""
        self.nama = nama
        self.nim = nim
        self.jurusan = jurusan
        self.ipk = ipk

    def cetak_profil(self):
        """Menampilkan profil mahasiswa."""
        print(
            f"[OOP] {self.nama} ({self.nim}) - "
            f"{self.jurusan} | IPK: {self.ipk}"
        )

    def update_ipk(self, ipk_baru: float):
        """Memperbarui IPK jika berada pada rentang 0.0 sampai 4.0."""
        if 0.0 <= ipk_baru <= 4.0:
            self.ipk = ipk_baru
            print(
                f"IPK {self.nama} berhasil diperbarui menjadi {self.ipk}"
            )
        else:
            print(
                "Peringatan: Nilai IPK harus berada pada rentang "
                "0.0 s.d 4.0!"
            )


print("\n--- Eksekusi Paradigma OOP ---")

mhs_oop = Mahasiswa(
    "Siti Rahma",
    "121140002",
    "Teknik Informatika",
    3.80
)

mhs_oop.cetak_profil()
mhs_oop.update_ipk(3.92)
mhs_oop.cetak_profil()


# ------------------------------------------------------------------------------
# LATIHAN MANDIRI: PEMODELAN ENTITAS SISTEM KASIR TOKO
# ------------------------------------------------------------------------------

"""
1. Produk
   Atribut:
   - nama_produk
   - harga
   - stok

   Method:
   - tampilkan_detail()
   - perbarui_stok()

2. Keranjang
   Atribut:
   - daftar_produk
   - total_harga
   - jumlah_item

   Method:
   - tambah_produk()
   - hapus_produk()

3. Pengguna
   Atribut:
   - nama
   - email
   - alamat

   Method:
   - tampilkan_profil()
   - perbarui_alamat()
"""
