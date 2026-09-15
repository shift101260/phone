// js/main.js

// 1. 導入子模組 (請確認這些檔案路徑均存在，若有尚未建立的模組可先註解)
import './modules/landBasic.js';
import './modules/registeredBuilding.js';
import './modules/unregisteredBuilding.js';
import './modules/land-change-calc.js';
import './modules/payment-calc.js';
import './modules/solar-calc.js';
import './modules/case-edit.js';
import './modules/tools-module.js';
import './modules/factory-improvement-module.js';

// 2. 核心：定義並掛載全域 switchModule (解決按鈕無反應與右側空白問題)
window.switchModule = function (moduleName, btnElement) {
    const container = document.getElementById('app-container');
    if (!container) return;

    // A. 高亮選單按鈕樣式切換
    if (btnElement) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('bg-ruili-brand', 'text-white', 'font-bold', 'shadow-xs');
            btn.classList.add('hover:bg-stone-800', 'text-stone-300');
        });
        btnElement.classList.remove('hover:bg-stone-800', 'text-stone-300');
        btnElement.classList.add('bg-ruili-brand', 'text-white', 'font-bold', 'shadow-xs');
    }

    // B. 根據模組名稱渲染右側主畫面內容
    switch (moduleName) {
        case 'dashboard':
            container.innerHTML = `
                <div class="space-y-6">
                    <h2 class="text-lg font-bold text-stone-800 flex items-center">
                        <i class="fa-solid fa-chart-line text-ruili-brand mr-2"></i> 戰情室總覽
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                            <span class="text-stone-500 text-xs block font-bold mb-1">進行中案件</span>
                            <span class="text-2xl font-bold font-mono text-stone-800">--</span>
                        </div>
                        <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                            <span class="text-stone-500 text-xs block font-bold mb-1">待簽核案件</span>
                            <span class="text-2xl font-bold font-mono text-amber-600">--</span>
                        </div>
                        <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                            <span class="text-stone-500 text-xs block font-bold mb-1">本月結案數</span>
                            <span class="text-2xl font-bold font-mono text-emerald-600">--</span>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'kanban':
            container.innerHTML = `
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-bold text-stone-800 flex items-center">
                            <i class="fa-solid fa-list-check text-amber-500 mr-2"></i> 工作看板
                        </h2>
                        <button onclick="openModal('editCaseModal')" class="px-3.5 py-1.5 bg-ruili-brand text-white rounded-xl text-xs font-bold shadow-2xs hover:opacity-90 transition">
                            <i class="fa-solid fa-plus mr-1"></i> 新增案件
                        </button>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs text-center text-stone-400 text-xs">
                        工作看板模組載入成功，請對接資料庫或動態資料。
                    </div>
                </div>
            `;
            break;

        case 'all-cases':
            container.innerHTML = `
                <div class="space-y-4">
                    <h2 class="text-lg font-bold text-stone-800 flex items-center">
                        <i class="fa-solid fa-layer-group text-amber-500 mr-2"></i> 全集團案件總覽
                    </h2>
                    <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs text-center text-stone-400 text-xs">
                        案件總覽模組載入成功。
                    </div>
                </div>
            `;
            break;

        case 'tools-module':
            container.innerHTML = `
                <div class="space-y-4">
                    <h2 class="text-lg font-bold text-stone-800 flex items-center">
                        <i class="fa-solid fa-toolbox text-sky-500 mr-2"></i> 工具專區
                    </h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <button onclick="openLandModal()" class="p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 font-bold text-xs text-stone-800 shadow-2xs flex flex-col items-center space-y-2">
                            <i class="fa-solid fa-map text-amber-600 text-xl"></i>
                            <span>土地基本資料</span>
                        </button>
                        <button onclick="openRegisteredBuildingModal()" class="p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 font-bold text-xs text-stone-800 shadow-2xs flex flex-col items-center space-y-2">
                            <i class="fa-solid fa-building text-sky-600 text-xl"></i>
                            <span>保存登記建物</span>
                        </button>
                        <button onclick="openLandChangeModal()" class="p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 font-bold text-xs text-stone-800 shadow-2xs flex flex-col items-center space-y-2">
                            <i class="fa-solid fa-earth-asia text-emerald-600 text-xl"></i>
                            <span>土地變更評估</span>
                        </button>
                        <button onclick="openSolarModal()" class="p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 font-bold text-xs text-stone-800 shadow-2xs flex flex-col items-center space-y-2">
                            <i class="fa-solid fa-solar-panel text-amber-500 text-xl"></i>
                            <span>太陽能試算</span>
                        </button>
                    </div>
                </div>
            `;
            break;

        default:
            container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                    <h2 class="text-base font-bold text-stone-800">${moduleName} 模組</h2>
                    <p class="text-xs text-stone-500">此模組尚未設定內容，請於 main.js 中進行擴充。</p>
                </div>
            `;
            break;
    }
};

// 3. 保留您原本的彈窗控制邏輯
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
        if (show) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        } else {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    }
}

// 4. 初始化預設載入「戰情室總覽」
document.addEventListener('DOMContentLoaded', () => {
    const defaultBtn = document.querySelector(".nav-btn");
    window.switchModule('dashboard', defaultBtn);
});

console.log('Ruili 系統主程式 (main.js) 與所有模組已成功載入！');
