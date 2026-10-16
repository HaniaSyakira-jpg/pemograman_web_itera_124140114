
console.log("=== BAB 2: LOOP & FUNGSI ===");

// MATERI: FOR LOOP
const nilaiSiswa = [85, 92, 78, 90, 88];
let total = 0;

document.getElementById("result").innerHTML = `
  <h3>Daftar Nilai Siswa</h3>
  <ul id="daftar-nilai"></ul>
  <p id="rata-rata"></p>
  <h3>Countdown</h3>
  <p id="countdown"></p>
  <h3>Nilai dengan for...of</h3>
  <div id="nilai-of"></div>
`;

for (let i = 0; i < nilaiSiswa.length; i++) {
  total += nilaiSiswa[i];

  document.getElementById("daftar-nilai").innerHTML +=
    `<li>Siswa ${i + 1}: ${nilaiSiswa[i]}</li>`;
}

const rataRata = total / nilaiSiswa.length;

document.getElementById("rata-rata").innerHTML =
  `Rata-rata nilai: <strong>${rataRata.toFixed(2)}</strong>`;

// MATERI: WHILE LOOP
let hitungMundur = 5;

while (hitungMundur > 0) {
  document.getElementById("countdown").innerHTML +=
    `${hitungMundur} `;
  hitungMundur--;
}

// MATERI: FOR...OF
for (const nilai of nilaiSiswa) {
  const warna = nilai >= 80 ? "sukses" : "error";

  document.getElementById("nilai-of").innerHTML +=
    `<span class="${warna}">${nilai} </span>`;
}

// MATERI: FUNGSI SAPA DAN EVENT HANDLER
function sapaNama(nama) {
  return `Halo, ${nama}! Selamat belajar JavaScript!`;
}

document.getElementById("sapa-button").addEventListener("click", function () {
  const nama = document.getElementById("nama-input").value.trim();
  const output = document.getElementById("sapa-output");

  if (nama === "") {
    output.innerHTML = '<p class="error">Silakan masukkan nama terlebih dahulu!</p>';
  } else {
    output.innerHTML = `<p class="sukses">${sapaNama(nama)}</p>`;
  }
});

// MATERI: FUNGSI KALKULATOR
function hitungKalkulator(angka1, angka2, operasi) {
  switch (operasi) {
    case "tambah":
      return angka1 + angka2;
    case "kurang":
      return angka1 - angka2;
    case "kali":
      return angka1 * angka2;
    case "bagi":
      if (angka2 === 0) {
        return "Pembagian dengan nol tidak diperbolehkan";
      }
      return angka1 / angka2;
    default:
      return "Operasi tidak valid";
  }
}

document.querySelectorAll("[data-operasi]").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    const nilai1 = document.getElementById("angka1").value;
    const nilai2 = document.getElementById("angka2").value;
    const output = document.getElementById("hasil-kalkulator");

    if (nilai1.trim() === "" || nilai2.trim() === "") {
      output.innerHTML = '<p class="error">Masukkan kedua angka terlebih dahulu!</p>';
      return;
    }

    const angka1 = Number(nilai1);
    const angka2 = Number(nilai2);
    const operasi = tombol.dataset.operasi;
    const hasil = hitungKalkulator(angka1, angka2, operasi);

    if (typeof hasil === "string") {
      output.innerHTML = `<p class="error">${hasil}</p>`;
    } else {
      output.innerHTML = `<p>Hasil: ${hasil}</p>`;
    }
  });
});

// LATIHAN 1: TABEL PERKALIAN 1–10
document.getElementById("btn-perkalian").addEventListener("click", function () {
  const input = document.getElementById("angka-perkalian");
  const angka = Number(input.value);
  const output = document.getElementById("hasil-perkalian");

  if (input.value.trim() === "" || !Number.isInteger(angka) || angka < 1) {
    output.innerHTML = '<p class="error">Masukkan bilangan bulat minimal 1.</p>';
    return;
  }

  let hasilHTML = `<h3>Tabel Perkalian ${angka}</h3>`;

  for (let i = 1; i <= 10; i++) {
    hasilHTML += `<p>${angka} × ${i} = ${angka * i}</p>`;
  }

  output.innerHTML = hasilHTML;
});

// LATIHAN 2: FAKTORIAL
function hitungFaktorial(angka) {
  let hasil = 1;

  for (let i = 2; i <= angka; i++) {
    hasil *= i;
  }

  return hasil;
}

document.getElementById("btn-faktorial").addEventListener("click", function () {
  const input = document.getElementById("angka-faktorial");
  const angka = Number(input.value);
  const output = document.getElementById("hasil-faktorial");

  if (
    input.value.trim() === "" ||
    !Number.isInteger(angka) ||
    angka < 0 ||
    angka > 170
  ) {
    output.innerHTML =
      '<p class="error">Masukkan bilangan bulat dari 0 sampai 170.</p>';
    return;
  }

  output.innerHTML =
    `<p>${angka}! = <strong>${hitungFaktorial(angka).toLocaleString("id-ID")}</strong></p>`;
});

// LATIHAN 3: BILANGAN PRIMA
function cekPrima(angka) {
  if (!Number.isInteger(angka) || angka < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(angka); i++) {
    if (angka % i === 0) {
      return false;
    }
  }

  return true;
}

document.getElementById("btn-prima").addEventListener("click", function () {
  const input = document.getElementById("angka-prima");
  const angka = Number(input.value);
  const output = document.getElementById("hasil-prima");

  if (input.value.trim() === "" || !Number.isInteger(angka) || angka < 0) {
    output.innerHTML = '<p class="error">Masukkan bilangan bulat nol atau lebih.</p>';
    return;
  }

  output.innerHTML = cekPrima(angka)
    ? `<p>${angka} adalah bilangan prima.</p>`
    : `<p>${angka} bukan bilangan prima.</p>`;
});

// LATIHAN 4: KALKULATOR BMI
function hitungBMI(berat, tinggiCm) {
  const tinggiMeter = tinggiCm / 100;
  return berat / (tinggiMeter * tinggiMeter);
}

function kategoriBMI(bmi) {
  if (bmi < 18.5) return "Berat badan kurang";
  if (bmi < 25) return "Berat badan normal";
  if (bmi < 30) return "Berat badan berlebih";
  return "Obesitas";
}

document.getElementById("btn-bmi").addEventListener("click", function () {
  const beratInput = document.getElementById("berat");
  const tinggiInput = document.getElementById("tinggi");
  const berat = Number(beratInput.value);
  const tinggi = Number(tinggiInput.value);
  const output = document.getElementById("hasil-bmi");

  if (
    beratInput.value.trim() === "" ||
    tinggiInput.value.trim() === "" ||
    berat <= 0 ||
    tinggi <= 0 ||
    !Number.isFinite(berat) ||
    !Number.isFinite(tinggi)
  ) {
    output.innerHTML =
      '<p class="error">Masukkan berat dan tinggi badan yang valid.</p>';
    return;
  }

  const bmi = hitungBMI(berat, tinggi);

  output.innerHTML = `
    <p>Nilai BMI: <strong>${bmi.toFixed(2)}</strong></p>
    <p>Kategori: <strong>${kategoriBMI(bmi)}</strong></p>
    <small>Kategori ini merupakan perkiraan umum, bukan diagnosis medis.</small>
  `;
});

// LATIHAN 5: FIZZBUZZ 1–100
document.getElementById("btn-fizzbuzz").addEventListener("click", function () {
  const output = document.getElementById("hasil-fizzbuzz");
  const hasil = [];

  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      hasil.push("FizzBuzz");
    } else if (i % 3 === 0) {
      hasil.push("Fizz");
    } else if (i % 5 === 0) {
      hasil.push("Buzz");
    } else {
      hasil.push(i);
    }
  }

  output.textContent = hasil.join(", ");
});
