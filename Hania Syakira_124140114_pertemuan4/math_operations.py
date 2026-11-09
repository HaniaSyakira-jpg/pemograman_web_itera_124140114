
"""Modul untuk operasi matematika dan konversi temperatur."""

# Konstanta lingkaran
PI = 3.14159


# ==============================
# FUNGSI PERSEGI
# ==============================

def luas_persegi(sisi):
    """Menghitung luas persegi.

    Args:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Hasil perhitungan luas persegi.
    """
    return sisi * sisi


def keliling_persegi(sisi):
    """Menghitung keliling persegi.

    Args:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Hasil perhitungan keliling persegi.
    """
    return 4 * sisi


# ==============================
# FUNGSI PERSEGI PANJANG
# ==============================

def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang.

    Args:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Hasil perhitungan luas persegi panjang.
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang.

    Args:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Hasil perhitungan keliling persegi panjang.
    """
    return 2 * (panjang + lebar)


# ==============================
# FUNGSI LINGKARAN
# ==============================

def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran.

    Args:
        jari_jari (float): Panjang jari-jari lingkaran.

    Returns:
        float: Hasil perhitungan luas lingkaran.
    """
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran.

    Args:
        jari_jari (float): Panjang jari-jari lingkaran.

    Returns:
        float: Hasil perhitungan keliling lingkaran.
    """
    return 2 * PI * jari_jari


# ==============================
# FUNGSI KONVERSI TEMPERATUR
# ==============================

def celsius_ke_fahrenheit(celsius):
    """Mengonversi suhu Celsius ke Fahrenheit.

    Args:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam derajat Fahrenheit.
    """
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius):
    """Mengonversi suhu Celsius ke Kelvin.

    Args:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam Kelvin.
    """
    return celsius + 273.15
