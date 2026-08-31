window.openUnregisteredBuildingModal = function() {
    document.getElementById('module-preview-title').innerText = '未保存登記建物評估模組';
    document.getElementById('module-preview-body').innerHTML = `
        <div class="space-y-3">
            <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-bold text-xs">
                🏭 未保存登記廠房 / 舊違建現況測量與合法化評估
            </div>
            <div>
                <label class="font-bold block mb-1 text-stone-900">建物結構與現況說明</label>
                <input type="text" placeholder="例：C型鋼鐵皮廠房" class="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs">
            </div>
            <div>
                <label class="font-bold block mb-1 text-stone-900">估測面積 (坪)</label>
                <input type="number" placeholder="0.00" class="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono">
            </div>
        </div>
    `;
    openModal('modulePreviewModal');
};
