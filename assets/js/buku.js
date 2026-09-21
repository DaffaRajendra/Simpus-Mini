// ===== Daftar Buku dari data/buku.json (fetch + async/await) =====
async function muatDaftarBuku() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });

        const res = await fetch("../data/buku.json");
        if (!res.ok) {
            throw new Error("status " + res.status);
        }
        const daftarBuku = await res.json();

        if (daftarBuku.length === 0) {
            tampilkanPesan(tbody, 5, "Belum ada data buku.");
        }
        daftarBuku.forEach(function (buku) {
            tbody.appendChild(buatBaris(
                [buku.judul, buku.pengarang, buku.stok, buku.tahun],
                "btn btn-warning btn-sm text-white",
                "btn btn-danger btn-sm btn-hapus"
            ));
        });
    } catch (err) {
        tampilkanPesan(tbody, 5, "Gagal memuat data (" + err.message + ").", true);
    } finally {
        loading.style.display = "none";
        perbaruiTabel();
    }
}

document.addEventListener("DOMContentLoaded", muatDaftarBuku);
