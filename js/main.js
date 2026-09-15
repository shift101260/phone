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

// 💡 全域彈窗控制
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

function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden', !show);
        modal.style.display = show ? 'flex' : 'none';
    }
}

// ----------------------------------------------------
// 🚀 完整工作看板與角色簽核流程渲染
// ----------------------------------------------------
window.switchModule = function(moduleName, btnElement) {
    if (btnElement) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-ruili-brand', 'text-white', 'shadow-xs', 'font-bold');
            btn.classList.add('hover:bg-stone-800', 'text-stone-300');
        });
        btnElement.classList.remove('hover:bg-stone-800', 'text-stone-300');
        btnElement.classList.add('bg-ruili-brand', 'text-white', 'shadow-xs', 'font-bold');
    }

    const container = document.getElementById('app-container');
    if (!container) return;

    if (moduleName === 'kanban') {
        renderKanbanView(container);
    } else if (moduleName === 'dashboard') {
        container.innerHTML = `
            <div class="bg-white p-6 rounded-2xl shadow-xs border border-stone-200">
                <h2 class="text-base font-bold text-stone-800 mb-1"><i class="fa-solid fa-chart-line text-ruili-brand mr-2"></i>戰情室總覽</h2>
                <p class="text-xs text-stone-500">歡迎使用睿立集團 ERP 營運管理系統。</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="bg-white p-6 rounded-2xl shadow-xs border border-stone-200">
                <h2 class="text-base font-bold text-stone-800 mb-1">${moduleName} 模組</h2>
                <p class="text-xs text-stone-500">此頁面載入成功。</p>
            </div>
        `;
    }
};

// 渲染工作看板（包含秘書簽核與評估入口）
function renderKanbanView(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <!-- 上方標題與新增案件按鈕 -->
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-base font-bold text-stone-800 flex items-center">
                        <i class="fa-solid fa-list-check text-amber-500 mr-2"></i>工作看板與角色簽核
                    </h2>
                    <p class="text-xs text-stone-500">管理集團案件進度、簽核流程與動態評估</p>
                </div>
                <button onclick="openModal('editCaseModal')" class="px-4 py-2 bg-ruili-brand hover:opacity-90 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5 cursor-pointer">
                    <i class="fa-solid fa-plus"></i><span>＋ 新增案件建檔</span>
                </button>
            </div>

            <!-- 角色簽核工作流區塊 -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                <!-- 秘書簽核 -->
                <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span class="font-bold text-xs text-stone-800 flex items-center">
                            <i class="fa-solid fa-user-pen text-amber-500 mr-1.5"></i>秘書簽核
                        </span>
                        <span class="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold">待處理</span>
                    </div>
                    <p class="text-[11px] text-stone-500 leading-relaxed">負責合約初審、客戶基本資料建檔與簽核派單。</p>
                    <button onclick="openModal('pendingListModal')" class="w-full py-2 bg-stone-100 hover:bg-amber-500 hover:text-white text-stone-700 rounded-xl text-xs font-bold transition">
                        檢視待簽核清單
                    </button>
                </div>

                <!-- 特助簽核 -->
                <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span class="font-bold text-xs text-stone-800 flex items-center">
                            <i class="fa-solid fa-user-tie text-sky-500 mr-1.5"></i>特助流程
                        </span>
                        <span class="px-2 py-0.5 bg-sky-50 text-sky-700 rounded-full text-[10px] font-bold">進行中</span>
                    </div>
                    <p class="text-[11px] text-stone-500 leading-relaxed">跨部門資源協調、專案排程控管與現場勘查。</p>
                    <button onclick="openModal('activeCasesListModal')" class="w-full py-2 bg-stone-100 hover:bg-sky-500 hover:text-white text-stone-700 rounded-xl text-xs font-bold transition">
                        檢視執行中案件
                    </button>
                </div>

                <!-- 地政士處理 -->
                <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span class="font-bold text-xs text-stone-800 flex items-center">
                            <i class="fa-solid fa-landmark text-emerald-500 mr-1.5"></i>地政士審查
                        </span>
                        <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold">法規評估</span>
                    </div>
                    <p class="text-[11px] text-stone-500 leading-relaxed">土地變更審查、特定工廠登記與容許使用評估。</p>
                    <button onclick="openModal('editCaseModal')" class="w-full py-2 bg-stone-100 hover:bg-emerald-600 hover:text-white text-stone-700 rounded-xl text-xs font-bold transition">
                        進入土地評估
                    </button>
                </div>

                <!-- 財務長對帳 -->
                <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span class="font-bold text-xs text-stone-800 flex items-center">
                            <i class="fa-solid fa-calculator text-purple-500 mr-1.5"></i>財務長核銷
                        </span>
                        <span class="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold">階段請款</span>
                    </div>
                    <p class="text-[11px] text-stone-500 leading-relaxed">各期請款比例試算、發票開立與支出費用稽核。</p>
                    <button onclick="openModal('pendingClosingListModal')" class="w-full py-2 bg-stone-100 hover:bg-purple-600 hover:text-white text-stone-700 rounded-xl text-xs font-bold transition">
                        請款與公文審查
                    </button>
                </div>

                <!-- 品牌長與結案 -->
                <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span class="font-bold text-xs text-stone-800 flex items-center">
                            <i class="fa-solid fa-award text-rose-500 mr-1.5"></i>結案歸檔
                        </span>
                        <span class="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-bold">報告匯出</span>
                    </div>
                    <p class="text-[11px] text-stone-500 leading-relaxed">專案成果彙整、PDF 結案報告產出與顧客滿意度。</p>
                    <button onclick="openModal('pdfModal')" class="w-full py-2 bg-stone-100 hover:bg-rose-600 hover:text-white text-stone-700 rounded-xl text-xs font-bold transition">
                        結案報告預覽
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 頁面初始化
document.addEventListener('DOMContentLoaded', () => {
    const kanbanBtn = document.querySelector("button[onclick*='kanban']");
    window.switchModule('kanban', kanbanBtn);
});

console.log('Ruili 系統主程式 (main.js) 與工作看板模組已成功載入！');
