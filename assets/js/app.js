// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.getElementById("navMenu");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        const terbuka = nav.classList.toggle("show");
        toggleBtn.setAttribute("aria-expanded", terbuka);
    });
}

// ===== Helper tabel (Latihan 3: pencarian hanya di kolom Judul/Nama) =====
function ambilTabel() {
    return document.querySelector(".table-responsive table");
}

function indeksKolomCari(table) {
    const judulKolom = Array.from(table.querySelectorAll("thead th")).map(function (th) {
        return th.textContent.trim();
    });
    const idx = judulKolom.findIndex(function (teks) {
        return teks === "Judul" || teks === "Nama";
    });
    return idx === -1 ? 0 : idx;
}

// ===== Filter + counter (Latihan 3 dan 4) =====
function perbaruiTabel() {
    const table = ambilTabel();
    if (!table) return;

    const input = document.getElementById("search-input");
    const keyword = input ? input.value.trim().toLowerCase() : "";
    const idx = indeksKolomCari(table);
    const rows = table.querySelectorAll("tbody tr:not(.baris-pesan)");
    let tampil = 0;

    rows.forEach(function (row) {
        const sel = row.cells[idx];
        const teks = sel ? sel.textContent.toLowerCase() : "";
        const cocok = teks.includes(keyword);
        row.style.display = cocok ? "" : "none";
        if (cocok) tampil++;
    });

    const info = document.getElementById("info-jumlah");
    if (info) {
        const namaKolom = table.querySelectorAll("thead th")[idx].textContent.trim();
        const satuan = namaKolom === "Judul" ? "buku" : "anggota";
        info.textContent = "Menampilkan " + tampil + " dari " + rows.length + " " + satuan;
    }
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = ambilTabel();
    if (!table) return;

    const info = document.createElement("p");
    info.id = "info-jumlah";
    info.className = "text-muted small mb-2";
    table.closest(".table-responsive").insertAdjacentElement("beforebegin", info);

    if (input) {
        input.addEventListener("keyup", perbaruiTabel);
    }
    perbaruiTabel();
}

// ===== Konfirmasi hapus (event delegation, karena baris dibuat dinamis lewat fetch) =====
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const table = ambilTabel();
        let nama = "data ini";
        if (row && table) {
            const sel = row.cells[indeksKolomCari(table)];
            if (sel) nama = sel.textContent.trim();
        }
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();
            perbaruiTabel();
        }
    });
}

// ===== Validasi form (Latihan 1 dan 5: aturan field disimpan di array) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error text-danger small d-block mt-1";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

const ATURAN = [
    { name: "judul",      label: "Judul",        wajib: true },
    { name: "pengarang",  label: "Pengarang",    wajib: true },
    { name: "tahun",      label: "Tahun terbit", wajib: true, bulat: true, min: 1900, max: new Date().getFullYear() },
    { name: "isbn",       label: "ISBN",         wajib: true, pola: /^[0-9-]+$/, pesanPola: "ISBN hanya boleh berisi angka dan tanda hubung (-)." },
    { name: "stok",       label: "Stok",         wajib: true, bulat: true, min: 0 },
    { name: "nama",       label: "Nama",         wajib: true },
    { name: "no_anggota", label: "No. Anggota",  wajib: true },
    { name: "alamat",     label: "Alamat",       wajib: true },
    { name: "no_hp",      label: "No. HP",       wajib: true, pola: /^[0-9+\-\s]{8,15}$/, pesanPola: "No. HP harus 8-15 karakter (angka, +, -)." },
    { name: "email",      label: "Email",        wajib: true, pola: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, pesanPola: "Format email tidak valid." }
];

function cekNilai(aturan, nilai) {
    nilai = nilai.trim();

    if (nilai === "") {
        return aturan.wajib ? aturan.label + " wajib diisi." : "";
    }

    if (aturan.bulat) {
        const angka = Number(nilai);
        if (!Number.isInteger(angka)) {
            return aturan.label + " harus berupa bilangan bulat.";
        }
        const adaMin = aturan.min !== undefined;
        const adaMax = aturan.max !== undefined;
        if ((adaMin && angka < aturan.min) || (adaMax && angka > aturan.max)) {
            if (adaMin && adaMax) {
                return aturan.label + " harus antara " + aturan.min + " dan " + aturan.max + ".";
            }
            return aturan.label + " tidak boleh kurang dari " + aturan.min + ".";
        }
    }

    if (aturan.pola && !aturan.pola.test(nilai)) {
        return aturan.pesanPola;
    }

    return "";
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;
        let inputPertamaSalah = null;

        ATURAN.forEach(function (aturan) {
            const input = form.querySelector("[name='" + aturan.name + "']");
            if (!input) return;

            const pesan = cekNilai(aturan, input.value);
            if (pesan) {
                tampilkanError(input, pesan);
                valid = false;
                if (!inputPertamaSalah) inputPertamaSalah = input;
            } else {
                hapusError(input);
            }
        });

        if (!valid) {
            e.preventDefault();
            inputPertamaSalah.focus();
        }
    });
}

// ===== Helper render tabel dinamis (dipakai buku.js dan anggota.js) =====
function buatBaris(nilaiKolom, kelasEdit, kelasHapus) {
    const tr = document.createElement("tr");

    nilaiKolom.forEach(function (nilai) {
        const td = document.createElement("td");
        td.textContent = nilai;
        tr.appendChild(td);
    });

    const tdAksi = document.createElement("td");
    const tombolEdit = document.createElement("button");
    tombolEdit.type = "button";
    tombolEdit.className = kelasEdit;
    tombolEdit.textContent = "Edit";
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = kelasHapus;
    tombolHapus.textContent = "Hapus";
    tdAksi.append(tombolEdit, " ", tombolHapus);
    tr.appendChild(tdAksi);

    return tr;
}

function tampilkanPesan(tbody, jumlahKolom, teks, error) {
    const tr = document.createElement("tr");
    tr.className = "baris-pesan";
    const td = document.createElement("td");
    td.colSpan = jumlahKolom;
    td.className = error ? "text-center text-danger" : "text-center text-muted";
    td.textContent = teks;
    tr.appendChild(td);
    tbody.appendChild(tr);
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});
