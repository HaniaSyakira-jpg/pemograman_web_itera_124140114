
console.log("=== VARIABEL DAN OUTPUT ===");

// Variabel dan data diri
const nama = "Hania Syakira";
let umur = 20;
const kotaAsal = "Bandar Lampung";

console.log("Nama: " + nama);
console.log("Umur: " + umur);
console.log("Kota asal: " + kotaAsal);

// Pengecekan kelulusan
const nilai = 85;
const statusLulus = nilai >= 70 ? "Lulus" : "Tidak Lulus";

console.log("\n=== PENGECEKAN KELULUSAN ===");
console.log("Nilai: " + nilai);
console.log("Status: " + statusLulus);

// Kategori umur
let kategoriUmur = "";

if (umur < 12) {
  kategoriUmur = "Anak-anak";
} else if (umur <= 17) {
  kategoriUmur = "Remaja";
} else if (umur <= 59) {
  kategoriUmur = "Dewasa";
} else {
  kategoriUmur = "Lansia";
}

console.log("\n=== KATEGORI UMUR ===");
console.log("Kategori umur: " + kategoriUmur);

// Konversi angka hari ke bahasa Inggris
const angkaHari = 5;
let namaHari = "";

switch (angkaHari) {
  case 1:
    namaHari = "Monday";
    break;
  case 2:
    namaHari = "Tuesday";
    break;
  case 3:
    namaHari = "Wednesday";
    break;
  case 4:
    namaHari = "Thursday";
    break;
  case 5:
    namaHari = "Friday";
    break;
  case 6:
    namaHari = "Saturday";
    break;
  case 7:
    namaHari = "Sunday";
    break;
  default:
    namaHari = "Angka hari tidak valid";
}

console.log("\n=== KONVERSI HARI ===");
console.log("Angka hari: " + angkaHari);
console.log("Nama hari: " + namaHari);

// Kalkulator grade dengan ternary operator
const nilaiGrade = 85;

const grade = nilaiGrade >= 90 ? "A"
  : nilaiGrade >= 80 ? "B"
  : nilaiGrade >= 70 ? "C"
  : nilaiGrade >= 60 ? "D"
  : "E";

console.log("\n=== GRADE NILAI ===");
console.log("Nilai: " + nilaiGrade);
console.log("Grade: " + grade);

// Menampilkan hasil ke halaman HTML
document.getElementById("result").innerHTML = `
  <h2>Data Diri</h2>
  <p>Nama: <strong>${nama}</strong></p>
  <p>Umur: <strong>${umur} tahun</strong></p>
  <p>Kota Asal: <strong>${kotaAsal}</strong></p>

  <hr>
  <h2>Pengecekan Kelulusan</h2>
  <p>Nilai: <strong>${nilai}</strong></p>
  <p>Status: <strong>${statusLulus}</strong></p>

  <hr>
  <h2>Kategori Umur</h2>
  <p>Kategori: <strong>${kategoriUmur}</strong></p>

  <hr>
  <h2>Konversi Hari</h2>
  <p>Angka ${angkaHari}: <strong>${namaHari}</strong></p>

  <hr>
  <h2>Kalkulator Grade</h2>
  <p>Nilai: <strong>${nilaiGrade}</strong></p>
  <p>Grade: <strong>${grade}</strong></p>
`;
