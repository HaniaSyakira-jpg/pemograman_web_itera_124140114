
# ==============================================================================
# Berkas: 04_encapsulation.py
# Deskripsi: Penerapan Public, Protected, Private, Name Mangling & @property
# ==============================================================================

class RekeningBank:
    def __init__(
        self,
        nomor_rekening: str,
        nama_pemilik: str,
        saldo_awal: float,
        pin: str
    ):
        # Public Attribute
        self.nomor_rekening = nomor_rekening

        # Protected Attribute
        self._pemilik = nama_pemilik

        # Private Attributes
        self.__saldo = max(0.0, float(saldo_awal))
        self.__pin = str(pin)
        self._riwayat_transaksi = []

    # PROPERTY GETTER
    @property
    def saldo(self) -> float:
        """Mengembalikan nilai saldo secara aman."""
        return self.__saldo

    # PROPERTY SETTER
    @saldo.setter
    def saldo(self, jumlah_baru: float):
        if not isinstance(jumlah_baru, (int, float)):
            raise TypeError("Nilai saldo harus berupa angka numerik!")

        if jumlah_baru < 0:
            raise ValueError("Saldo rekening tidak boleh bernilai negatif!")

        self.__saldo = float(jumlah_baru)

        print(
            f"[AUDIT] Saldo {self.nomor_rekening} "
            f"disesuaikan langsung menjadi: Rp {self.__saldo:,.2f}"
        )

    # METODE BISNIS
    def setor(self, nominal: float):
        if nominal <= 0:
            print("Gagal: Nominal setor harus lebih besar dari Rp 0!")
            return

        self.__saldo += nominal
        self._riwayat_transaksi.append(
            f"Setor Tunai: +Rp {nominal:,.2f}"
        )

        print(
            f"Setor tunai Rp {nominal:,.2f} sukses. "
            f"Saldo saat ini: Rp {self.__saldo:,.2f}"
        )

    def tarik(self, nominal: float, pin_input: str) -> bool:
        # Validasi PIN
        if pin_input != self.__pin:
            print("Gagal: PIN Transaksi yang Anda masukkan salah!")
            return False

        if nominal <= 0:
            print("Gagal: Nominal penarikan harus lebih dari Rp 0!")
            return False

        if nominal > self.__saldo:
            print(
                f"Gagal: Saldo tidak mencukupi! "
                f"(Saldo: Rp {self.__saldo:,.2f}, "
                f"Tarik: Rp {nominal:,.2f})"
            )
            return False

        self.__saldo -= nominal
        self._riwayat_transaksi.append(
            f"Tarik Tunai: -Rp {nominal:,.2f}"
        )

        print(
            f"Tarik tunai Rp {nominal:,.2f} berhasil. "
            f"Sisa saldo: Rp {self.__saldo:,.2f}"
        )

        return True

    def cetak_mutasi(self):
        print(
            f"\n=== MUTASI REKENING "
            f"{self.nomor_rekening} ({self._pemilik}) ==="
        )

        for log in self._riwayat_transaksi:
            print(f" - {log}")

        print(
            f"Saldo Akhir Terverifikasi: "
            f"Rp {self.__saldo:,.2f}\n"
        )


# ==============================================================================
# LATIHAN MANDIRI: ENKAPSULASI PENGGAJIAN KARYAWAN
# ==============================================================================
class Karyawan:
    BATAS_GAJI_MINIMUM = 3_200_000

    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        self.nama = nama
        self.jabatan = jabatan
        self.__gaji_pokok = self.BATAS_GAJI_MINIMUM

        # Menggunakan setter untuk validasi gaji awal
        self.gaji_pokok = gaji_pokok

    # PROPERTY GETTER
    @property
    def gaji_pokok(self):
        return self.__gaji_pokok

    # PROPERTY SETTER
    @gaji_pokok.setter
    def gaji_pokok(self, gaji_baru):
        if not isinstance(gaji_baru, (int, float)):
            raise TypeError("Gaji pokok harus berupa angka!")

        if gaji_baru < self.BATAS_GAJI_MINIMUM:
            raise ValueError(
                "Gaji pokok tidak boleh di bawah Rp 3.200.000!"
            )

        self.__gaji_pokok = float(gaji_baru)

    def hitung_gaji_bersih(self, pajak_persen):
        if not 0 <= pajak_persen <= 100:
            raise ValueError("Persentase pajak harus antara 0 sampai 100!")

        pajak = self.__gaji_pokok * pajak_persen / 100
        gaji_bersih = self.__gaji_pokok - pajak

        return gaji_bersih


# ==============================================================================
# PROGRAM UTAMA
# ==============================================================================
if __name__ == "__main__":

    # 1. Membuat objek rekening bank
    rek = RekeningBank(
        "121-009-8871",
        "Ahmad Fadhilah",
        500000,
        "123456"
    )

    # Mengakses atribut Public, Protected, dan Property
    print("Nomor Rekening (Public) :", rek.nomor_rekening)
    print("Pemilik Rekening (Prot) :", rek._pemilik)
    print("Saldo Rekening (@prop)  : Rp", rek.saldo)

    # 2. Menguji transaksi
    rek.setor(250000)
    rek.tarik(100000, "999999")
    rek.tarik(100000, "123456")
    rek.tarik(1000000, "123456")

    # 3. Menguji setter validation
    try:
        rek.saldo = -50000
    except ValueError as err:
        print(f"\nValidasi Tertangkap: {err}")

    # 4. Menguji perlindungan Private Attribute
    print("\n--- Uji Proteksi Private Attribute ---")

    try:
        print(rek.__saldo)
    except AttributeError:
        print(
            "Akses langsung rek.__saldo GAGAL karena "
            "terlindungi (AttributeError)!"
        )

    # Pembuktian Name Mangling
    print(
        "Nilai via Name Mangling "
        "(rek._RekeningBank__saldo): Rp",
        rek._RekeningBank__saldo
    )

    rek.cetak_mutasi()

    # 5. Latihan Mandiri: Penggajian Karyawan
    print("\n--- Latihan Mandiri: Penggajian Karyawan ---")

    karyawan1 = Karyawan(
        "Budi Santoso",
        "Software Engineer",
        5000000
    )

    print("Nama Karyawan :", karyawan1.nama)
    print("Jabatan        :", karyawan1.jabatan)
    print(f"Gaji Pokok     : Rp{karyawan1.gaji_pokok:,.2f}")

    pajak = 5
    print(
        f"Gaji Bersih ({pajak}% pajak): "
        f"Rp{karyawan1.hitung_gaji_bersih(pajak):,.2f}"
    )

    # Menguji validasi gaji minimum
    try:
        karyawan1.gaji_pokok = 2500000
    except ValueError as err:
        print(f"\nValidasi Gaji Tertangkap: {err}")
