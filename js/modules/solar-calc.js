window.openSolarModal = function() {
    document.getElementById('solar-modal').classList.remove('hidden');
    window.calculateSolarAll();
};

window.closeSolarModal = () => document.getElementById('solar-modal').classList.add('hidden');

window.calculateSolarAll = function() {
    const roofPing = parseFloat(document.getElementById('solar-roof-ping').value || 0);
    const taipowerPrice = parseFloat(document.getElementById('solar-taipower-price').value || 0);
    const dailyGen = (roofPing / 1.5) * (590 / 1000) * 4;
    const monthlyGen = dailyGen * 30;
    const annualGen = dailyGen * 365;
    const annualRev = annualGen * taipowerPrice;

    document.getElementById('res-solar-daily-gen').textContent = `${dailyGen.toFixed(1)} 度`;
    document.getElementById('res-solar-monthly-gen').textContent = `${Math.round(monthlyGen).toLocaleString()} 度`;
    document.getElementById('res-solar-annual-rev').textContent = `NT$ ${Math.round(annualRev).toLocaleString()}`;
};
