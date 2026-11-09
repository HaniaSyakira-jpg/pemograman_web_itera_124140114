
"""Program pengelolaan data nilai mahasiswa."""

# List berisi 5 dictionary data mahasiswa
mahasiswa = [
    {
        "nama": "Andi",
        "nim": "124140101",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Bunga",
        "nim": "124140102",
        "nilai_uts": 78,
        "nilai_uas": 82,
        "nilai_tugas": 80
    },
    {
        "nama": "Citra",
        "nim": "124140103",
        "nilai_uts": 65,
        "nilai_uas": 70,
        "nilai_tugas": 75
    },
    {
        "nama": "Dimas",
        "nim": "124140104",
        "nilai_uts": 55,
        "nilai_uas": 60,
        "nilai_tugas": 58
    },
    {
        "nama": "Eka",
        "nim": "124140105",
        "nilai_uts": 40,
        "nilai_uas": 45,
        "nilai_tugas": 50
    }
]


def hitung_nilai_akhir(data):
    """Menghitung nilai akhir mahasiswa.

    Args:
        data (dict): Data mahasiswa yang berisi nilai UTS, UAS, dan tugas.

    Returns:
        float: Nilai akhir berdasarkan bobot yang ditentukan.
    """
    nilai_akhir = (
        (30 / 100 * data["nilai_uts"])
        + (40 / 100 * data["nilai_uas"])
        + (30 / 100 * data["nilai_tugas"])
    )
    return nilai_akhir


def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir.

    Args:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Returns:
        str: Grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def main():
    """Menghitung nilai, menampilkan tabel, dan mencari nilai tertinggi serta terendah."""

    # Menghitung nilai akhir dan grade setiap mahasiswa
    for data in mahasiswa:
        data["nilai_akhir"] = hitung_nilai_akhir(data)
        data["grade"] = tentukan_grade(data["nilai_akhir"])

    # Menampilkan tabel data mahasiswa
    print("=" * 75)
    print("                  DATA NILAI MAHASISWA")
    print("=" * 75)

    print(
        f"{'Nama':<12} {'NIM':<12} "
        f"{'UTS':>7} {'UAS':>7} {'Tugas':>7} "
        f"{'Nilai Akhir':>13} {'Grade':>7}"
    )
    print("-" * 75)

    for data in mahasiswa:
        print(
            f"{data['nama']:<12} "
            f"{data['nim']:<12} "
            f"{data['nilai_uts']:>7.2f} "
            f"{data['nilai_uas']:>7.2f} "
            f"{data['nilai_tugas']:>7.2f} "
            f"{data['nilai_akhir']:>13.2f} "
            f"{data['grade']:>7}"
        )

    print("-" * 75)

    # Mencari mahasiswa dengan nilai tertinggi dan terendah
    nilai_tertinggi = max(
        mahasiswa,
        key=lambda data: data["nilai_akhir"]
    )

    nilai_terendah = min(
        mahasiswa,
        key=lambda data: data["nilai_akhir"]
    )

    print("\nMAHASISWA DENGAN NILAI TERTINGGI")
    print(f"Nama        : {nilai_tertinggi['nama']}")
    print(f"NIM         : {nilai_tertinggi['nim']}")
    print(f"Nilai Akhir : {nilai_tertinggi['nilai_akhir']:.2f}")
    print(f"Grade       : {nilai_tertinggi['grade']}")

    print("\nMAHASISWA DENGAN NILAI TERENDAH")
    print(f"Nama        : {nilai_terendah['nama']}")
    print(f"NIM         : {nilai_terendah['nim']}")
    print(f"Nilai Akhir : {nilai_terendah['nilai_akhir']:.2f}")
    print(f"Grade       : {nilai_terendah['grade']}")

    print("=" * 75)


if __name__ == "__main__":
    main()
