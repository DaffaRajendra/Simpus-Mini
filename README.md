# Jobsheet 6 — Fetch API & JSON

Sub-CPMK: Menerapkan komunikasi asinkron (AJAX/fetch, JSON).

## Identitas

| Data | Keterangan |
|---|---|
| Nama | Daffa Rajendra Maulana |
| NIM | 254107020181 |
| Mata Kuliah | Desain Pemograman Web |
| Kelas | TI - 2D |

## Tujuan

Mengambil dan menampilkan data secara asinkron menggunakan `fetch` dan JSON. File JSON statis dipakai sebagai pengganti sementara API, sebelum back-end sungguhan (PHP dan PostgreSQL) tersedia pada jobsheet berikutnya. Pola `fetch` yang dipelajari di sini akan dipakai ulang untuk memanggil endpoint PHP.

## Perubahan dari Jobsheet 5

- Ditambahkan `data/buku.json` (10 objek buku) dan `data/anggota.json` (5 objek anggota).
- `buku/list.html` dan `anggota/list.html`: `<tbody>` dikosongkan. Baris tabel sekarang dibuat oleh `assets/js/buku.js` dan `assets/js/anggota.js` dari hasil `fetch`.
- Ditambahkan **loading indicator** (`#loading-indicator`) yang tampil selama proses fetch. Delay 600 ms disimulasikan dengan `setTimeout` agar loading terlihat.
- Ditambahkan **penanganan error** (`try/catch`): jika fetch gagal, tabel menampilkan pesan "Gagal memuat data".
- `assets/js/app.js`: konfirmasi hapus diubah ke **event delegation**, dan ditambah helper `buatBaris` dan `tampilkanPesan` untuk membuat baris tabel.
- Halaman `anggota/list.html` ditambah kolom cari agar counter dan pencarian dari Jobsheet 5 juga berjalan di halaman Anggota.
- Footer semua halaman diperbarui menjadi Jobsheet 6.

## Cara Kerja

1. Saat halaman dimuat, `buku.js` menampilkan loading indicator dan mengosongkan `<tbody>`.
2. `fetch("../data/buku.json")` mengambil data. Jika respons tidak OK (`res.ok`), error dilempar.
3. `res.json()` mengubah isi file menjadi array objek JavaScript.
4. Setiap objek dirender menjadi satu `<tr>` lewat `createElement`, dan isi sel diatur dengan `textContent`.
5. Blok `finally` menyembunyikan loading indicator dan memperbarui counter, baik fetch berhasil maupun gagal.

Fungsi utamanya memakai **`async/await`**. Versi `.then()` yang setara:

```js
fetch("../data/buku.json")
    .then(function (res) { return res.json(); })
    .then(function (daftarBuku) { /* render baris */ })
    .catch(function (err) { /* tampilkan pesan gagal */ });
```

`await` membuat kode terbaca berurutan dari atas ke bawah, sedangkan `.then()` menyambung fungsi secara berantai. Keduanya melakukan hal yang sama.

## Tugas Mandiri

`data/anggota.json` dan `assets/js/anggota.js` dibuat dengan pola `fetch` yang sama untuk halaman Daftar Anggota.

## Kriteria Penilaian

| Kriteria | Pemenuhan |
|---|---|
| Data tampil dari JSON tanpa hardcode di HTML | `<tbody>` kosong di HTML, baris dibuat oleh JavaScript |
| Penanganan loading dan error | `#loading-indicator` dan `try/catch/finally` |
| Memakai `async/await` minimal di satu tempat | `buku.js` dan `anggota.js` |

## Struktur Folder

```
jobsheet-06/
├── anggota/
│   ├── list.html
│   └── tambah.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── anggota.js      # fetch + render Daftar Anggota
│       ├── app.js          # hamburger, validasi, pencarian, hapus, helper tabel
│       └── buku.js         # fetch + render Daftar Buku
├── buku/
│   ├── list.html
│   └── tambah.html
├── data/
│   ├── anggota.json
│   └── buku.json
├── docs/
│   └── wireframe.md
├── index.html
└── README.md
```

## Cara Menjalankan

**Penting:** `fetch()` ke file lokal diblokir browser jika halaman dibuka langsung dengan `file://` (klik dua kali). Jalankan lewat server lokal:

- **VS Code:** pasang ekstensi *Live Server*, klik kanan `index.html`, lalu pilih *Open with Live Server*.
- **Terminal:**
  ```bash
  python -m http.server 8000
  ```
  lalu buka `http://localhost:8000/index.html`.

## Cara Menguji

1. Buka **List Buku**: loading muncul sebentar, lalu 10 buku tampil dari JSON.
2. Buka **List Anggota**: 5 anggota tampil dari JSON.
3. Ketik di kolom cari: tabel tersaring dan counter berubah.
4. Klik **Hapus** pada baris yang dibuat dinamis: dialog konfirmasi muncul, baris hilang, counter berkurang.
5. **Uji error:** ubah sementara nama file di `fetch("../data/buku.json")` menjadi nama yang salah (misalnya `bukuu.json`), lalu muat ulang. Tabel menampilkan pesan "Gagal memuat data". Kembalikan nama file setelah selesai.
6. Buka Console (**F12**) dan pastikan tidak ada error selain saat pengujian error.

## Kesimpulan

Dengan `fetch` dan JSON, data tidak lagi ditulis manual di HTML, sehingga tampilan dan data terpisah. Halaman kini memberi umpan balik saat data sedang dimuat (loading) dan saat pengambilan data gagal (pesan error). Pola ini akan dipakai kembali ketika data berasal dari endpoint PHP dan database pada jobsheet berikutnya, dengan perubahan utama hanya pada alamat yang dipanggil oleh `fetch`.
