// js/modules/unregistered-building.js
window.openUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) { modal.classList.remove('hidden'); modal.style.display = 'flex'; }
};

window.closeUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
};

window.addUnregBuildingRow = function() {
    const container = document.getElementById('unreg-building-rows-container');
    if (!container) return;
    const rowId = 'unreg-bld-' + Date.now();
    const html = `
        <div id="${rowId}" class="grid grid-cols-[1.2fr_1fr_1fr_1.2fr_32px] gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm items-center text-xs">
            <input type="text" placeholder="例：廠房後方鐵皮增建" class="w-full px-2 py-1 border rounded-lg">
            <input type="text" placeholder="例：鋼架造" class="w-full px-2 py-1 border rounded-lg">
            <input type="text" placeholder="例：80坪" class="w-full px-2 py-1 border rounded-lg font-mono">
            <input type="text" placeholder="例：倉儲使用 / 可辦理補照" class="w-full px-2 py-1 border rounded-lg">
            <button type="button" onclick="document.getElementById('${rowId}').remove()" class="text-slate-400 hover:text-rose-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
};

console.log('未保存登記建物模組載入成功！');
