# Desain-Pemrograman-Web

# Jobsheet 03

Jobsheet ini berisi penerapan **Responsive Web Design (RWD)** pada sistem pengelolaan data buku dan anggota perpustakaan (SIMPUS-Mini), meliputi penggunaan meta viewport, media query, breakpoint, dan pendekatan desktop-first.

## Identitas

| Data | Keterangan |
|---|---|
| Nama | Daffa Rajendra Maulana |
| NIM | 254107020181 |
| Mata Kuliah | Desain Pemograman Web |
| Kelas | TI - 2D |

## Struktur Folder

```
jobsheet-03/
├── index.html          → halaman beranda
├── style.css            → file utama styling (termasuk media query)
├── buku/
│   ├── list.html        → tabel daftar buku
│   └── tambah.html      → form tambah buku
├── anggota/
│   ├── list.html        → tabel daftar anggota
│   └── tambah.html      → form tambah anggota
├── README.md
└── dokumentasi/         → dokumentasi pendukung jobsheet
```

## Konsep yang Dipelajari

### 1. Responsive Web Design (RWD)
Pendekatan membangun halaman web agar tata letaknya menyesuaikan diri secara otomatis dengan lebar layar perangkat (HP, tablet, laptop, monitor besar) menggunakan satu file HTML/CSS yang sama, tanpa perlu membuat versi terpisah untuk tiap perangkat.

### 2. Pendekatan Desktop-First
Jobsheet ini memakai strategi **desktop-first**: gaya default untuk layar besar (grid 3 kolom, navbar horizontal, dst.) ditulis lebih dulu, lalu ditimpa sebagian melalui blok `@media (max-width: ...)` di bagian **paling bawah** file `style.css` untuk menyesuaikan tampilan di layar sempit. Urutan ini penting karena pada spesifisitas selector yang sama, aturan yang ditulis paling akhir dalam file yang menang.

## Status Pengerjaan

- Meta `viewport` sudah ditambahkan di setiap halaman HTML
- Media query untuk breakpoint tablet (768px) dan mobile (480px) sudah diterapkan di `style.css`
- Navbar berubah menjadi menu hamburger (checkbox hack) saat layar sempit
- Kartu statistik (CSS Grid) menyesuaikan jumlah kolom sesuai lebar layar
- Tabel data dibungkus `.table-responsive` agar bisa di-scroll horizontal di layar sempit
- Form input menyesuaikan lebar maksimum di layar mobile

## Cara Menjalankan

Buka file `index.html` melalui browser, lalu coba ubah ukuran jendela browser (atau buka lewat DevTools mode responsive) untuk melihat perubahan tampilan di breakpoint tablet dan mobile.