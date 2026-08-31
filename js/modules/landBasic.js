// js/modules/land-basic.js
export let landRowCount = 0;

export function initLandModule() {
    // 初始化土地模組事件
}

export function addLandRow(data = {}) {
    landRowCount++;
    const rowId = `land-row-${landRowCount}`;
    const html = `
        <div id="${rowId}" class="grid grid-cols-1 md:grid-cols-10 gap-2 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs items-center">
            <input type="text" value="${data.number || ''}" placeholder="例：0899-0000" class="land-number w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-ruili-brand">
            <input type="text" value="${data.regDate || ''}" placeholder="例：112/05/20" class="land-reg-date w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-ruili-brand">
            <select class="land-zone-type w-full px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white text-xs focus:outline-none focus:border-ruili-brand">
                <option value="都計使用分區">都計使用分區</option>
                <option value="非都使用地類別">非都使用地類別</option>
            </select>
            <input type="text" value="${data.landType || ''}" placeholder="例：建築用地" class="land-type w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-ruili-brand">
            <input type="number" value="${data.area || ''}" step="0.01" min="0" placeholder="0.00" oninput="window.calculateLandTotals()" class="land-area-input w-full px-2.5 py-1.5 border border-stone-300 rounded-lg font-mono text-xs focus:outline-none focus:border-ruili-brand">
            <div class="flex items-center gap-0.5 col-span-2">
                <input type="number" value="${data.num || 1}" min="1" oninput="window.calculateLandTotals()" class="land-num-input w-full px-1 py-1.5 border border-stone-300 rounded-lg text-center font-mono text-xs focus:outline-none focus:border-ruili-brand">
                <span class="text-stone-400">/</span>
                <input type="number" value="${data.den || 1}" min="1" oninput="window.calculateLandTotals()" class="land-den-input w-full px-1 py-1.5 border border-stone-300 rounded-lg text-center font-mono text-xs focus:outline-none focus:border-ruili-brand">
            </div>
            <input type="text" readonly placeholder="0 m²" class="land-sqm-output w-full px-2.5 py-1.5 bg-stone-100 border border-stone-200 rounded-lg font-mono font-bold text-xs text-stone-700">
            <input type="text" readonly placeholder="0 坪" class="land-ping-output w-full px-2.5 py-1.5 bg-stone-100 border border-stone-200 rounded-lg font-mono font-bold text-xs text-emerald-700">
            <button type="button" onclick="document.getElementById('${rowId}').remove(); window.calculateLandTotals();" class="text-stone-400 hover:text-rose-600 transition p-1 text-center"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    const container = document.getElementById('land-rows-container');
    if (container) {
        container.insertAdjacentHTML('beforeend', html);
        window.calculateLandTotals();
    }
}

window.calculateLandTotals = function() {
    const rows = document.querySelectorAll('#land-rows-container > div');
    let totalSqm = 0;
    let totalPing = 0;

    rows.forEach(row => {
        const area = parseFloat(row.querySelector('.land-area-input')?.value) || 0;
        const num = parseFloat(row.querySelector('.land-num-input')?.value) || 1;
        const den = parseFloat(row.querySelector('.land-den-input')?.value) || 1;
        
        const effectiveArea = area * (num / den);
        const sqm = effectiveArea;
        const ping = effectiveArea * 0.3025;

        totalSqm += sqm;
        totalPing += ping;

        const sqmOut = row.querySelector('.land-sqm-output');
        const pingOut = row.querySelector('.land-ping-output');
        if (sqmOut) sqmOut.value = `${sqm.toFixed(2)} m²`;
        if (pingOut) pingOut.value = `${ping.toFixed(2)} 坪`;
    });

    const summaryEl = document.getElementById('land-total-summary');
    if (summaryEl) {
        summaryEl.innerText = `總計：${totalSqm.toFixed(2)} m² (${totalPing.toFixed(2)} 坪)`;
    }
};
