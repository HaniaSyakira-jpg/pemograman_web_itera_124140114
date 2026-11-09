
"""Program sederhana untuk menghitung Body Mass Index (BMI)."""

# Input berat dan tinggi badan
berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (m): "))

# Menghitung BMI
bmi = berat / (tinggi * tinggi)

# Menentukan kategori BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Menampilkan hasil
print("\n===== HASIL PERHITUNGAN BMI =====")
print(f"Nilai BMI : {bmi:.2f}")
print(f"Kategori : {kategori}")
