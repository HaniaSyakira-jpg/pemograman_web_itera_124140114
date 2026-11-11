
# ==============================================================================
# Berkas: 03_inheritance.py
# Deskripsi: Implementasi Inheritance, Superclass, Subclass, super(),
#            Method Overriding, Multiple Inheritance, dan MRO
# ==============================================================================


# ------------------------------------------------------------------------------
# 1. SUPERCLASS (BASE CLASS)
# ------------------------------------------------------------------------------
class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float):
        if km > 0:
            self.odometer += km
            print(
                f"[{self.merek}] Menempuh perjalanan +{km} km. "
                f"Total Odo: {self.odometer} km"
            )
        else:
            print("Nilai kilometer tambahan tidak valid!")

    def klakson(self) -> str:
        return "Tin tin!"


# ------------------------------------------------------------------------------
# 2. SUBCLASS MOBIL (Single Inheritance dari Kendaraan)
# ------------------------------------------------------------------------------
class Mobil(Kendaraan):
    def __init__(
        self,
        merek: str,
        model: str,
        tahun: int,
        jumlah_pintu: int,
        kapasitas_tangki: float
    ):
        super().__init__(merek, model, tahun)
        self.jumlah_pintu = jumlah_pintu
        self.kapasitas_tangki = kapasitas_tangki
        self.sisa_bensin = kapasitas_tangki

    # METHOD OVERRIDING
    def deskripsi(self) -> str:
        deskripsi_dasar = super().deskripsi()
        return (
            f"{deskripsi_dasar} "
            f"[Mobil {self.jumlah_pintu} Pintu, "
            f"Tangki: {self.kapasitas_tangki}L]"
        )

    def klakson(self) -> str:
        return "Telolet! Telolet! (Klakson Mobil)"

    def isi_bensin(self, liter: float):
        if liter <= 0:
            print("Jumlah bensin tidak valid!")
        elif self.sisa_bensin + liter <= self.kapasitas_tangki:
            self.sisa_bensin += liter
            print(
                f"[{self.merek} {self.model}] Diisi bensin {liter}L. "
                f"Sisa bahan bakar: {self.sisa_bensin}L"
            )
        else:
            print("Kapasitas tangki bensin akan meluap!")


# ------------------------------------------------------------------------------
# 3. SUBCLASS MOTOR (Mewarisi Kendaraan)
# ------------------------------------------------------------------------------
class Motor(Kendaraan):
    def __init__(
        self,
        merek: str,
        model: str,
        tahun: int,
        kapasitas_cc: int
    ):
        super().__init__(merek, model, tahun)
        self.kapasitas_cc = kapasitas_cc

    def deskripsi(self) -> str:
        return f"{super().deskripsi()} [Motor Sport {self.kapasitas_cc}cc]"

    def klakson(self) -> str:
        return "Bip bip! (Klakson Motor)"

    def wheelie(self):
        print(
            f"[{self.merek} {self.model}] "
            "Melakukan atraksi wheelie satu roda!"
        )


# ------------------------------------------------------------------------------
# 4. MULTIPLE INHERITANCE: KENDARAAN LISTRIK & MOBIL LISTRIK
# ------------------------------------------------------------------------------
class KomponenBaterai:
    def __init__(self, kapasitas_kwh: float):
        self.kapasitas_kwh = kapasitas_kwh
        self.daya_tersisa = 100.0

    def isi_daya(self, persen: float):
        self.daya_tersisa = min(100.0, self.daya_tersisa + persen)
        print(
            f"Baterai diisi ulang. "
            f"Kapasitas daya: {self.daya_tersisa}%"
        )


class MobilListrik(Mobil, KomponenBaterai):
    """Mewarisi Mobil dan KomponenBaterai."""

    def __init__(
        self,
        merek: str,
        model: str,
        tahun: int,
        kapasitas_kwh: float
    ):
        Mobil.__init__(
            self,
            merek,
            model,
            tahun,
            jumlah_pintu=4,
            kapasitas_tangki=0.0
        )
        KomponenBaterai.__init__(self, kapasitas_kwh)

    def deskripsi(self) -> str:
        return (
            f"{self.merek} {self.model} ({self.tahun}) "
            f"[EV Baterai {self.kapasitas_kwh} kWh, "
            f"Daya: {self.daya_tersisa}%]"
        )


# ------------------------------------------------------------------------------
# 5. SUBCLASS TRUK (LATIHAN MANDIRI)
# ------------------------------------------------------------------------------
class Truk(Kendaraan):
    def __init__(
        self,
        merek: str,
        model: str,
        tahun: int,
        kapasitas_maksimal_ton: float
    ):
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    def muat_barang(self, berat_ton: float):
        if berat_ton <= 0:
            print("Berat muatan tidak valid!")
        elif (
            self.muatan_saat_ini + berat_ton
            <= self.kapasitas_maksimal_ton
        ):
            self.muatan_saat_ini += berat_ton
            print(
                f"[{self.merek} {self.model}] "
                f"Berhasil memuat {berat_ton} ton. "
                f"Total muatan: {self.muatan_saat_ini} ton"
            )
        else:
            print("Muatan melebihi kapasitas maksimal truk!")

    # METHOD OVERRIDING
    def deskripsi(self) -> str:
        return (
            f"{super().deskripsi()} "
            f"[Truk, Muatan: {self.muatan_saat_ini}/"
            f"{self.kapasitas_maksimal_ton} ton]"
        )


# ------------------------------------------------------------------------------
# 6. PROGRAM UTAMA
# ------------------------------------------------------------------------------
if __name__ == "__main__":

    # Membuat objek kendaraan
    avanza = Mobil(
        "Toyota", "Avanza Veloz", 2023,
        jumlah_pintu=5, kapasitas_tangki=45.0
    )

    cbr = Motor(
        "Honda", "CBR250RR", 2022,
        kapasitas_cc=250
    )

    ioniq = MobilListrik(
        "Hyundai", "Ioniq 5", 2024,
        kapasitas_kwh=72.6
    )

    # Menampilkan deskripsi kendaraan
    print("--- Deskripsi Kendaraan ---")
    print(avanza.deskripsi())
    print(cbr.deskripsi())
    print(ioniq.deskripsi())

    # Uji coba method overriding
    print("\n--- Uji Coba Suara Klakson (Polymorphic Overriding) ---")
    print(f"{avanza.model} : {avanza.klakson()}")
    print(f"{cbr.model}    : {cbr.klakson()}")

    # Perjalanan dan konsumsi energi
    print("\n--- Perjalanan & Konsumsi Energi ---")
    avanza.tambah_jarak(120.5)
    avanza.isi_bensin(15)
    cbr.wheelie()
    ioniq.isi_daya(30)

    # Pemeriksaan relasi inheritance
    print("\n--- Pemeriksaan Relasi Pewarisan (isinstance & issubclass) ---")
    print(
        "Apakah avanza adalah instance dari Mobil?    :",
        isinstance(avanza, Mobil)
    )
    print(
        "Apakah avanza adalah instance dari Kendaraan?:",
        isinstance(avanza, Kendaraan)
    )
    print(
        "Apakah cbr adalah instance dari Mobil?       :",
        isinstance(cbr, Mobil)
    )
    print(
        "Apakah Mobil subclass dari Kendaraan?        :",
        issubclass(Mobil, Kendaraan)
    )

    print(
        "\nMRO MobilListrik:",
        [c.__name__ for c in MobilListrik.__mro__]
    )

    # Latihan mandiri: Armada Truk Ekspedisi
    print("\n--- Latihan Mandiri: Armada Truk Ekspedisi ---")

    truk = Truk(
        "Mitsubishi", "Fuso", 2023,
        kapasitas_maksimal_ton=10
    )

    print(truk.deskripsi())

    truk.muat_barang(5)
    print(truk.deskripsi())

    truk.muat_barang(4)
    print(truk.deskripsi())

    truk.muat_barang(3)
    print(truk.deskripsi())
