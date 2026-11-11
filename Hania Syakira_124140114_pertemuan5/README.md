# Praktikum Pemrograman Web - Pertemuan 5
## Object-Oriented Programming (OOP) dengan Python

### Identitas Mahasiswa
- **Nama:** Hania Syakira
- **NIM:** 124140114
- **Kelas:** [Isi kelas kamu]
- **Program Studi:** Teknik Informatika
- **Institusi:** Institut Teknologi Sumatera

---

## Deskripsi Praktikum

Praktikum Pertemuan 5 membahas konsep Object-Oriented Programming (OOP) menggunakan bahasa pemrograman Python. Praktikum ini bertujuan untuk memahami penerapan class, object, inheritance, encapsulation, polymorphism, serta abstract class dalam membangun program yang terstruktur dan mudah dikembangkan.

Selain latihan konsep OOP, praktikum ini juga mencakup pembuatan aplikasi **Sistem Manajemen Perpustakaan** yang menerapkan konsep OOP dalam sebuah program sederhana.

## Struktur Folder

```text
Hania Syakira_124140114_pertemuan5/
├── latihan/
│   ├── 01_everything_is_object.py
│   ├── 01_procedural_vs_oop.py
│   ├── 02_class_object.py
│   ├── 03_inheritance.py
│   ├── 04_encapsulation.py
│   ├── 05_polymorphism.py
│   └── 06_abstract_class.py
│
├── tugas_perpustakaan/
│   ├── library_item.py
│   ├── member.py
│   ├── library.py
│   └── main.py
│
├── screenshots/
├── .gitignore
└── README.md
```

## Materi Praktikum

### 1. Everything is an Object
Mempelajari bahwa setiap data di Python merupakan objek yang memiliki tipe dan identitas tertentu.

### 2. Procedural vs OOP
Mempelajari perbedaan paradigma pemrograman prosedural dan Object-Oriented Programming.

### 3. Class & Object
Mempelajari pembuatan class, object, atribut, method, class attribute, instance attribute, serta penggunaan `self` dan dunder methods.

### 4. Inheritance (Pewarisan)
Mempelajari pewarisan atribut dan method dari parent class ke child class, penggunaan `super()`, method overriding, multiple inheritance, dan MRO.

### 5. Encapsulation & Properties
Mempelajari perlindungan atribut menggunakan public, protected, dan private, serta penggunaan `@property`, getter, setter, dan name mangling.

### 6. Polymorphism
Mempelajari method overriding, duck typing, polymorphism dalam collection, dan operator overloading.

### 7. Abstract Class & Interface
Mempelajari penggunaan Abstract Base Class (ABC), `@abstractmethod`, abstract property, dan implementasi interface menggunakan Python.

## Tugas Utama: Sistem Manajemen Perpustakaan

Tugas utama praktikum adalah membuat aplikasi Sistem Manajemen Perpustakaan menggunakan konsep Object-Oriented Programming (OOP).

Program terdiri dari beberapa file:

- **library_item.py:** Mendefinisikan abstract class LibraryItem serta subclass Book dan Magazine.
- **member.py:** Mengelola data anggota perpustakaan dan daftar peminjaman.
- **library.py:** Mengelola koleksi perpustakaan, penambahan item, penampilan katalog, dan pencarian item.
- **main.py:** Menjalankan program utama Sistem Manajemen Perpustakaan.

### Penerapan 4 Pilar OOP

1. **Encapsulation:** Melindungi atribut internal objek menggunakan atribut private dan property.
2. **Inheritance:** Class Book dan Magazine mewarisi atribut serta method dari LibraryItem.
3. **Polymorphism:** Subclass Book dan Magazine dapat memberikan implementasi method yang berbeda sesuai jenis item.
4. **Abstraction:** Menggunakan abstract class LibraryItem sebagai kerangka dasar bagi jenis item perpustakaan.

### Fitur Program

- Menambahkan buku dan majalah ke koleksi perpustakaan.
- Menampilkan katalog koleksi perpustakaan.
- Mencari item berdasarkan judul atau ID.
- Mengelola status peminjaman dan pengembalian.
- Menghitung denda keterlambatan sesuai ketentuan program.

## Cara Menjalankan Program

Pastikan Python sudah terinstal pada perangkat.

### 1. Menjalankan Latihan OOP

Masuk ke folder utama praktikum, kemudian jalankan file latihan sesuai materi.

Contoh:

```bash
python latihan/01_everything_is_object.py
python latihan/01_procedural_vs_oop.py
python latihan/02_class_object.py
python latihan/03_inheritance.py
python latihan/04_encapsulation.py
python latihan/05_polymorphism.py
python latihan/06_abstract_class.py
```

### 2. Menjalankan Tugas Sistem Manajemen Perpustakaan

Jalankan perintah berikut dari folder utama praktikum:

```bash
python tugas_perpustakaan/main.py
```

## Dokumentasi

Dokumentasi hasil praktikum berupa screenshot disimpan di dalam folder `screenshots`, yang mencakup hasil eksekusi setiap latihan OOP dan program Sistem Manajemen Perpustakaan.

---

**Praktikum Pemrograman Web - Pertemuan 5**  
**Teknik Informatika - Institut Teknologi Sumatera**