window.openRegisteredBuildingModal = function() {
    document.getElementById('module-preview-title').innerText = '保存登記建物評估模組';
    document.getElementById('module-preview-body').innerHTML = `
        <div class="space-y-3">
            <div class="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-900 font-bold text-xs">
                📁 保存登記建物資料填寫與合法權狀面積審查
            </div>
            <div>
                <label class="font-bold block mb-1 text-stone-900">建號 / 建物門牌</label>
                <input type="text" placeholder="例：仁武段 456 建號" class="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs">
            </div>
            <div>
                <label class="font-bold block mb-1 text-stone-900">權狀總面積 (坪)</label>
                <input type="number" placeholder="0.00" class="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono">
            </div>
        </div>
    `;
    openModal('modulePreviewModal');
};
