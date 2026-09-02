window.openUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) { modal.classList.remove('hidden'); modal.style.display = 'flex'; }
};

window.closeUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
};

export function addUnregBuildingRow(data = {}) {
    const container = document.getElementById('unreg-building-rows-container');
    if (!container) return;
    const rowId = 'unreg-bld-' + Date.now() + Math.random().toString(36).substr(2, 5);
    const html = `
        <div id="${rowId}" class="grid grid-cols-[1.5fr_1.2fr_1fr_0.9fr_0.9fr_1.5fr_32px] gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm items-center text-xs">
            <input type="text" value="${data.address || ''}" placeholder="例：廠房後方鐵皮增建" class="unreg-address w-full px-2 py-1 border border-slate-300 rounded-lg">
            <input type="text" value="${data.structure || ''}" placeholder="例：鋼架造" class="unreg-structure w-full px-2 py-1 border border-slate-300 rounded-lg">
            <input type="number" value="${data.area || ''}" step="0.01" min="0" placeholder="0.00" oninput="window.calculateUnregBuildingTotals()" class="unreg-area w-full px-2 py-1 border border-slate-300 rounded-lg font-mono">
            <input type="text" readonly class="unreg-sqm w-full px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg font-mono font-bold">
            <input type="text" readonly class="unreg-ping w-full px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg font-mono font-bold">
            <input type="text" value="${data.note || ''}" placeholder="例：倉儲使用 / 可補照" class="unreg-note w-full px-2 py-1 border border-slate-300 rounded-lg">
            <button type="button" onclick="document.getElementById('${rowId}').remove(); window.calculateUnregBuildingTotals();" class="text-slate-400 hover:text-rose-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
    window.calculateUnregBuildingTotals();
}

window.calculateUnregBuildingTotals = function() {
    let totalSqm = 0;
    const rows = document.querySelectorAll('#unreg-building-rows-container > div');
    rows.forEach(row => {
        const sqm = parseFloat(row.querySelector('.unreg-area')?.value || 0);
        const ping = sqm * 0.3025;
        
        const sqmOut = row.querySelector('.unreg-sqm');
        const pingOut = row.querySelector('.unreg-ping');
        if (sqmOut) sqmOut.value = sqm.toFixed(2);
        if (pingOut) pingOut.value = ping.toFixed(2);
        
        totalSqm += sqm;
    });

    const sumSqm = document.getElementById('sum-unreg-sqm');
    const sumPing = document.getElementById('sum-unreg-ping');
    
    if (sumSqm) sumSqm.textContent = `${totalSqm.toFixed(2)} ㎡`;
    if (sumPing) sumPing.textContent = `${(totalSqm * 0.3025).toFixed(2)} 坪`;
};

window.addUnregBuildingRow = addUnregBuildingRow;
