window.openLandChangeModal = () => document.getElementById('land-change-modal').classList.remove('hidden');
window.closeLandChangeModal = () => document.getElementById('land-change-modal').classList.add('hidden');

window.calcPing = function(inputEl, outputId) {
    const val = parseFloat(inputEl.value || 0);
    document.getElementById(outputId).value = `${(val * 0.3025).toFixed(2)} 坪`;
};
