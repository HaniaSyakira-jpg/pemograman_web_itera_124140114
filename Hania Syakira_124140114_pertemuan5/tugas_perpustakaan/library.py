
"""Modul untuk mengelola koleksi perpustakaan."""

from library_item import LibraryItem


class Library:
    """Class untuk menyimpan dan mengelola item perpustakaan."""

    def __init__(self, nama_perpustakaan):
        """Membuat objek perpustakaan.

        Args:
            nama_perpustakaan (str): Nama perpustakaan.
        """
        self.nama_perpustakaan = nama_perpustakaan
        self.__koleksi = []

    def tambah_item(self, item):
        """Menambahkan item ke dalam koleksi perpustakaan.

        Args:
            item (LibraryItem): Objek buku atau majalah.

        Returns:
            bool: True jika berhasil, False jika gagal.
        """
        if not isinstance(item, LibraryItem):
            print("Gagal: Item harus turunan LibraryItem.")
            return False

        for data in self.__koleksi:
            if data.item_id == item.item_id:
                print(f"Gagal: ID {item.item_id} sudah digunakan.")
                return False

        self.__koleksi.append(item)
        print(f"Berhasil menambahkan: {item.judul}")
        return True

    def tampilkan_katalog(self):
        """Menampilkan seluruh item yang tersedia."""

        print(f"\nKATALOG {self.nama_perpustakaan.upper()}")
        print("-" * 78)

        tersedia = [
            item for item in self.__koleksi
            if not item.is_dipinjam
        ]

        if not tersedia:
            print("Tidak ada item yang tersedia.")

        for nomor, item in enumerate(tersedia, start=1):
            print(
                f"{nomor}. {item.get_detail()} "
                f"| Status: Tersedia"
            )

        print("-" * 78)

    def cari_item(self, kata_kunci):
        """Mencari item berdasarkan judul atau ID.

        Args:
            kata_kunci (str): Judul atau ID item.

        Returns:
            list: Daftar item yang ditemukan.
        """
        kata_kunci = kata_kunci.lower()

        hasil = [
            item for item in self.__koleksi
            if kata_kunci in item.item_id.lower()
            or kata_kunci in item.judul.lower()
        ]

        print(f"\nHasil pencarian '{kata_kunci}':")

        if not hasil:
            print("Item tidak ditemukan.")

        for item in hasil:
            if item.is_dipinjam:
                status = "Dipinjam"
            else:
                status = "Tersedia"

            print(
                f"- {item.get_detail()} "
                f"| Status: {status}"
            )

        return hasil

    def cari_berdasarkan_id(self, item_id):
        """Mencari satu item berdasarkan ID secara tepat.

        Args:
            item_id (str): ID item yang dicari.

        Returns:
            LibraryItem atau None: Item jika ditemukan.
        """
        for item in self.__koleksi:
            if item.item_id.lower() == item_id.lower():
                return item

        return None
