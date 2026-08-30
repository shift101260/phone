// js/modules/case-edit.js

// 1. 開啟「新增案件」彈窗（清空欄位準備輸入）
window.openAddCaseModal = function(currentYear) {
    // 設定預設帶入的年度（如果有的話）
    document.getElementById('edit-case-year').value = currentYear || '2026';
    document.getElementById('edit-case-id').value = ''; // 空白代表新增
    
    // 清空輸入欄位
    document.getElementById('edit-case-client').value = '';
    document.getElementById('edit-case-name').value = '';
    document.getElementById('edit-case-service').value = '';
    document.getElementById('edit-case-amount').value = 'NT$ ';
    document.getElementById('edit-case-progress').value = '新案建立';
    document.getElementById('edit-case-status').value = '簽約案件'; // 預設進到簽約或評估
    document.getElementById('edit-case-note').value = '';

    // 修改彈窗標題為「新增」
    const titleEl = document.querySelector('#editCaseModal h3');
    if (titleEl) {
        titleEl.innerHTML = `<i class="fa-solid fa-circle-plus text-amber-400 mr-1.5"></i> 新增集團案件資料`;
    }

    // 顯示彈窗
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

    if (!client || !name || !service) {
        alert('⚠️ 欄位不完整：請填寫「客戶名稱」、「案件名稱」與「服務細項」！');
        return;
    }

    if (typeof globalCasesData === 'undefined') {
        window.globalCasesData = {};
    }
    if (!globalCasesData[year]) {
        globalCasesData[year] = [];
    }

    if (caseId) {
        // 編輯模式：更新現有案件
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
        // 新增模式：產生新編號並推入陣列
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

    // 如果有資料同步模組，進行儲存
    if (typeof saveCasesData === 'function') {
        saveCasesData(globalCasesData);
    }

    // 關閉彈窗
    document.getElementById('editCaseModal').classList.add('hidden');

    // 重新整理目前的年度視圖（如果畫面上有這個函式）
    if (typeof renderYearManagementView === 'function') {
        renderYearManagementView(year);
    }
};

console.log('Ruili 案件新增／編輯模組 (case-edit.js) 已載入！');
