
"""Modul untuk mengelola data anggota perpustakaan."""


class Member:
    """Class untuk menyimpan dan mengelola data anggota."""

    def __init__(self, member_id, nama):
        """Menginisialisasi data anggota.

        Args:
            member_id (str): ID unik anggota.
            nama (str): Nama lengkap anggota.
        """
        self.__member_id = member_id
        self.__nama = nama
        self.__daftar_pinjam = []

    @property
    def member_id(self):
        """Mengembalikan ID anggota."""
        return self.__member_id

    @property
    def nama(self):
        """Mengembalikan nama anggota."""
        return self.__nama

    @property
    def daftar_pinjam(self):
        """Mengembalikan salinan daftar item yang dipinjam."""
        return self.__daftar_pinjam.copy()

    def pinjam_item(self, item):
        """Menambahkan item ke daftar pinjaman anggota.

        Args:
            item: Objek buku atau majalah.

        Returns:
            bool: True jika berhasil dipinjam.
        """
        if item.is_dipinjam:
            print(f"Item '{item.judul}' sedang dipinjam.")
            return False

        if item.pinjam():
            self.__daftar_pinjam.append(item)
            print(
                f"{self.__nama} berhasil meminjam "
                f"'{item.judul}'."
            )
            return True

        return False

    def kembalikan_item(self, item):
        """Mengembalikan item yang sedang dipinjam anggota.

        Args:
            item: Objek buku atau majalah.

        Returns:
            bool: True jika berhasil dikembalikan.
        """
        if item not in self.__daftar_pinjam:
            print("Item tidak ditemukan dalam daftar pinjaman.")
            return False

        item.kembalikan()
        self.__daftar_pinjam.remove(item)

        print(
            f"{self.__nama} berhasil mengembalikan "
            f"'{item.judul}'."
        )
        return True

    def tampilkan_info(self):
        """Menampilkan informasi anggota dan daftar pinjamannya."""
        print("\nINFORMASI ANGGOTA")
        print("-" * 40)
        print(f"ID Anggota : {self.__member_id}")
        print(f"Nama       : {self.__nama}")
        print(f"Jumlah item dipinjam : {len(self.__daftar_pinjam)}")

        if self.__daftar_pinjam:
            print("Daftar pinjaman:")
            for item in self.__daftar_pinjam:
                print(f"- {item.judul}")
        else:
            print("Belum ada item yang dipinjam.")

        print("-" * 40)
