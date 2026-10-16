
console.log("=== BAB 3: ARRAY & OBJEK ===");

// MATERI 1: ARRAY DAN METODE ARRAY
const buah = ["Apel", "Jeruk", "Mangga", "Pisang", "Anggur"];
const hargaBuah = {
  Apel: 10000,
  Jeruk: 8000,
  Mangga: 15000,
  Pisang: 5000,
  Anggur: 20000
};

const arrayDemo = document.getElementById("array-demo");

arrayDemo.innerHTML = `
  <p><strong>Array buah:</strong> ${buah.join(", ")}</p>
`;

buah.push("Durian");
hargaBuah.Durian = 25000;

arrayDemo.innerHTML += `
  <p><strong>Setelah push Durian:</strong> ${buah.join(", ")}</p>
`;

const itemDihapus = buah.pop();
delete hargaBuah[itemDihapus];

arrayDemo.innerHTML += `
  <p><strong>Setelah pop:</strong> ${buah.join(", ")}
  (item dihapus: ${itemDihapus})</p>
`;

buah.sort((a, b) => a.localeCompare(b, "id"));

arrayDemo.innerHTML += `
  <p><strong>Setelah sort:</strong> ${buah.join(", ")}</p>
`;

const daftarBuah = buah.map(
  item => `${item} (Rp${hargaBuah[item].toLocaleString("id-ID")})`
);

arrayDemo.innerHTML += `
  <p><strong>Array dengan harga:</strong> ${daftarBuah.join(", ")}</p>
`;

const buahMahal = buah.filter(item => hargaBuah[item] > 10000);

arrayDemo.innerHTML += `
  <p><strong>Buah dengan harga &gt; Rp10.000:</strong>
  ${buahMahal.join(", ")}</p>
`;

const totalHargaBuah = buah.reduce(
  (total, item) => total + hargaBuah[item],
  0
);

arrayDemo.innerHTML += `
  <p><strong>Total harga seluruh buah:</strong>
  Rp${totalHargaBuah.toLocaleString("id-ID")}</p>
`;


// MATERI 2: OBJEK JAVASCRIPT
const mahasiswaContoh = {
  nama: "Budi Santoso",
  nim: "20210001",
  jurusan: "Teknik Informatika",
  nilai: {
    algoritma: 85,
    basis_data: 90,
    web: 88
  },
  hobi: ["Coding", "Membaca", "Futsal"],

  tampilkanInfo() {
    return `${this.nama} (${this.nim}) - ${this.jurusan}`;
  },

  hitungRataRata() {
    const nilaiArray = Object.values(this.nilai);
    const total = nilaiArray.reduce((sum, nilai) => sum + nilai, 0);
    return (total / nilaiArray.length).toFixed(2);
  }
};

const objekDemo = document.getElementById("objek-demo");

objekDemo.innerHTML = `
  <p><strong>Info mahasiswa:</strong> ${mahasiswaContoh.tampilkanInfo()}</p>
  <p><strong>Rata-rata nilai:</strong> ${mahasiswaContoh.hitungRataRata()}</p>
  <p><strong>Hobi:</strong> ${mahasiswaContoh.hobi.join(", ")}</p>
`;

mahasiswaContoh.email = "budi.santoso@example.com";

objekDemo.innerHTML += `
  <p><strong>Email:</strong> ${mahasiswaContoh.email}</p>
`;

mahasiswaContoh.nilai.web = 92;

objekDemo.innerHTML += `
  <p><strong>Nilai Web setelah diubah:</strong>
  ${mahasiswaContoh.nilai.web}</p>
`;

delete mahasiswaContoh.hobi;

objekDemo.innerHTML += `
  <p><strong>Hobi setelah dihapus:</strong>
  ${mahasiswaContoh.hobi ? mahasiswaContoh.hobi.join(", ") : "Tidak ada data hobi"}</p>
`;


// DATA MAHASISWA UNTUK LATIHAN
let daftarMahasiswa = [
  { id: 1, nama: "Andi Saputra", nim: "124140101", jurusan: "Informatika", nilai: 85 },
  { id: 2, nama: "Bunga Lestari", nim: "124140102", jurusan: "Sistem Informasi", nilai: 92 },
  { id: 3, nama: "Citra Maharani", nim: "124140103", jurusan: "Informatika", nilai: 78 },
  { id: 4, nama: "Dimas Pratama", nim: "124140104", jurusan: "Teknik Elektro", nilai: 90 },
  { id: 5, nama: "Eka Putri", nim: "124140105", jurusan: "Sistem Informasi", nilai: 88 }
];

let idBerikutnya = 6;


// FUNGSI PEMBANTU: MEMBUAT SEL TABEL DENGAN AMAN
function buatSel(teks) {
  const td = document.createElement("td");
  td.textContent = teks;
  return td;
}


// LATIHAN 1: TAMPILKAN MAHASISWA DALAM TABEL HTML
function tampilkanTabelMahasiswa(data) {
  const tbody = document.getElementById("tabel-mahasiswa");
  tbody.replaceChildren();

  data.forEach((mhs, index) => {
    const tr = document.createElement("tr");

    tr.append(
      buatSel(index + 1),
      buatSel(mhs.nama),
      buatSel(mhs.nim),
      buatSel(mhs.jurusan),
      buatSel(mhs.nilai)
    );

    tbody.appendChild(tr);
  });
}

tampilkanTabelMahasiswa(daftarMahasiswa);


// LATIHAN 2: CARI MAHASISWA DENGAN NILAI TERTINGGI
function cariNilaiTertinggi(data) {
  return data.reduce((tertinggi, mahasiswa) => {
    return mahasiswa.nilai > tertinggi.nilai ? mahasiswa : tertinggi;
  });
}

document.getElementById("btn-tertinggi").addEventListener("click", function () {
  const output = document.getElementById("hasil-analisis");

  if (daftarMahasiswa.length === 0) {
    output.textContent = "Belum ada data mahasiswa.";
    return;
  }

  const tertinggi = cariNilaiTertinggi(daftarMahasiswa);

  output.textContent =
    `Nilai tertinggi: ${tertinggi.nama} — ${tertinggi.nilai}`;
});


// LATIHAN 3: FILTER NILAI DI ATAS RATA-RATA
function cariDiAtasRataRata(data) {
  if (data.length === 0) return [];

  const total = data.reduce((sum, mhs) => sum + mhs.nilai, 0);
  const rataRata = total / data.length;

  return {
    rataRata,
    mahasiswa: data.filter(mhs => mhs.nilai > rataRata)
  };
}

document.getElementById("btn-diatas-rata").addEventListener("click", function () {
  const output = document.getElementById("hasil-analisis");

  if (daftarMahasiswa.length === 0) {
    output.textContent = "Belum ada data mahasiswa.";
    return;
  }

  const hasil = cariDiAtasRataRata(daftarMahasiswa);

  output.replaceChildren();

  const p = document.createElement("p");
  p.textContent = `Rata-rata kelas: ${hasil.rataRata.toFixed(2)}`;
  output.appendChild(p);

  const ul = document.createElement("ul");

  hasil.mahasiswa.forEach(mhs => {
    const li = document.createElement("li");
    li.textContent = `${mhs.nama}: ${mhs.nilai}`;
    ul.appendChild(li);
  });

  output.appendChild(ul);
});


// LATIHAN 4: URUTKAN NAMA ASCENDING ATAU DESCENDING
function urutkanMahasiswa(data, urutan) {
  return [...data].sort((a, b) => {
    const perbandingan = a.nama.localeCompare(b.nama, "id");
    return urutan === "desc" ? -perbandingan : perbandingan;
  });
}

document.getElementById("btn-urutkan").addEventListener("click", function () {
  const urutan = document.getElementById("urutan-nama").value;
  const hasil = urutkanMahasiswa(daftarMahasiswa, urutan);
  const output = document.getElementById("hasil-urutan");

  output.replaceChildren();

  const ul = document.createElement("ul");

  hasil.forEach(mhs => {
    const li = document.createElement("li");
    li.textContent = `${mhs.nama} — ${mhs.nilai}`;
    ul.appendChild(li);
  });

  output.appendChild(ul);
});


// LATIHAN 5: CRUD DATA MAHASISWA
const formMahasiswa = document.getElementById("form-mahasiswa");
const inputId = document.getElementById("id-mahasiswa");
const inputNama = document.getElementById("nama-mahasiswa");
const inputNim = document.getElementById("nim-mahasiswa");
const inputJurusan = document.getElementById("jurusan-mahasiswa");
const inputNilai = document.getElementById("nilai-mahasiswa");
const tombolSimpan = document.getElementById("btn-simpan");
const tombolBatal = document.getElementById("btn-batal");
const pesanCrud = document.getElementById("pesan-crud");

function tampilkanCRUD() {
  const tbody = document.getElementById("tabel-crud");
  tbody.replaceChildren();

  daftarMahasiswa.forEach((mhs, index) => {
    const tr = document.createElement("tr");

    tr.append(
      buatSel(index + 1),
      buatSel(mhs.nama),
      buatSel(mhs.nim),
      buatSel(mhs.jurusan),
      buatSel(mhs.nilai)
    );

    const tdAksi = document.createElement("td");

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit";
    tombolEdit.addEventListener("click", () => mulaiEdit(mhs.id));

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", () => hapusMahasiswa(mhs.id));

    tdAksi.append(tombolEdit, tombolHapus);
    tr.appendChild(tdAksi);
    tbody.appendChild(tr);
  });

  // Perbarui tabel utama juga setelah CRUD berubah
  tampilkanTabelMahasiswa(daftarMahasiswa);
}

function resetForm() {
  formMahasiswa.reset();
  inputId.value = "";
  tombolSimpan.textContent = "Tambah Mahasiswa";
  tombolBatal.hidden = true;
}

function mulaiEdit(id) {
  const mahasiswa = daftarMahasiswa.find(mhs => mhs.id === id);
  if (!mahasiswa) return;

  inputId.value = mahasiswa.id;
  inputNama.value = mahasiswa.nama;
  inputNim.value = mahasiswa.nim;
  inputJurusan.value = mahasiswa.jurusan;
  inputNilai.value = mahasiswa.nilai;

  tombolSimpan.textContent = "Simpan Perubahan";
  tombolBatal.hidden = false;
  pesanCrud.textContent = `Sedang mengedit data ${mahasiswa.nama}.`;
  inputNama.focus();
}

function hapusMahasiswa(id) {
  const mahasiswa = daftarMahasiswa.find(mhs => mhs.id === id);
  if (!mahasiswa) return;

  daftarMahasiswa = daftarMahasiswa.filter(mhs => mhs.id !== id);

  if (Number(inputId.value) === id) {
    resetForm();
  }

  pesanCrud.textContent = `Data ${mahasiswa.nama} berhasil dihapus.`;
  tampilkanCRUD();
}

formMahasiswa.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = inputNama.value.trim();
  const nim = inputNim.value.trim();
  const jurusan = inputJurusan.value.trim();
  const nilai = Number(inputNilai.value);
  const idEdit = inputId.value ? Number(inputId.value) : null;

  if (
    nama.length < 3 ||
    nim === "" ||
    jurusan === "" ||
    inputNilai.value.trim() === "" ||
    !Number.isFinite(nilai) ||
    nilai < 0 ||
    nilai > 100
  ) {
    pesanCrud.textContent =
      "Periksa kembali data. Nama minimal 3 karakter dan nilai harus 0–100.";
    return;
  }

  const nimDipakai = daftarMahasiswa.some(
    mhs => mhs.nim === nim && mhs.id !== idEdit
  );

  if (nimDipakai) {
    pesanCrud.textContent = "NIM tersebut sudah digunakan mahasiswa lain.";
    return;
  }

  if (idEdit !== null) {
    const index = daftarMahasiswa.findIndex(mhs => mhs.id === idEdit);

    if (index === -1) {
      pesanCrud.textContent = "Data mahasiswa tidak ditemukan.";
      resetForm();
      return;
    }

    daftarMahasiswa[index] = {
      ...daftarMahasiswa[index],
      nama,
      nim,
      jurusan,
      nilai
    };

    pesanCrud.textContent = `Data ${nama} berhasil diperbarui.`;
  } else {
    daftarMahasiswa.push({
      id: idBerikutnya++,
      nama,
      nim,
      jurusan,
      nilai
    });

    pesanCrud.textContent = `Mahasiswa ${nama} berhasil ditambahkan.`;
  }

  resetForm();
  tampilkanCRUD();
});

tombolBatal.addEventListener("click", function () {
  resetForm();
  pesanCrud.textContent = "Edit dibatalkan.";
});

tampilkanCRUD();

console.log("Data mahasiswa:", daftarMahasiswa);
