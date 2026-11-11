# ==================================================
# LATIHAN MANDIRI: CLASS BUKU
# ==================================================

class Buku:
    def __init__(self, judul, penulis, harga_asli, jumlah_halaman):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen):
        diskon = self.harga_asli * persen / 100
        return self.harga_asli - diskon

    def __str__(self):
        return (
            f"Judul       : {self.judul}\n"
            f"Penulis     : {self.penulis}\n"
            f"Harga Asli  : Rp{self.harga_asli:,.0f}\n"
            f"Jumlah Halaman: {self.jumlah_halaman}"
        )

    def __len__(self):
        return self.jumlah_halaman


# Membuat objek Buku
print("\n" + "=" * 40)
print("LATIHAN MANDIRI: CLASS BUKU")
print("=" * 40)

buku1 = Buku("Belajar Python", "Andi", 100000, 250)

print(buku1)
print(f"Harga setelah diskon 20%: Rp{buku1.hitung_harga_diskon(20):,.0f}")
print(f"Jumlah halaman: {len(buku1)}")