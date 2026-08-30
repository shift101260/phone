// js/modules/case-edit.js

// 1. 開啟「新增案件」彈窗（自動帶入年度並清空欄位）
window.openAddCaseModal = function(currentYear) {
    document.getElementById('edit-case-year').value = currentYear || '2026';
    document.getElementById('edit-case-id').value = ''; // 空白代表新增模式
    
    // 初始化預設值與清空輸入框
    document.getElementById('edit-case-client').value = '';
    document.getElementById('edit-case-name').value = '';
    document.getElementById('edit-case-service').value = '';
    document.getElementById('edit-case-amount').value = 'NT$ ';
    document.getElementById('edit-case-progress').value = '新案建立';
    document.getElementById('edit-case-status').value = '簽約案件';
    document.getElementById('edit-case-note').value = '';

    // 設定彈窗標題與圖示
    const titleEl = document.querySelector('#editCaseModal h3');
    if (titleEl) {
        titleEl.innerHTML = `<i class="fa-solid fa-circle-plus text-amber-400 mr-1.5"></i> 新增集團案件資料`;
    }

    // 顯示精美彈窗
    document.getElementById('editCaseModal').classList.remove('hidden');
};

// 2. 儲存新增或編輯的案件資料
window.saveEditedCaseData = function() {
    const year = document.getElementById('edit-case-year').value || '2026';
    const caseId = document.getElementById('edit-case-id').value;
    
    const client = document.getElementById('edit-case-client').value.trim();
    const name = document.getElementById('edit-case-name').value.trim();
    const service = document.getElementById('edit-case-service').value.trim();
    const amount = document.getElementById('edit-case-amount').value.trim();
    const progress = document.getElementById('edit-case-progress').value.trim();
    const status = document.getElementById('edit-case-status').value;
    const note = document.getElementById('edit-case-note').value.trim();

    // 欄位防呆驗證
    if (!client || !name || !service) {
        alert('⚠️ 欄位不完整：請填寫「客戶名稱」、「案件名稱」與服務細項！');
        return;
    }

    // 確保全域資料結構存在
    if (typeof globalCasesData === 'undefined') {
        window.globalCasesData = {};
    }
    if (!globalCasesData[year]) {
        globalCasesData[year] = [];
    }

    if (caseId) {
        // 編輯模式
        let target = globalCasesData[year].find(c => c.id === caseId);
        if (target) {
            target.client = client;
            target.name = name;
            target.service = service;
            target.amount = amount;
            target.progress = progress;
            target.status = status;
            target.note = note;
            alert('✅ 案件資料已成功更新！');
        }
    } else {
        // 新增模式：自動產生流水編號 (例如 2026-004)
        const newSeq = String(globalCasesData[year].length + 1).padStart(3, '0');
        const newId = `${year}-${newSeq}`;

        const newCase = {
            id: newId,
            client: client,
            name: name,
            service: service,
            amount: amount || 'NT$ 0',
            progress: progress || '新案建立',
            status: status || '簽約案件',
            note: note
        };

        globalCasesData[year].push(newCase);
        alert(`✨ 成功新增案件：${client} (${newId})！`);
    }

    // 儲存至資料同步模組（LocalStorage 持久化）
    if (typeof saveCasesData === 'function') {
        saveCasesData(globalCasesData);
    }

    // 關閉彈窗
    document.getElementById('editCaseModal').classList.add('hidden');

    // 即時重新整理當前年度視圖
    if (typeof renderYearManagementView === 'function') {
        renderYearManagementView(year);
    }
};

console.log('Ruili 案件新增／編輯模組 (case-edit.js) 已成功載入！');
