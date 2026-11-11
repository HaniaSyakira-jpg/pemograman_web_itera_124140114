
"""Program utama sistem manajemen perpustakaan."""

from library import Library
from library_item import Book, Magazine


def main():
    """Menjalankan seluruh fitur sistem perpustakaan."""

    # Membuat objek perpustakaan
    perpustakaan = Library("Perpustakaan ITERA")

    # Membuat objek buku
    buku1 = Book(
        "B001",
        "Pemrograman Python",
        2023,
        "Andi Pratama"
    )

    buku2 = Book(
        "B002",
        "Dasar-Dasar OOP",
        2022,
        "Siti Rahma"
    )

    # Membuat objek majalah
    majalah1 = Magazine(
        "M001",
        "Teknologi Masa Kini",
        2024,
        "Edisi 12"
    )

    majalah2 = Magazine(
        "M002",
        "Sains dan Inovasi",
        2023,
        "Edisi 08"
    )

    print("=" * 78)
    print("             SISTEM MANAJEMEN PERPUSTAKAAN")
    print("=" * 78)

    # 1. Menambahkan item
    print("\n1. MENAMBAHKAN ITEM")

    perpustakaan.tambah_item(buku1)
    perpustakaan.tambah_item(buku2)
    perpustakaan.tambah_item(majalah1)
    perpustakaan.tambah_item(majalah2)

    # 2. Menampilkan katalog
    print("\n2. MENAMPILKAN KATALOG")

    perpustakaan.tampilkan_katalog()

    # 3. Mencari item berdasarkan judul
    print("\n3. MENCARI ITEM BERDASARKAN JUDUL")

    perpustakaan.cari_item("Python")

    # 4. Mencari item berdasarkan ID
    print("\n4. MENCARI ITEM BERDASARKAN ID")

    perpustakaan.cari_item("M001")

    # 5. Demonstrasi status peminjaman
    print("\n5. DEMONSTRASI STATUS PEMINJAMAN")

    print(
        f"Status '{buku1.judul}' sebelum dipinjam: "
        f"{'Dipinjam' if buku1.is_dipinjam else 'Tersedia'}"
    )

    buku1.pinjam()

    print(
        f"Status '{buku1.judul}' setelah dipinjam: "
        f"{'Dipinjam' if buku1.is_dipinjam else 'Tersedia'}"
    )

    print("\nKatalog setelah buku dipinjam:")

    perpustakaan.tampilkan_katalog()

    # 6. Demonstrasi polymorphism
    print("\n6. DEMONSTRASI POLYMORPHISM (DENDA)")

    hari_terlambat = 3

    denda_buku = buku1.hitung_denda(hari_terlambat)
    denda_majalah = majalah1.hitung_denda(hari_terlambat)

    print(
        f"Denda buku untuk {hari_terlambat} hari: "
        f"Rp{denda_buku:,}"
    )

    print(
        f"Denda majalah untuk {hari_terlambat} hari: "
        f"Rp{denda_majalah:,}"
    )

    # 7. Mengembalikan buku
    buku1.kembalikan()

    print(
        f"\nStatus '{buku1.judul}' setelah dikembalikan: "
        f"{'Dipinjam' if buku1.is_dipinjam else 'Tersedia'}"
    )

    print("\n" + "=" * 78)
    print("                  PROGRAM SELESAI")
    print("=" * 78)


if __name__ == "__main__":
    main()
