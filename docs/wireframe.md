# Wireframe & User Flow — SIMPUS-Mini

**Jobsheet 4 — Merancang UI/UX Aplikasi (Proyek)**

Dokumen ini adalah rancangan untuk fitur yang **belum dibangun**: Login, Registrasi Petugas, Dashboard Petugas, Peminjaman, Pengembalian, dan Riwayat Peminjaman. Rancangan ini menjadi acuan struktur HTML yang akan dibuat mulai Jobsheet 5. Halaman yang sudah ada (Beranda, Daftar/Tambah Buku, Daftar/Tambah Anggota) tidak diubah.

---

## 1. Aktor dan Hak Akses

| Aktor | Peran |
|---|---|
| **Tamu** | Pengunjung tanpa login. Hanya melihat katalog buku. |
| **Petugas** | Sudah login. Mengelola buku, anggota, dan transaksi peminjaman/pengembalian. |

| Halaman | Tamu | Petugas |
|---|:---:|:---:|
| Beranda | ✔ | ✔ |
| Daftar Buku | ✔ | ✔ |
| Login / Registrasi | ✔ | – |
| Dashboard Petugas | ✘ | ✔ |
| Tambah/Edit/Hapus Buku | ✘ | ✔ |
| Daftar/Tambah Anggota | ✘ | ✔ |
| Peminjaman, Pengembalian, Riwayat | ✘ | ✔ |

Tamu yang mencoba membuka halaman khusus Petugas diarahkan ke halaman Login.

---

## 2. Navigasi (Navbar)

Navbar yang ada saat ini **belum seragam** antar halaman (Beranda menampilkan "Tambah Buku", sedangkan halaman Anggota menampilkan "Tambah Anggota"). Agar terasa satu sistem, semua halaman memakai satu pola navbar berikut. Menu "Tambah ..." dipindah menjadi tombol di dalam halaman daftar.

**Tamu:**

```
+------------------------------------------------------------+
| SIMPUS-Mini              Beranda | Daftar Buku | Login     |
+------------------------------------------------------------+
```

**Petugas:**

```
+-------------------------------------------------------------------------------------+
| SIMPUS-Mini   Beranda | Buku | Anggota | Peminjaman | Pengembalian |  Siti (Logout) |
+-------------------------------------------------------------------------------------+
```

**Tampilan mobile (≤ 768px):** menu disembunyikan dan dibuka lewat tombol hamburger (☰), sama seperti `nav-toggle` yang sudah dibuat di Jobsheet 3.

```
+--------------------------+
| SIMPUS-Mini          ☰   |
+--------------------------+
```

---

## 3. User Flow

Keterangan simbol: `[ ]` = langkah/halaman, `< >` = keputusan, `-->` = alur.

### 3.1 Petugas Meminjamkan Buku ke Anggota

```
[Buka halaman Login]
        |
        v
[Isi username & password] --> < Data benar? >
                                   |            |
                                  Ya          Tidak
                                   |            |
                                   |            v
                                   |   [Pesan "Username atau password salah"]
                                   |            |
                                   |            +--> kembali ke [Login]
                                   v
                           [Dashboard Petugas]
                                   |
                                   v
                    [Klik "+ Peminjaman Baru"]
                                   |
                                   v
                           [Pilih anggota]
                                   |
                                   v
                    < Anggota punya tunggakan? >
                          |                 |
                         Ya               Tidak
                          |                 |
                          v                 v
       [Peringatan: "Anggota masih       [Pilih buku]
        punya buku terlambat"]                |
        [Peminjaman ditolak]                  v
                          |            < Stok buku > 0? >
                          v                |         |
                    [Dashboard]          Ya       Tidak
                                          |         |
                                          |         v
                                          |  [Pesan "Stok habis"]
                                          |         |
                                          |         +--> kembali ke [Pilih buku]
                                          v
                                      [Klik Simpan]
                                          |
                                          v
                        [Stok buku dikurangi 1 & transaksi dicatat]
                                          |
                                          v
                          [Pesan sukses] --> [Dashboard]
```

### 3.2 Petugas Mengembalikan Buku

```
[Dashboard]
     |
     v
[Klik "+ Pengembalian"]
     |
     v
[Cari transaksi: nama anggota / judul buku]
     |
     v
< Transaksi aktif ditemukan? >
       |              |
      Ya            Tidak
       |              |
       |              v
       |     [Pesan "Transaksi tidak ditemukan"]
       |              |
       |              +--> kembali ke [Cari transaksi]
       v
[Pilih transaksi, klik "Kembalikan"]
     |
     v
< Melewati jatuh tempo? >
       |              |
      Ya            Tidak
       |              |
       v              |
[Tandai status        |
 "Terlambat"]         |
       |              |
       +------+-------+
              |
              v
[Stok buku ditambah 1 & tanggal kembali dicatat]
              |
              v
   [Pesan sukses] --> [Dashboard]
```

### 3.3 Daftar Edge Case

| # | Situasi | Perilaku sistem |
|---|---|---|
| 1 | Stok buku = 0 | Buku tampil non-aktif di dropdown dengan label "(Stok habis)". Tidak bisa dipilih. |
| 2 | Anggota punya tunggakan | Peminjaman ditolak dengan pesan yang menyebut buku yang terlambat. |
| 3 | Login gagal | Pesan error umum, tanpa menyebut mana yang salah (username atau password). |
| 4 | Tamu membuka halaman Petugas | Diarahkan ke Login. |
| 5 | Transaksi sudah dikembalikan | Tidak muncul di pencarian pengembalian, jadi stok tidak bertambah dua kali. |
| 6 | Pengembalian melewati jatuh tempo | Status "Terlambat" dicatat. |
| 7 | Tidak ada data (buku/transaksi kosong) | Tampilkan teks "Belum ada data", bukan tabel kosong. |

> Aturan jatuh tempo (misalnya 7 hari) belum ditetapkan di jobsheet. Angkanya bisa disesuaikan dengan ketentuan kelas.

---

## 4. Wireframe

Contoh isi data memakai data yang sudah ada di halaman Daftar Buku dan Daftar Anggota.

### 4.1 Login

```
+--------------------------------------------------------+
| SIMPUS-Mini              Beranda | Daftar Buku | Login |
+--------------------------------------------------------+
|                                                        |
|          +----------------------------+                |
|          |       Login Petugas        |                |
|          |----------------------------|                |
|          |  Username                  |                |
|          |  [______________________]  |                |
|          |  Password                  |                |
|          |  [______________________]  |                |
|          |                            |                |
|          |  ! Pesan error (jika ada)  |                |
|          |                            |                |
|          |  [        Masuk        ]   |                |
|          |                            |                |
|          |  Belum punya akun?         |                |
|          |  Daftar di sini            |                |
|          +----------------------------+                |
|                                                        |
+--------------------------------------------------------+
| © 2026 SIMPUS-Mini                                     |
+--------------------------------------------------------+
```

### 4.2 Registrasi Petugas

```
+--------------------------------------------------------+
| SIMPUS-Mini              Beranda | Daftar Buku | Login |
+--------------------------------------------------------+
|          +----------------------------+                |
|          |     Registrasi Petugas     |                |
|          |----------------------------|                |
|          |  Nama Lengkap              |                |
|          |  [______________________]  |                |
|          |  Username                  |                |
|          |  [______________________]  |                |
|          |  Password                  |                |
|          |  [______________________]  |                |
|          |  Konfirmasi Password       |                |
|          |  [______________________]  |                |
|          |                            |                |
|          |  [       Daftar        ]   |                |
|          |                            |                |
|          |  Sudah punya akun?         |                |
|          |  Login di sini             |                |
|          +----------------------------+                |
+--------------------------------------------------------+
```

### 4.3 Dashboard Petugas

```
+-----------------------------------------------------------------------------------+
| SIMPUS-Mini  Beranda | Buku | Anggota | Peminjaman | Pengembalian | Siti (Logout) |
+-----------------------------------------------------------------------------------+
|  Dashboard Petugas                                                                |
|                                                                                   |
|  +----------------+   +----------------+   +----------------+                     |
|  |  Total Buku    |   | Total Anggota  |   |Sedang Dipinjam |                     |
|  |      12        |   |       8        |   |       3        |                     |
|  +----------------+   +----------------+   +----------------+                     |
|                                                                                   |
|  Aksi Cepat                                                                       |
|  [ + Peminjaman Baru ]   [ + Pengembalian ]   [ + Tambah Buku ]                   |
|                                                                                   |
|  Transaksi Terbaru                                                                |
|  +----------------------------------------------------------------------+         |
|  | Anggota       | Buku            | Tgl Pinjam | Status                |         |
|  |---------------|-----------------|------------|-----------------------|         |
|  | Siti Aminah   | Bumi Manusia    | 15/07/2026 | Dipinjam              |         |
|  | Budi Santoso  | Laskar Pelangi  | 01/07/2026 | Dikembalikan          |         |
|  +----------------------------------------------------------------------+         |
+-----------------------------------------------------------------------------------+
```

Tiga kartu statistik memakai pola yang sama dengan halaman Beranda (grid 3 kolom). Di layar kecil, kartu ditumpuk menjadi 1 kolom.

### 4.4 Form Peminjaman

```
+--------------------------------------------+
| (navbar Petugas)                           |
+--------------------------------------------+
|  Peminjaman Buku Baru                      |
|                                            |
|  Anggota                                   |
|  [ A001 - Siti Aminah              v ]     |
|                                            |
|  ! Anggota ini punya buku terlambat.       |  <- tampil hanya jika tunggakan
|    Peminjaman tidak dapat dilanjutkan.     |
|                                            |
|  Buku                                      |
|  [ Laskar Pelangi (stok 4)         v ]     |
|    Bumi Manusia (stok 2)                   |
|    Negeri 5 Menara (Stok habis)  <- abu    |
|                                            |
|  Tanggal Pinjam                            |
|  [ 20/09/2026 ]  (otomatis hari ini)       |
|                                            |
|  [ Simpan Peminjaman ]    [ Batal ]        |
+--------------------------------------------+
```

### 4.5 Form Pengembalian

```
+----------------------------------------------------------------+
| (navbar Petugas)                                               |
+----------------------------------------------------------------+
|  Pengembalian Buku                                             |
|                                                                |
|  Cari transaksi aktif                                          |
|  [ nama anggota / judul buku ____________ ] [ Cari ]           |
|                                                                |
|  +-----------------------------------------------------------+ |
|  | Anggota      | Buku           | Tgl Pinjam | Aksi         | |
|  |--------------|----------------|------------|--------------| |
|  | Siti Aminah  | Bumi Manusia   | 15/07/2026 | [Kembalikan] | |
|  | Budi Santoso | Filosofi Teras | 03/07/2026 | [Kembalikan] | |
|  |              |  (Terlambat)   |            |              | |
|  +-----------------------------------------------------------+ |
|                                                                |
|  Belum ada transaksi aktif.                                    |  <- tampil jika hasil kosong
+----------------------------------------------------------------+
```

### 4.6 Riwayat Peminjaman per Anggota

```
+----------------------------------------------------------------+
| (navbar Petugas)                                               |
+----------------------------------------------------------------+
|  Riwayat Peminjaman - A001 Siti Aminah                         |
|  [ < Kembali ke Daftar Anggota ]                               |
|                                                                |
|  +----------------------------------------------------------+  |
|  | Buku           | Pinjam     | Kembali    | Status        |  |
|  |----------------|------------|------------|---------------|  |
|  | Laskar Pelangi | 01/07/2026 | 10/07/2026 | Selesai       |  |
|  | Bumi Manusia   | 15/07/2026 | -          | Dipinjam      |  |
|  +----------------------------------------------------------+  |
+----------------------------------------------------------------+
```

Halaman ini dibuka dari tombol "Riwayat" yang ditambahkan di kolom Aksi pada Daftar Anggota (di samping Edit dan Hapus).

---

## 5. Keselarasan dengan Halaman yang Sudah Ada

### 5.1 Halaman existing dan perubahannya

| Halaman | Perubahan pada rancangan |
|---|---|
| `index.html` (Beranda) | Kartu ringkasan dipakai ulang di Dashboard. Navbar diseragamkan. |
| `buku/list.html` | Tombol "+ Tambah Buku" dipindah ke atas tabel. Kolom Stok tetap. |
| `buku/tambah.html` | Tidak berubah. |
| `anggota/list.html` | Ditambah tombol "Riwayat" di kolom Aksi. |
| `anggota/tambah.html` | Tidak berubah. |

### 5.2 Halaman baru yang direncanakan

| Halaman | Perkiraan lokasi file |
|---|---|
| Login | `auth/login` |
| Registrasi Petugas | `auth/register` |
| Dashboard Petugas | `index` (tampilan berbeda untuk Tamu dan Petugas) |
| Form Peminjaman | `peminjaman/tambah` |
| Form Pengembalian | `peminjaman/kembali` |
| Riwayat per anggota | `peminjaman/riwayat` |

---

## 6. Style Guide (dari `assets/css/style.css`)

Mockup dan halaman baru memakai gaya yang sama dengan halaman yang sudah berjalan.

| Elemen | Nilai |
|---|---|
| Font | Segoe UI, Arial, sans-serif |
| Warna utama (header, judul section, tombol simpan) | `#1d5b8a` |
| Warna tombol utama saat hover | `#164869` |
| Latar halaman | `#f5f6f8` |
| Latar kartu statistik / hover baris tabel | `#eef4fa` |
| Teks utama | `#2b2b2b` |
| Teks sekunder (label kartu) | `#55677a` |
| Header tabel | `#1d5b8a` dengan teks putih |
| Tombol Edit | `#f0ad4e` |
| Tombol Hapus | `#d9534f` |
| Lebar maksimum konten | 1000px |
| Lebar maksimum form | 400px |
| Breakpoint responsif | 768px dan 480px |

Pesan error memakai warna `#d9534f` (sama dengan tombol Hapus) agar konsisten. Pesan sukses memakai hijau yang belum ada di CSS, jadi perlu ditambahkan saat implementasi.