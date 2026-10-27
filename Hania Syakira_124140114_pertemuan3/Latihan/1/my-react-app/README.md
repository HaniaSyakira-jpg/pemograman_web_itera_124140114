
# Dokumentasi Praktikum React — Latihan 1–7

**Nama:** Hania Syakira  
**NIM:** 124140114  
**Mata Kuliah:** Pemrograman Web

## Deskripsi

Dokumentasi ini berisi rangkuman pengerjaan Latihan 1 sampai Latihan 7 pada praktikum React. Setiap latihan membahas konsep pengembangan aplikasi React, mulai dari lingkungan pengembangan, komponen dan props, pengelolaan state, routing, custom hooks, Context API, hingga testing.

Setiap bagian dilengkapi dengan screenshot sebagai bukti visual hasil pengerjaan praktikum.

## Daftar Isi

1. [Latihan 1 — Hot Module Replacement](#1-latihan-1--hot-module-replacement-hmr)
2. [Latihan 2 — Components dan Props](#2-latihan-2--components-dan-props)
3. [Latihan 3 — State Management](#3-latihan-3--state-management)
4. [Latihan 4 — Routing](#4-latihan-4--routing)
5. [Latihan 5 — Custom Hooks](#5-latihan-5--custom-hooks)
6. [Latihan 6 — Context API](#6-latihan-6--context-api)
7. [Latihan 7 — Testing](#7-latihan-7--testing)
8. [Kesimpulan](#kesimpulan)

---

## 1. Latihan 1 — Hot Module Replacement (HMR)

### Tujuan

Mengenal lingkungan pengembangan React menggunakan Vite dan memahami Hot Module Replacement (HMR).

### Penjelasan Pengerjaan

Pada latihan ini, aplikasi React dijalankan melalui server pengembangan Vite. HMR memungkinkan perubahan pada kode diterapkan secara langsung ketika file disimpan, tanpa harus memuat ulang seluruh halaman secara manual pada setiap perubahan.

Konsep ini membantu mempercepat proses pengembangan karena hasil perubahan dapat diamati langsung di browser.

### Bukti Pengerjaan

![Bukti Latihan 1 - HMR](screenshots/latihan1_hmr.png)

**File bukti:** `screenshots/latihan1_hmr.png`

**Keterangan:** Screenshot ini merupakan dokumentasi hasil latihan HMR pada lingkungan pengembangan React.

---

## 2. Latihan 2 — Components dan Props

### Tujuan

Memahami cara membuat komponen React dan meneruskan data dari komponen induk ke komponen anak menggunakan props.

### Penjelasan Pengerjaan

Pada latihan ini, antarmuka aplikasi disusun menggunakan komponen yang dapat dipisahkan berdasarkan tanggung jawabnya. Props digunakan untuk mengirimkan nilai atau data ke komponen lain agar komponen tersebut dapat menampilkan informasi sesuai data yang diterima.

Penerapan komponen dan props membuat kode lebih modular, terstruktur, dan mudah digunakan kembali.

### Konsep yang Dipelajari

- Membuat functional component.
- Menggunakan JSX untuk membangun antarmuka.
- Meneruskan data melalui props.
- Menampilkan data yang diterima komponen.

### Bukti Pengerjaan

![Bukti Latihan 2 - Components dan Props](screenshots/latihan2_components_props.png)

**File bukti:** `screenshots/latihan2_components_props.png`

**Keterangan:** Screenshot ini mendokumentasikan hasil latihan komponen React dan penggunaan props.

---

## 3. Latihan 3 — State Management

### Tujuan

Memahami pengelolaan state dalam React dan bagaimana perubahan state memengaruhi tampilan aplikasi.

Latihan ini didokumentasikan melalui tiga screenshot.

### 3.1. Number State

#### Penjelasan Pengerjaan

Latihan ini membahas pengelolaan state berupa nilai numerik. State digunakan untuk menyimpan nilai yang dapat berubah selama aplikasi berjalan. Ketika nilai diperbarui, React akan memperbarui tampilan yang bergantung pada nilai tersebut.

Contoh penerapannya adalah menyimpan angka atau nilai penghitung yang dapat berubah akibat interaksi pengguna.

#### Bukti Pengerjaan

![Bukti Latihan 3 - Number State](screenshots/latihan3_number_state.png)

**File bukti:** `screenshots/latihan3_number_state.png`

### 3.2. Array State

#### Penjelasan Pengerjaan

Latihan ini membahas penyimpanan kumpulan data dalam bentuk array menggunakan state React. Data array dapat ditampilkan menjadi daftar pada antarmuka aplikasi.

Perubahan data sebaiknya dilakukan dengan menghasilkan array baru, misalnya menggunakan spread operator, `map()`, atau `filter()`, sesuai kebutuhan. Pendekatan tersebut membantu menjaga pola pembaruan state React.

#### Bukti Pengerjaan

![Bukti Latihan 3 - Array State](screenshots/latihan3_array_state.png)

**File bukti:** `screenshots/latihan3_array_state.png`

### 3.3. State Management

#### Penjelasan Pengerjaan

Latihan ini mendokumentasikan pengelolaan state secara lebih umum, yaitu menyimpan nilai aplikasi dan memperbaruinya ketika terjadi interaksi pengguna.

Pengelolaan state memungkinkan komponen menampilkan data terbaru sesuai perubahan yang terjadi selama aplikasi digunakan.

#### Bukti Pengerjaan

![Bukti Latihan 3 - State Management](screenshots/latihan3_state_management.png)

**File bukti:** `screenshots/latihan3_state_management.png`

### Kesimpulan Latihan 3

State merupakan bagian penting dalam React untuk menyimpan data yang dapat berubah. Penggunaan state memungkinkan tampilan aplikasi diperbarui secara dinamis tanpa harus memanipulasi DOM secara manual.

---

## 4. Latihan 4 — Routing

### Tujuan

Memahami navigasi ant halaman dalam aplikasi React dan menangani rute yang tidak tersedia.

Latihan ini didokumentasikan melalui dua screenshot, yaitu halaman About dan halaman Not Found.

### 4.1. Halaman About

#### Penjelasan Pengerjaan

Latihan ini mendokumentasikan halaman About sebagai salah satu halaman yang tersedia pada aplikasi. Halaman ini menjadi bagian dari latihan navigasi dan pengelolaan halaman.

#### Bukti Pengerjaan

![Bukti Latihan 4 - About](screenshots/latihan4_about.png)

**File bukti:** `screenshots/latihan4_about.png`

### 4.2. Halaman Not Found

#### Penjelasan Pengerjaan

Latihan ini mendokumentasikan halaman Not Found, yaitu halaman yang ditampilkan ketika pengguna mengakses rute yang tidak tersedia.

Penanganan rute yang tidak ditemukan membantu aplikasi memberikan informasi yang jelas kepada pengguna daripada menampilkan halaman kosong.

#### Bukti Pengerjaan

![Bukti Latihan 4 - Not Found](screenshots/latihan4_notfound.png)

**File bukti:** `screenshots/latihan4_notfound.png`

### Kesimpulan Latihan 4

Routing membantu aplikasi React memiliki beberapa halaman dengan navigasi yang lebih terstruktur. Halaman Not Found dapat digunakan sebagai penanganan untuk rute yang tidak dikenali.

---

## 5. Latihan 5 — Custom Hooks

### Tujuan

Memahami cara membuat custom hooks untuk memisahkan dan menggunakan kembali logika yang berkaitan dengan React Hooks.

### Penjelasan Pengerjaan

Custom hooks merupakan fungsi JavaScript yang menggunakan hooks React dan memungkinkan logika tertentu dipakai kembali oleh beberapa komponen.

Dengan custom hooks, logika aplikasi dapat dipisahkan dari kode tampilan sehingga komponen menjadi lebih terstruktur dan lebih mudah dipelihara.

Custom hooks umumnya memiliki nama yang diawali dengan `use`, misalnya `useCounter` atau `useLocalStorage`.

### Konsep yang Dipelajari

- Membuat fungsi custom hook.
- Menggunakan hooks React di dalam custom hook.
- Memisahkan logika dari komponen tampilan.
- Menggunakan kembali logika pada komponen yang membutuhkan.

### Bukti Pengerjaan

![Bukti Latihan 5 - Custom Hooks](screenshots/latihan5_custom_hooks.png)

**File bukti:** `screenshots/latihan5_custom_hooks.png`

**Keterangan:** Screenshot ini mendokumentasikan hasil latihan penggunaan custom hooks.

---

## 6. Latihan 6 — Context API

### Tujuan

Memahami penggunaan Context API untuk menyediakan dan mengakses data dari beberapa komponen tanpa harus meneruskan props melalui setiap tingkat komponen.

Latihan ini didokumentasikan melalui dua screenshot.

### 6.1. Halaman About dengan Context

#### Penjelasan Pengerjaan

Screenshot ini mendokumentasikan halaman About pada latihan yang menggunakan Context API.

Context API dapat digunakan untuk menyediakan nilai tertentu agar dapat diakses oleh komponen yang berada dalam cakupan provider. Dengan pendekatan ini, data dapat dibagikan antarkomponen tanpa meneruskan props secara berulang pada setiap tingkat komponen.

#### Bukti Pengerjaan

![Bukti Latihan 6 - About Context](screenshots/latihan6_about_context.png)

**File bukti:** `screenshots/latihan6_about_context.png`

### 6.2. Halaman Home dengan Context

#### Penjelasan Pengerjaan

Screenshot ini mendokumentasikan halaman Home pada latihan Context API.

Pada penerapan Context API, komponen yang membutuhkan data dapat mengakses nilai yang disediakan oleh provider. Pendekatan ini berguna ketika beberapa komponen memerlukan data atau fungsi yang sama.

#### Bukti Pengerjaan

![Bukti Latihan 6 - Home Context](screenshots/latihan6_home_context.png)

**File bukti:** `screenshots/latihan6_home_context.png`

### Kesimpulan Latihan 6

Context API membantu pengelolaan data bersama antarkomponen dan mengurangi kebutuhan meneruskan props melalui banyak tingkat komponen.

---

## 7. Latihan 7 — Testing

### Tujuan

Mengenal pengujian aplikasi React untuk memeriksa apakah komponen atau fungsi berjalan sesuai dengan perilaku yang diharapkan.

### Penjelasan Pengerjaan

Latihan ini didokumentasikan melalui screenshot hasil testing. Pengujian merupakan bagian penting dari pengembangan perangkat lunak karena dapat membantu menemukan kesalahan dan memeriksa perilaku aplikasi secara sistematis.

Pada proyek React, pengujian dapat dilakukan menggunakan tools seperti Vitest dan React Testing Library. Vitest digunakan untuk menjalankan pengujian, sedangkan React Testing Library membantu memeriksa komponen berdasarkan interaksi dan tampilan yang diterima pengguna.

### Bukti Pengerjaan

![Bukti Latihan 7 - Testing](screenshots/latihan7_testing.png)

**File bukti:** `screenshots/latihan7_testing.png`

**Keterangan:** Screenshot ini merupakan dokumentasi hasil latihan testing. Rincian kasus pengujian dan hasil kelulusannya mengikuti informasi yang benar-benar ditampilkan pada screenshot tersebut.

---

## Kesimpulan

Latihan 1 sampai Latihan 7 mendokumentasikan tahapan pembelajaran React, mulai dari penggunaan lingkungan pengembangan, komponen dan props, pengelolaan state, routing, custom hooks, Context API, hingga testing.

Setiap latihan memiliki fokus yang berbeda dan membantu membangun pemahaman tentang pengembangan aplikasi React secara bertahap.

Seluruh screenshot disimpan dalam folder `screenshots/` sebagai bukti visual hasil pengerjaan praktikum. Path gambar pada dokumentasi menggunakan path relatif agar gambar dapat ditampilkan ketika README dibuka melalui Visual Studio Code atau repository GitHub.
