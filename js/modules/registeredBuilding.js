window.openRegisteredBuildingModal = function() {
    const modal = document.getElementById('registered-building-modal');
    if (modal) { modal.classList.remove('hidden'); modal.style.display = 'flex'; }
};

window.closeRegisteredBuildingModal = function() {
    const modal = document.getElementById('registered-building-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
};

window.addRegBuildingRow = function(data = {}) {
    const container = document.getElementById('reg-building-rows-container');
    if (!container) return;
    const rowId = 'reg-bld-' + Date.now() + Math.random().toString(36).substr(2, 5);
    const html = `
        <div id="${rowId}" class="grid grid-cols-[1fr_1fr_1.2fr_0.9fr_0.9fr_1.2fr_1fr_32px] gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm items-center text-xs">
            <input type="text" value="${data.bldNo || ''}" placeholder="例：456建號" class="w-full px-2 py-1 border border-slate-300 rounded-lg">
            <input type="text" value="${data.location || ''}" placeholder="例：仁武路100號" class="w-full px-2 py-1 border border-slate-300 rounded-lg">
            <input type="text" value="${data.purpose || ''}" placeholder="例：廠房 / 辦公室" class="w-full px-2 py-1 border border-slate-300 rounded-lg">
            <input type="text" value="${data.structure || ''}" placeholder="例：鋼筋混凝土" class="w-full px-2 py-1 border border-slate-300 rounded-lg">
            <input type="number" value="${data.area || ''}" placeholder="0.00" class="w-full px-2 py-1 border border-slate-300 rounded-lg font-mono">
            <input type="text" value="${data.owner || ''}" placeholder="所有權人" class="w-full px-2 py-1 border border-slate-300 rounded-lg">
            <input type="text" value="${data.rights || ''}" placeholder="全部 / 持分" class="w-full px-2 py-1 border border-slate-300 rounded-lg">
            <button type="button" onclick="document.getElementById('${rowId}').remove()" class="text-slate-400 hover:text-rose-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
};
