// js/main.js
import './modules/landBasic.js';
import './modules/registeredBuilding.js';
import './modules/unregisteredBuilding.js';
import './modules/land-change-calc.js';
import './modules/payment-calc.js';
import './modules/solar-calc.js';
import './modules/case-edit.js';

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

console.log('Ruili 系統主程式 (main.js) 與所有模組已成功載入！');
