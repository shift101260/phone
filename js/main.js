// js/main.js
import './modules/landBasic.js';
import './modules/registeredBuilding.js';
import './modules/unregisteredBuilding.js';
import './modules/land-change-calc.js';
import './modules/payment-calc.js';
import './modules/solar-calc.js';
import './modules/case-edit.js';
import './modules/tools-module.js';
import './modules/factory-improvement-module.js';

// 💡 確保所有彈窗開關 100% 能夠被 HTML 的 onclick 呼叫
window.openLandModal = () => toggleModal('land-modal', true);
window.closeLandModal = () => toggleModal('land-modal', false);

window.openRegisteredBuildingModal = () => toggleModal('registered-building-modal', true);
window.closeRegisteredBuildingModal = () => toggleModal('registered-building-modal', false);

window.openUnregisteredBuildingModal = () => toggleModal('unregistered-building-modal', true);
window.closeUnregisteredBuildingModal = () => toggleModal('unregistered-building-modal', false);

window.openSolarModal = () => toggleModal('solar-modal', true);
window.closeSolarModal = () => toggleModal('solar-modal', false);

window.toggleSolarRefModal = (show) => toggleModal('solar-ref-modal', show);

window.openLandChangeModal = () => toggleModal('land-change-modal', true);
window.closeLandChangeModal = () => toggleModal('land-change-modal', false);

// 共用切換顯示函式
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (show) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        } else {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    }
}

// ----------------------------------------------------
// 🚀 新增：全域模組切換與畫面渲染邏輯 (修復按鈕無反應與空白問題)
// ----------------------------------------------------
window.switchModule = function(moduleName, btnElement) {
    // 1. 更新側邊欄按鈕高亮狀態
    if (btnElement) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-ruili-brand', 'text-white', 'shadow-xs', 'font-bold');
            btn.classList.add('hover:bg-stone-800', 'text-stone-300');
        });
        btnElement.classList.remove('hover:bg-stone-800', 'text-stone-300');
        btnElement.classList.add('bg-ruili-brand', 'text-white', 'shadow-xs', 'font-bold');
    }

    // 2. 渲染右側 app-container 內容
    const container = document.getElementById('app-container');
    if (!container) return;

    // 根據點擊的模組名稱切換不同畫面
    switch (moduleName) {
        case 'dashboard':
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h2 class="text-lg font-bold text-stone-800 mb-2">戰情室總覽</h2>
                    <p class="text-xs text-stone-500">歡迎使用睿立集團 ERP 營運管理系統。</p>
                </div>
            `;
            break;

        case 'kanban':
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h2 class="text-lg font-bold text-stone-800 mb-2">工作看板</h2>
                    <p class="text-xs text-stone-500">目前執行中案件與待辦事項。</p>
                </div>
            `;
            break;

        case 'all-cases':
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h2 class="text-lg font-bold text-stone-800 mb-2">全集團案件總覽</h2>
                    <p class="text-xs text-stone-500">包含所有年度與進度之總表。</p>
                </div>
            `;
            break;

        case 'tools-module':
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h2 class="text-lg font-bold text-stone-800 mb-2">工具專區</h2>
                    <p class="text-xs text-stone-500">各式試算工具與評估清單。</p>
                </div>
            `;
            break;

        case 'closing':
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h2 class="text-lg font-bold text-stone-800 mb-2">結案中心</h2>
                    <p class="text-xs text-stone-500">階段性請款與結案公文審核。</p>
                </div>
            `;
            break;

        case 'quotation':
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h2 class="text-lg font-bold text-stone-800 mb-2">支出自填</h2>
                    <p class="text-xs text-stone-500">專案支出與費用填報系統。</p>
                </div>
            `;
            break;

        default:
            // 處理年度案件（如 year-2026, year-2025 等）
            if (moduleName.startsWith('year-')) {
                const year = moduleName.replace('year-', '');
                container.innerHTML = `
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                        <h2 class="text-lg font-bold text-stone-800 mb-2">${year} 年度案件管理</h2>
                        <p class="text-xs text-stone-500">檢視與管理 ${year} 年度的所有案件紀錄。</p>
                    </div>
                `;
            } else {
                container.innerHTML = `<div class="p-6 text-xs text-stone-500">未知的模組：${moduleName}</div>`;
            }
            break;
    }
};

// 初始化載入預設頁面 (戰情室總覽)
document.addEventListener('DOMContentLoaded', () => {
    const defaultBtn = document.querySelector("button[onclick*='dashboard']");
    window.switchModule('dashboard', defaultBtn);
});

console.log('Ruili 系統主程式 (main.js) 與所有模組已成功載入！');
