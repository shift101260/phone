// js/modules/registered-building.js
window.openRegisteredBuildingModal = function() {
    const modal = document.getElementById('editCaseModal');
    if (modal) modal.classList.remove('hidden');
};
window.closeRegisteredBuildingModal = function() {
    const modal = document.getElementById('editCaseModal');
    if (modal) modal.classList.add('hidden');
};
