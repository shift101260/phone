window.openUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) modal.classList.remove('hidden');
};
window.closeUnregisteredBuildingModal = function() {
    const modal = document.getElementById('unregistered-building-modal');
    if (modal) modal.classList.add('hidden');
};
