// ===== Daftar Anggota dari data/anggota.json (fetch + async/await) =====
async function muatDaftarAnggota() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise(function (resolve) { setTimeout(resolve, 600); });

        const res = await fetch("../data/anggota.json");
        if (!res.ok) {
            throw new Error("status " + res.status);
        }
        const daftarAnggota = await res.json();

        if (daftarAnggota.length === 0) {
            tampilkanPesan(tbody, 6, "Belum ada data anggota.");
        }
        daftarAnggota.forEach(function (anggota) {
            tbody.appendChild(buatBaris(
                [anggota.no_anggota, anggota.nama, anggota.alamat, anggota.no_hp, anggota.tanggal_bergabung],
                "btn-edit",
                "btn-hapus"
            ));
        });
    } catch (err) {
        tampilkanPesan(tbody, 6, "Gagal memuat data (" + err.message + ").", true);
    } finally {
        loading.style.display = "none";
        perbaruiTabel();
    }
}

document.addEventListener("DOMContentLoaded", muatDaftarAnggota);
