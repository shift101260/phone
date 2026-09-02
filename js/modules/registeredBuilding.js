// js/modules/registered-building.js
window.openRegisteredBuildingModal = function() {
    const modal = document.getElementById('registered-building-modal');
    if (modal) { modal.classList.remove('hidden'); modal.style.display = 'flex'; }
};

window.closeRegisteredBuildingModal = function() {
    const modal = document.getElementById('registered-building-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
};

window.addRegBuildingRow = function() {
    const container = document.getElementById('reg-building-rows-container');
    if (!container) return;
    const rowId = 'reg-bld-' + Date.now();
    const html = `
        <div id="${rowId}" class="grid grid-cols-[1fr_1fr_1.2fr_0.9fr_0.9fr_1.2fr_1fr_32px] gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm items-center text-xs">
            <input type="text" placeholder="例：456建號" class="w-full px-2 py-1 border rounded-lg">
            <input type="text" placeholder="例：仁武路100號" class="w-full px-2 py-1 border rounded-lg">
            <input type="text" placeholder="例：廠房 / 辦公室" class="w-full px-2 py-1 border rounded-lg">
            <input type="text" placeholder="例：鋼筋混凝土" class="w-full px-2 py-1 border rounded-lg">
            <input type="number" placeholder="0.00" class="w-full px-2 py-1 border rounded-lg font-mono">
            <input type="text" placeholder="所有權人" class="w-full px-2 py-1 border rounded-lg">
            <input type="text" placeholder="全部 / 持分" class="w-full px-2 py-1 border rounded-lg">
            <button type="button" onclick="document.getElementById('${rowId}').remove()" class="text-slate-400 hover:text-rose-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
};

console.log('保存登記建物模組載入成功！');
