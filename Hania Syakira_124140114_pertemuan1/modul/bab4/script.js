
console.log("=== BAB 4: DOM & API ===");

// ==========================================
// 1. MANIPULASI DOM
// ==========================================
const domOutput = document.getElementById("dom-output");
let itemCount = 0;
const warna = ["#dbeafe", "#dcfce7", "#fef3c7", "#fce7f3"];
let warnaIndex = 0;

document.getElementById("btn-tambah-item").addEventListener("click", function () {
  itemCount++;

  const item = document.createElement("div");
  item.className = "dom-item";
  item.textContent = `Item ${itemCount}`;
  domOutput.appendChild(item);
});

document.getElementById("btn-hapus-item").addEventListener("click", function () {
  if (domOutput.lastElementChild) {
    domOutput.lastElementChild.remove();
  }
});

document.getElementById("btn-ubah-warna").addEventListener("click", function () {
  domOutput.style.backgroundColor = warna[warnaIndex];
  warnaIndex = (warnaIndex + 1) % warna.length;
});


// ==========================================
// 2. FETCH API, SEARCH, DAN PAGINATION
// ==========================================
const apiOutput = document.getElementById("api-output");
const apiStatus = document.getElementById("api-status");
const searchPost = document.getElementById("search-post");
const pageInfo = document.getElementById("page-info");
const tombolPrev = document.getElementById("btn-prev");
const tombolNext = document.getElementById("btn-next");

let semuaPost = [];
let halaman = 1;
const postPerHalaman = 5;

async function ambilDataPost() {
  apiStatus.textContent = "Sedang mengambil data...";
  apiOutput.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    semuaPost = data;
    halaman = 1;

    apiStatus.textContent = `Berhasil mengambil ${semuaPost.length} post.`;
    tampilkanPost();
  } catch (error) {
    console.error("Error fetching data:", error);
    apiStatus.textContent =
      `Gagal mengambil data: ${error.message}. Periksa koneksi internet.`;
  }
}

function tampilkanPost() {
  const kataKunci = searchPost.value.trim().toLowerCase();

  const postTerfilter = semuaPost.filter(post =>
    post.title.toLowerCase().includes(kataKunci)
  );

  const totalHalaman = Math.ceil(postTerfilter.length / postPerHalaman);

  if (totalHalaman === 0) {
    halaman = 1;
    apiOutput.textContent = "Tidak ada post yang cocok.";
    pageInfo.textContent = "Halaman 0 dari 0";
    tombolPrev.disabled = true;
    tombolNext.disabled = true;
    return;
  }

  if (halaman > totalHalaman) halaman = totalHalaman;

  const mulai = (halaman - 1) * postPerHalaman;
  const postHalaman = postTerfilter.slice(
    mulai,
    mulai + postPerHalaman
  );

  apiOutput.replaceChildren();

  postHalaman.forEach(post => {
    const artikel = document.createElement("article");
    artikel.className = "post";

    const judul = document.createElement("h3");
    judul.textContent = post.title;

    const isi = document.createElement("p");
    isi.textContent = post.body;

    artikel.append(judul, isi);
    apiOutput.appendChild(artikel);
  });

  pageInfo.textContent = `Halaman ${halaman} dari ${totalHalaman}`;
  tombolPrev.disabled = halaman === 1;
  tombolNext.disabled = halaman === totalHalaman;
}

document.getElementById("btn-fetch").addEventListener("click", ambilDataPost);

searchPost.addEventListener("input", function () {
  halaman = 1;
  tampilkanPost();
});

tombolPrev.addEventListener("click", function () {
  if (halaman > 1) {
    halaman--;
    tampilkanPost();
  }
});

tombolNext.addEventListener("click", function () {
  halaman++;
  tampilkanPost();
});


// ==========================================
// 3. FORM MAHASISWA + LOCAL STORAGE
// ==========================================
const kunciMahasiswa = "bab4_data_mahasiswa";

function bacaMahasiswa() {
  try {
    const data = JSON.parse(localStorage.getItem(kunciMahasiswa));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

let daftarMahasiswa = bacaMahasiswa();

const formMahasiswa = document.getElementById("form-mahasiswa");
const pesanMahasiswa = document.getElementById("pesan-mahasiswa");
const daftarMahasiswaElement = document.getElementById("daftar-mahasiswa");

function simpanMahasiswa() {
  localStorage.setItem(kunciMahasiswa, JSON.stringify(daftarMahasiswa));
}

function tampilkanMahasiswa() {
  daftarMahasiswaElement.replaceChildren();

  if (daftarMahasiswa.length === 0) {
    daftarMahasiswaElement.textContent = "Belum ada data mahasiswa.";
    return;
  }

  daftarMahasiswa.forEach(mahasiswa => {
    const kartu = document.createElement("article");
    kartu.className = "post";

    const informasi = document.createElement("p");
    informasi.textContent =
      `${mahasiswa.nama} | ${mahasiswa.nim} | ${mahasiswa.jurusan} | Nilai: ${mahasiswa.nilai}`;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";

    tombolHapus.addEventListener("click", function () {
      daftarMahasiswa = daftarMahasiswa.filter(
        item => item.id !== mahasiswa.id
      );

      simpanMahasiswa();
      tampilkanMahasiswa();
      pesanMahasiswa.textContent = "Data mahasiswa berhasil dihapus.";
    });

    kartu.append(informasi, tombolHapus);
    daftarMahasiswaElement.appendChild(kartu);
  });
}

formMahasiswa.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama-mahasiswa").value.trim();
  const nim = document.getElementById("nim-mahasiswa").value.trim();
  const jurusan = document.getElementById("jurusan-mahasiswa").value.trim();
  const nilaiInput = document.getElementById("nilai-mahasiswa").value;
  const nilai = Number(nilaiInput);

  if (
    nama.length < 3 ||
    nim === "" ||
    jurusan === "" ||
    nilaiInput === "" ||
    !Number.isFinite(nilai) ||
    nilai < 0 ||
    nilai > 100
  ) {
    pesanMahasiswa.textContent = "Periksa kembali semua data yang dimasukkan.";
    pesanMahasiswa.className = "error";
    return;
  }

  const nimSudahAda = daftarMahasiswa.some(
    mahasiswa => mahasiswa.nim === nim
  );

  if (nimSudahAda) {
    pesanMahasiswa.textContent = "NIM sudah terdaftar.";
    pesanMahasiswa.className = "error";
    return;
  }

  daftarMahasiswa.push({
    id: Date.now(),
    nama,
    nim,
    jurusan,
    nilai
  });

  simpanMahasiswa();
  tampilkanMahasiswa();
  formMahasiswa.reset();

  pesanMahasiswa.textContent = "Data mahasiswa berhasil ditambahkan.";
  pesanMahasiswa.className = "success";
});

tampilkanMahasiswa();


// ==========================================
// 4. DARK MODE
// ==========================================
const tombolDarkMode = document.getElementById("btn-dark-mode");
const kunciDarkMode = "bab4_dark_mode";

function aturDarkMode(aktif) {
  document.body.classList.toggle("dark-mode", aktif);
  tombolDarkMode.textContent = aktif
    ? "Nonaktifkan Dark Mode"
    : "Aktifkan Dark Mode";

  tombolDarkMode.setAttribute("aria-pressed", String(aktif));
  localStorage.setItem(kunciDarkMode, JSON.stringify(aktif));
}

let darkModeAktif = false;

try {
  darkModeAktif = JSON.parse(localStorage.getItem(kunciDarkMode)) === true;
} catch {
  darkModeAktif = false;
}

aturDarkMode(darkModeAktif);

tombolDarkMode.addEventListener("click", function () {
  darkModeAktif = !document.body.classList.contains("dark-mode");
  aturDarkMode(darkModeAktif);
});


// ==========================================
// 5. TODO LIST + LOCAL STORAGE
// ==========================================
const kunciTodo = "bab4_daftar_todo";

function bacaTodo() {
  try {
    const data = JSON.parse(localStorage.getItem(kunciTodo));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

let daftarTodo = bacaTodo();

const formTodo = document.getElementById("form-todo");
const inputTodo = document.getElementById("input-todo");
const daftarTodoElement = document.getElementById("daftar-todo");
const pesanTodo = document.getElementById("pesan-todo");

function simpanTodo() {
  localStorage.setItem(kunciTodo, JSON.stringify(daftarTodo));
}

function tampilkanTodo() {
  daftarTodoElement.replaceChildren();

  if (daftarTodo.length === 0) {
    daftarTodoElement.textContent = "Belum ada tugas.";
    return;
  }

  daftarTodo.forEach(todo => {
    const item = document.createElement("div");
    item.className = "todo-item";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.selesai;

    const teks = document.createElement("span");
    teks.textContent = todo.teks;
    teks.classList.toggle("completed", todo.selesai);

    checkbox.addEventListener("change", function () {
      todo.selesai = checkbox.checked;
      simpanTodo();
      tampilkanTodo();
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";

    tombolHapus.addEventListener("click", function () {
      daftarTodo = daftarTodo.filter(itemTodo => itemTodo.id !== todo.id);
      simpanTodo();
      tampilkanTodo();
      pesanTodo.textContent = "Tugas berhasil dihapus.";
    });

    label.append(checkbox, teks);
    item.append(label, tombolHapus);
    daftarTodoElement.appendChild(item);
  });
}

formTodo.addEventListener("submit", function (event) {
  event.preventDefault();

  const teks = inputTodo.value.trim();

  if (teks === "") {
    pesanTodo.textContent = "Tugas tidak boleh kosong.";
    pesanTodo.className = "error";
    return;
  }

  daftarTodo.push({
    id: Date.now(),
    teks,
    selesai: false
  });

  simpanTodo();
  tampilkanTodo();
  formTodo.reset();

  pesanTodo.textContent = "Tugas berhasil ditambahkan.";
  pesanTodo.className = "success";
});

tampilkanTodo();

console.log("Bab 4 siap digunakan.");
