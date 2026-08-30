   /**
 * 開啟集團案件完整建檔與評估中心（八大區塊彈窗）
 */
export function openAddCaseModal(year = '2026') {
    const yearInput = document.getElementById('edit-case-year');
    const idInput = document.getElementById('edit-case-id');
    
    if (yearInput) yearInput.value = year;
    if (idInput) idInput.value = ''; // 留空代表新增模式

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
 * 儲存新增或編輯後的案件資料（保留您原本完整的編輯與新增邏輯）
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

    // 欄位防呆驗證
    if (!name) {
        alert('⚠️ 欄位不完整：請填寫「案件名稱」！');
        return;
    }

    // 確保全域資料結構存在
    if (typeof window.globalCasesData === 'undefined') {
        window.globalCasesData = {};
    }
    if (!window.globalCasesData[year]) {
        window.globalCasesData[year] = [];
    }

    if (caseId) {
        // 編輯模式
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
        // 新增模式：自動產生流水編號
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

    // 儲存至資料同步模組（LocalStorage 持久化）
    if (typeof window.saveCasesData === 'function') {
        window.saveCasesData(window.globalCasesData);
    }

    // 關閉彈窗
    const modal = document.getElementById('editCaseModal');
    if (modal) modal.classList.add('hidden');

    // 即時重新整理當前年度視圖
    if (typeof window.renderYearManagementView === 'function') {
        window.renderYearManagementView(year);
    }
}

// 綁定到 window 物件以確保 HTML 中的 onclick 能夠直接呼叫
window.openAddCaseModal = openAddCaseModal;
window.saveEditedCaseData = saveEditedCaseData;

console.log('Ruili 案件新增／編輯模組 (case-edit.js) 已成功載入！');
