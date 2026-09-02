// js/main.js
import './modules/landBasic.js';
import './modules/registeredBuilding.js';
import './modules/unregisteredBuilding.js';
import './modules/land-change-calc.js';
import './modules/payment-calc.js';
import './modules/solar-calc.js';
import './modules/case-edit.js';

// 💡 確保這三個彈窗的開關 100% 能夠被 HTML 的 onclick 呼叫
window.openLandModal = function() {
    const modal = document.getElementById('land-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};
window.closeLandModal = function() {
    const modal = document.getElementById('land-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};

window.openRegisteredBuildingModal = function() {
    const modal = document.getElementById('registered-building-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};
window.closeRegisteredBuildingModal = function() {
    const modal = document.getElementById('registered-building-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};

window.openUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};
window.closeUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};
// 4. 太陽能試算 Modal 控制
window.openSolarModal = function() {
    const modal = document.getElementById('solar-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};
window.closeSolarModal = function() {
    const modal = document.getElementById('solar-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};

// 製造業每日用電參考表格切換
window.toggleSolarRefModal = function(show) {
    const modal = document.getElementById('solar-ref-modal');
    if (modal) {
        if (show) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        } else {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    }
};

// 5. 土地變更評估 Modal 控制
window.openLandChangeModal = function() {
    const modal = document.getElementById('land-change-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};
window.closeLandChangeModal = function() {
    const modal = document.getElementById('land-change-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};
console.log('Ruili 系統主程式 (main.js) 與所有模組已成功載入！');
