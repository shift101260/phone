/**
 * 開啟集團案件完整建檔與評估中心（八大區塊彈窗）
 */
export function openAddCaseModal(year = '2026') {
    const yearInput = document.getElementById('edit-case-year');
    const idInput = document.getElementById('edit-case-id');
    const timeDisplay = document.getElementById('edit-case-time-display');
    
    if (yearInput) yearInput.value = year;
    if (idInput) idInput.value = ''; // 留空代表新增模式

    // 需求 2：自動產生並顯示當下建檔時間
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    if (timeDisplay) timeDisplay.innerText = timeStr;

    // 清空主要輸入欄位
    const clientInput = document.getElementById('edit-case-client');
    const nameInput = document.getElementById('edit-case-name');
    const detailInput = document.getElementById('edit-case-service-detail');
    const addressInput = document.getElementById('edit-case-address');
    const descInput = document.getElementById('edit-case-desc');
    const noteInput = document.getElementById('edit-case-note');
    const amountInput = document.getElementById('edit-case-amount');

    if (clientInput) clientInput.value = '';
    if (nameInput) nameInput.value = '';
    if (detailInput) detailInput.value = '';
    if (addressInput) addressInput.value = '';
    if (descInput) descInput.value = '';
    if (noteInput) noteInput.value = '';
    if (amountInput) amountInput.value = '';

    const modal = document.getElementById('editCaseModal');
    if (modal) modal.classList.remove('hidden');
}

/**
 * 需求 5：動態新增供應商報價欄位列
 */
window.addQuoteSupplierRow = function() {
    const container = document.getElementById('suppliers-rows-container');
    if (!container) return;

    const rowId = 'supplier-row-' + Date.now();
    const html = `
        <div id="${rowId}" class="grid grid-cols-1 md:grid-cols-6 gap-3 items-center bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div>
                <input type="text" placeholder="供應商名稱" class="supplier-name w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand shadow-2xs">
            </div>
            <div>
                <input type="text" placeholder="施作項目" class="supplier-item w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand shadow-2xs">
            </div>
            <div>
                <input type="number" placeholder="0" oninput="calculateQuoteTotals()" class="supplier-untaxed w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand shadow-2xs font-mono">
            </div>
            <div>
                <input type="number" placeholder="0" oninput="calculateQuoteTotals()" class="supplier-amount w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand shadow-2xs font-mono">
            </div>
            <div>
                <input type="number" placeholder="0" oninput="calculateQuoteTotals()" class="supplier-contract w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand shadow-2xs font-mono text-rose-600 font-bold">
            </div>
            <div class="flex items-center space-x-2">
                <input type="number" value="5" oninput="calculateQuoteTotals()" class="supplier-tax w-14 bg-white border border-stone-300 rounded-xl px-2 py-1.5 text-xs text-center font-mono">
                <button type="button" onclick="document.getElementById('${rowId}').remove(); calculateQuoteTotals();" class="px-2.5 py-1.5 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-xl text-xs font-bold transition">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
};

/**
 * 需求 6：總結算試算（自動計算總報價金額、稅後總金額、案件總利潤）
 */
window.calculateQuoteTotals = function() {
    const rows = document.querySelectorAll('#suppliers-rows-container > div');
    let totalQuote = 0;
    let totalContract = 0;

    rows.forEach(row => {
        const amount = parseFloat(row.querySelector('.supplier-amount')?.value) || 0;
        const contract = parseFloat(row.querySelector('.supplier-contract')?.value) || 0;
        totalQuote += amount;
        totalContract += contract;
    });

    const totalTaxAfter = totalQuote * 1.05; // 假設 5% 營業稅
    const totalProfit = totalContract - totalQuote;

    const elTotal = document.getElementById('calc-total-quote');
    const elTaxAfter = document.getElementById('calc-tax-after');
    const elProfit = document.getElementById('calc-total-profit');

    if (elTotal) elTotal.value = `NT$ ${totalQuote.toLocaleString()}`;
    if (elTaxAfter) elTaxAfter.value = `NT$ ${Math.round(totalTaxAfter).toLocaleString()}`;
    if (elProfit) elProfit.value = `NT$ ${totalProfit.toLocaleString()}`;
};

/**
 * 開啟報價單生成彈窗
 */
window.openQuotationGeneratorModal = function() {
    const modal = document.getElementById('quotationGeneratorModal');
    if (modal) modal.classList.remove('hidden');
};

/**
 * 儲存新增或編輯後的案件資料
 */
export function saveEditedCaseData() {
    const year = document.getElementById('edit-case-year')?.value || '2026';
    const caseId = document.getElementById('edit-case-id')?.value;
    
    const client = document.getElementById('edit-case-client')?.value.trim();
    const name = document.getElementById('edit-case-name')?.value.trim();
    const service = document.getElementById('edit-case-service')?.value;
    const amount = document.getElementById('edit-case-amount')?.value;
    const progress = document.getElementById('edit-case-progress-status')?.value;
    const status = document.getElementById('edit-case-status')?.value || '案件評估';
    const note = document.getElementById('edit-case-note')?.value.trim() || '';

    if (!name) {
        alert('⚠️ 欄位不完整：請填寫「案件名稱」！');
        return;
    }

    if (typeof window.globalCasesData === 'undefined') {
        window.globalCasesData = {};
    }
    if (!window.globalCasesData[year]) {
        window.globalCasesData[year] = [];
    }

    if (caseId) {
        let target = window.globalCasesData[year].find(c => c.id === caseId);
        if (target) {
            target.client = client || name.split(' ')[0] || '未具名客戶';
            target.name = name;
            target.service = service;
            target.amount = amount ? `NT$ ${Number(amount).toLocaleString()}` : 'NT$ 0';
            target.progress = progress;
            target.status = status;
            target.note = note;
            alert('✅ 案件資料已成功更新！');
        }
    } else {
        const newSeq = String(window.globalCasesData[year].length + 1).padStart(3, '0');
        const newId = `${year}-${newSeq}`;

        const newCase = {
            id: newId,
            client: client || name.split(' ')[0] || '未具名客戶',
            name: name,
            service: service || '地政士',
            amount: amount ? `NT$ ${Number(amount).toLocaleString()}` : 'NT$ 0',
            progress: progress || '潛在',
            status: status || '案件評估',
            note: note
        };

        window.globalCasesData[year].unshift(newCase);
        alert(`✨ 成功新增案件：(${newId})！`);
    }

    if (typeof window.saveCasesData === 'function') {
        window.saveCasesData(window.globalCasesData);
    }

    const modal = document.getElementById('editCaseModal');
    if (modal) modal.classList.add('hidden');

    if (typeof window.renderYearManagementView === 'function') {
        window.renderYearManagementView(year);
    }
}

window.openAddCaseModal = openAddCaseModal;
window.saveEditedCaseData = saveEditedCaseData;

console.log('Ruili 案件新增／編輯模組 (case-edit.js) 已成功載入！');
