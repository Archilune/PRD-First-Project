const state = {
    meja: {
        'K1-04': { status: 'KOSONG', kantin: '-' },
        'K1-05': { status: 'KOSONG', kantin: '-' },
        'K1-06': { status: 'KOSONG', kantin: '-' }
    },
    selectedMeja: null
};

function goTo(pageId, stepIdx) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    updateStepper(stepIdx);
    window.scrollTo(0, 0);
}

function updateStepper(activeIdx) {
    ['step-1','step-2','step-3'].forEach((id, i) => {
        const el = document.getElementById(id);
        el.className = 'step';
        if (i < activeIdx) el.classList.add('done');
        else if (i === activeIdx) el.classList.add('active');
    });
}

function renderMejaGrid() {
    const grid = document.getElementById('meja-grid');
    if (!grid) return;
    grid.innerHTML = '';
    Object.keys(state.meja).forEach(id => {
        const m = state.meja[id];
        const card = document.createElement('div');
        card.className = 'meja-card' + (m.status === 'TERISI' ? ' occupied' : '');
        card.id = 'card-' + id;
        card.innerHTML = `
            <div style="font-family:var(--mono); font-weight:500;">${id}</div>
            <div style="font-size:11px; color:var(--text-muted);">${m.status === 'TERISI' ? '● TERISI' : '○ Kosong'}</div>
        `;
        if (m.status === 'KOSONG') {
            card.onclick = () => selectMeja(id);
        }
        grid.appendChild(card);
    });
}

function selectMeja(id) {
    document.querySelectorAll('.meja-card').forEach(c => c.classList.remove('selected'));
    const card = document.getElementById('card-' + id);
    if (card) card.classList.add('selected');
    state.selectedMeja = id;
    document.getElementById('scan-info').style.display = 'flex';
    document.getElementById('scan-meja-label').textContent = id + ' (GKU 1)';
    document.getElementById('btn-scan').disabled = false;
}

function doScan() {
    if (!state.selectedMeja) return;
    document.getElementById('label-meja').textContent = state.selectedMeja + ' (GKU 1)';
    document.getElementById('qris-container').style.display = 'none';
    goTo('pg-konfirmasi', 1);
}

function showQRIS() {
    document.getElementById('qris-container').style.display = 'block';
}

function payDirect() {
    const kantin = document.getElementById('kantin').value;
    showToast('Ke kasir ' + kantin + ' sekarang.');
    setTimeout(() => toDashboard('Kasir'), 1000);
}

function toDashboard(method) {
    const kantin = document.getElementById('kantin').value;
    const meja = state.selectedMeja;
    state.meja[meja].status = 'TERISI';
    state.meja[meja].kantin = kantin;
    renderDashboard();
    goTo('pg-dashboard', 2);
    showToast('Berhasil! Meja ' + meja + ' terisi.');
}

function renderDashboard() {
    const total = Object.keys(state.meja).length;
    const terisi = Object.values(state.meja).filter(m => m.status === 'TERISI').length;
    document.getElementById('stat-terisi').innerHTML = terisi + ' <small>/ ' + total + '</small>';
    document.getElementById('stat-kosong').innerHTML = (total - terisi) + ' <small>/ ' + total + '</small>';

    const tbody = document.getElementById('tabel-meja');
    tbody.innerHTML = '';
    Object.keys(state.meja).forEach(id => {
        const m = state.meja[id];
        const isTerisi = m.status === 'TERISI';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${id}</td>
            <td>${m.kantin}</td>
            <td><span class="badge ${isTerisi ? 'badge-terisi' : 'badge-kosong'}">${m.status}</span></td>
            <td>${isTerisi ? `<button onclick="selesaiMeja('${id}')">Selesai</button>` : '—'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function selesaiMeja(id) {
    state.meja[id].status = 'KOSONG';
    state.meja[id].kantin = '-';
    renderDashboard();
    renderMejaGrid();
    showToast('Meja ' + id + ' dikosongkan.');
}

function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
}

// Start
renderMejaGrid();
renderDashboard();