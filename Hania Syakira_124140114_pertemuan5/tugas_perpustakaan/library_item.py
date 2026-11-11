
"""Modul abstract class dan subclass item perpustakaan."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract class sebagai dasar semua item perpustakaan."""

    def __init__(self, item_id, judul, tahun_terbit):
        """Menginisialisasi data item perpustakaan.

        Args:
            item_id (str): ID unik item.
            judul (str): Judul item.
            tahun_terbit (int): Tahun terbit item.
        """
        self._item_id = item_id
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self.__is_dipinjam = False

    @property
    def item_id(self):
        """Mengembalikan ID item."""
        return self._item_id

    @property
    def judul(self):
        """Mengembalikan judul item."""
        return self._judul

    @property
    def tahun_terbit(self):
        """Mengembalikan tahun terbit item."""
        return self._tahun_terbit

    @property
    def is_dipinjam(self):
        """Mengembalikan status peminjaman item."""
        return self.__is_dipinjam

    def pinjam(self):
        """Mengubah status item menjadi dipinjam."""
        if self.__is_dipinjam:
            return False

        self.__is_dipinjam = True
        return True

    def kembalikan(self):
        """Mengubah status item menjadi tersedia."""
        if not self.__is_dipinjam:
            return False

        self.__is_dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        """Mengembalikan detail informasi item."""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda berdasarkan hari keterlambatan.

        Args:
            hari_terlambat (int): Jumlah hari keterlambatan.

        Returns:
            int: Total denda dalam rupiah.
        """
        pass


class Book(LibraryItem):
    """Subclass untuk menyimpan data buku."""

    def __init__(self, item_id, judul, tahun_terbit, penulis):
        """Menginisialisasi data buku."""
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis

    def get_detail(self):
        """Mengembalikan detail informasi buku."""
        return (
            f"Buku | ID: {self.item_id} | "
            f"Judul: {self.judul} | "
            f"Penulis: {self._penulis} | "
            f"Tahun: {self.tahun_terbit}"
        )

    def hitung_denda(self, hari_terlambat):
        """Menghitung denda buku sebesar Rp2.000 per hari."""
        return max(0, hari_terlambat) * 2000


class Magazine(LibraryItem):
    """Subclass untuk menyimpan data majalah."""

    def __init__(self, item_id, judul, tahun_terbit, edisi):
        """Menginisialisasi data majalah."""
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi

    def get_detail(self):
        """Mengembalikan detail informasi majalah."""
        return (
            f"Majalah | ID: {self.item_id} | "
            f"Judul: {self.judul} | "
            f"Edisi: {self._edisi} | "
            f"Tahun: {self.tahun_terbit}"
        )

    def hitung_denda(self, hari_terlambat):
        """Menghitung denda majalah sebesar Rp1.000 per hari."""
        return max(0, hari_terlambat) * 1000
