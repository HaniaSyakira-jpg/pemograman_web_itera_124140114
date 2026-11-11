
# ==============================================================================
# Berkas: 06_abstract_class.py
# Deskripsi: Penerapan ABC, Abstract Method, Interface, dan Enforcement
# ==============================================================================

from abc import ABC, abstractmethod
import math

# ------------------------------------------------------------------------------
# 1. ABSTRACT BASE CLASS: SHAPE GEOMETRI
# ------------------------------------------------------------------------------
class Shape(ABC):
    def __init__(self, nama: str):
        self.nama = nama

    @abstractmethod
    def luas(self) -> float:
        """Menghitung luas area bangun datar."""
        pass

    @abstractmethod
    def keliling(self) -> float:
        """Menghitung keliling bangun datar."""
        pass

    # CONCRETE METHOD
    def cetak_laporan(self):
        print(
            f"[{self.nama}] Luas: {self.luas():.2f} unit persegi "
            f"| Keliling: {self.keliling():.2f} unit"
        )

class PersegiPanjang(Shape):
    def __init__(self, panjang: float, lebar: float):
        super().__init__("Persegi Panjang")
        self.panjang = panjang
        self.lebar = lebar

    def luas(self) -> float:
        return self.panjang * self.lebar

    def keliling(self) -> float:
        return 2 * (self.panjang + self.lebar)

class Lingkaran(Shape):
    def __init__(self, radius: float):
        super().__init__("Lingkaran")
        self.radius = radius

    def luas(self) -> float:
        return math.pi * (self.radius ** 2)

    def keliling(self) -> float:
        return 2 * math.pi * self.radius

# ------------------------------------------------------------------------------
# 2. INTERFACE PATTERN: KONEKTOR DATABASE
# ------------------------------------------------------------------------------
class DatabaseConnector(ABC):

    @property
    @abstractmethod
    def driver_name(self) -> str:
        """Nama mesin database."""
        pass

    @abstractmethod
    def connect(self, host: str, port: int, database: str) -> bool:
        pass

    @abstractmethod
    def execute_query(self, sql: str) -> list:
        pass

    @abstractmethod
    def disconnect(self):
        pass

class PostgreSQLConnector(DatabaseConnector):

    @property
    def driver_name(self) -> str:
        return "PostgreSQL (psycopg2)"

    def connect(self, host: str, port: int, database: str) -> bool:
        print(
            f"[{self.driver_name}] Terhubung ke "
            f"postgresql://{host}:{port}/{database} [OK]"
        )
        return True

    def execute_query(self, sql: str) -> list:
        print(f"[{self.driver_name}] Menjalankan SQL: '{sql}'")
        return [
            {"id": 1, "nama": "Ahmad"},
            {"id": 2, "nama": "Nabila"}
        ]

    def disconnect(self):
        print(
            f"[{self.driver_name}] "
            "Koneksi database ditutup dengan aman."
        )

# ------------------------------------------------------------------------------
# 3. LATIHAN MANDIRI: INTERFACE FILE STORAGE SERVICE
# ------------------------------------------------------------------------------
class FileStorage(ABC):
    """Abstract class sebagai kontrak layanan penyimpanan file."""

    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        pass

    @abstractmethod
    def download_file(self, nama_file):
        pass

class LocalDiskStorage(FileStorage):
    """Simulasi penyimpanan file pada disk lokal."""

    def __init__(self):
        self.file_storage = {}

    def upload_file(self, nama_file, data_bytes):
        self.file_storage[nama_file] = data_bytes
        print(
            f"[Local Disk] File '{nama_file}' "
            "berhasil disimpan di folder lokal."
        )

    def download_file(self, nama_file):
        if nama_file in self.file_storage:
            print(
                f"[Local Disk] File '{nama_file}' "
                "berhasil diunduh dari disk lokal."
            )
            return self.file_storage[nama_file]

        print(f"[Local Disk] File '{nama_file}' tidak ditemukan!")
        return None

class CloudStorage(FileStorage):
    """Simulasi penyimpanan file pada server cloud."""

    def __init__(self):
        self.cloud_storage = {}

    def upload_file(self, nama_file, data_bytes):
        self.cloud_storage[nama_file] = data_bytes
        print(
            f"[Cloud Storage] File '{nama_file}' "
            "berhasil diunggah ke server cloud."
        )

    def download_file(self, nama_file):
        if nama_file in self.cloud_storage:
            print(
                f"[Cloud Storage] File '{nama_file}' "
                "berhasil diunduh dari server cloud."
            )
            return self.cloud_storage[nama_file]

        print(
            f"[Cloud Storage] File '{nama_file}' tidak ditemukan!"
        )
        return None

# ------------------------------------------------------------------------------
# 4. PROGRAM UTAMA
# ------------------------------------------------------------------------------
if __name__ == "__main__":

    # 1. Uji Coba Kepatuhan Implementasi Shape
    print("--- 1. Uji Coba Kepatuhan Implementasi Shape ---")

    pp = PersegiPanjang(10, 5)
    ling = Lingkaran(7)

    pp.cetak_laporan()
    ling.cetak_laporan()

    # 2. Pembuktian Enforcement Abstract Class
    print("\n--- 2. Pembuktian Enforcement Abstract Class ---")

    try:
        bentuk_gaib = Shape("Bentuk Abstrak")
    except TypeError as err:
        print(f"Penolakan Python Terbukti: {err}")

    # Class yang tidak mengimplementasikan seluruh abstract method
    class SegitigaCacat(Shape):
        def __init__(self, alas, tinggi):
            super().__init__("Segitiga Cacat")
            self.alas = alas
            self.tinggi = tinggi

        def luas(self):
            return 0.5 * self.alas * self.tinggi

        # Tidak mengimplementasikan keliling()

    try:
        s = SegitigaCacat(6, 8)
    except TypeError as err:
        print(f"Penolakan Subclass Cacat: {err}")

    # 3. Uji Coba Interface Database Backend
    print("\n--- 3. Uji Coba Interface Database Backend ---")

    db = PostgreSQLConnector()

    db.connect("localhost", 5432, "paw_praktikum_db")

    hasil = db.execute_query(
        "SELECT id, nama FROM mahasiswa;"
    )

    print("Hasil Query Data:", hasil)

    db.disconnect()

    # 4. Latihan Mandiri: File Storage Service
    print("\n--- 4. Latihan Mandiri: File Storage Service ---")

    # Membuat objek penyimpanan lokal dan cloud
    local_storage = LocalDiskStorage()
    cloud_storage = CloudStorage()

    # Data file simulasi dalam bentuk bytes
    data_file = b"Dokumen Praktikum Pemrograman Web ITERA"

    # Menyimpan file ke penyimpanan lokal
    local_storage.upload_file("laporan.txt", data_file)

    # Mengunduh file dari penyimpanan lokal
    hasil_local = local_storage.download_file("laporan.txt")
    print("Data hasil download lokal:", hasil_local)

    # Menyimpan file ke penyimpanan cloud
    cloud_storage.upload_file("laporan.txt", data_file)

    # Mengunduh file dari penyimpanan cloud
    hasil_cloud = cloud_storage.download_file("laporan.txt")
    print("Data hasil download cloud:", hasil_cloud)