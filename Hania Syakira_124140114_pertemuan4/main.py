
"""Program utama untuk menggunakan modul math_operations."""

# Cara impor pertama: mengimpor seluruh modul
import math_operations

# Cara impor kedua: mengimpor fungsi secara langsung
from math_operations import (
    luas_persegi,
    keliling_persegi,
    luas_persegi_panjang,
    keliling_persegi_panjang,
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin
)


def main():
    """Menjalankan seluruh fungsi dari modul matematika."""

    # Data pengujian
    sisi = 5
    panjang = 8
    lebar = 4
    jari_jari = 7
    suhu = 25

    print("=" * 55)
    print("           PROGRAM MODUL MATEMATIKA")
    print("=" * 55)

    # 1. Perhitungan persegi
    print("\n1. PERSEGI")
    print(f"Sisi       : {sisi}")
    print(f"Luas       : {luas_persegi(sisi):.2f}")
    print(f"Keliling   : {keliling_persegi(sisi):.2f}")

    # 2. Perhitungan persegi panjang
    print("\n2. PERSEGI PANJANG")
    print(f"Panjang    : {panjang}")
    print(f"Lebar      : {lebar}")
    print(
        f"Luas       : "
        f"{luas_persegi_panjang(panjang, lebar):.2f}"
    )
    print(
        f"Keliling   : "
        f"{keliling_persegi_panjang(panjang, lebar):.2f}"
    )

    # 3. Perhitungan lingkaran
    print("\n3. LINGKARAN")
    print(f"Jari-jari  : {jari_jari}")
    print(f"Nilai PI   : {math_operations.PI}")
    print(f"Luas       : {luas_lingkaran(jari_jari):.2f}")
    print(f"Keliling   : {keliling_lingkaran(jari_jari):.2f}")

    # 4. Konversi temperatur
    print("\n4. KONVERSI TEMPERATUR")
    print(f"Celsius    : {suhu:.2f} °C")
    print(
        f"Fahrenheit : "
        f"{celsius_ke_fahrenheit(suhu):.2f} °F"
    )
    print(f"Kelvin     : {celsius_ke_kelvin(suhu):.2f} K")

    print("\n" + "=" * 55)
    print("             PERHITUNGAN SELESAI")
    print("=" * 55)


if __name__ == "__main__":
    main()
