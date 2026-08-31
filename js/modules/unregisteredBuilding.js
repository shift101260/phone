// js/modules/unregistered-building.js
window.openUnregisteredBuildingModal = function() {
    const modal = document.getElementById('editCaseModal');
    if (modal) modal.classList.remove('hidden');
};
window.closeUnregisteredBuildingModal = function() {
    const modal = document.getElementById('editCaseModal');
    if (modal) modal.classList.add('hidden');
};
