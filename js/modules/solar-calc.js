// js/modules/solar-calc.js

window.openSolarModal = function() {
    const modal = document.getElementById('solar-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
    if (typeof window.calculateSolarAll === 'function') {
        window.calculateSolarAll();
    }
};

window.closeSolarModal = function() {
    const modal = document.getElementById('solar-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};

window.calculateSolarAll = function() {
    // 1. 取得基本評估輸入值
    const roofPing = parseFloat(document.getElementById('solar-roof-ping')?.value || 0);
    const taipowerPrice = parseFloat(document.getElementById('solar-taipower-price')?.value || 4.5);
    const factoryElecPrice = parseFloat(document.getElementById('solar-factory-elec-price')?.value || 0);
    
    // 2. 估算區塊計算 (二、估算)
    // 每日發電度數 = (屋頂坪數 / 1.5) * (590 / 1000) * 4
    const dailyGen = (roofPing / 1.5) * (590 / 1000) * 4;
    const monthlyGen = dailyGen * 30;
    const annualGen = dailyGen * 365;
    const annualRev = annualGen * taipowerPrice;
    const monthlyRev = annualRev / 12;
    const rentRev = annualRev * 0.15; // 屋頂出租收益 (15%)

    // 填入估算結果 (修正原先隱含的異常字元，改回標準英文)
    setSolarText('res-solar-daily-gen', `${dailyGen.toFixed(1)} 度`);
    setSolarText('res-solar-monthly-gen', `${Math.round(monthlyGen).toLocaleString()} 度`);
    setSolarText('res-solar-annual-gen', `${Math.round(annualGen).toLocaleString()} 度`);
    setSolarText('res-solar-monthly-rev', `NT$ ${Math.round(monthlyRev).toLocaleString()}`);
    setSolarText('res-solar-annual-rev', `NT$ ${Math.round(annualRev).toLocaleString()}`);
    setSolarText('res-solar-rent-rev', `NT$ ${Math.round(rentRev).toLocaleString()}`);

    // 3. 精算試算區塊計算 (三、精算試算)
    const panelCount = parseFloat(document.getElementById('solar-panel-count')?.value || 0);
    const panelWatt = parseFloat(document.getElementById('solar-panel-watt')?.value || 590);
    
    // 若有填寫模組數量與瓦數，可優先以精算為主，若無則連動房產屋頂
    const calcAnnualGen = panelCount > 0 ? (panelCount * panelWatt / 1000 * 3.8 * 365) : annualGen;
    const calcAnnualRev = calcAnnualGen * taipowerPrice;
    const calcB = calcAnnualRev * 0.06; // 6% 每年回饋

    // C. 廠房租金收益
    const rentPing = parseFloat(document.getElementById('solar-rent-ping')?.value || 0);
    const rentUnitPrice = parseFloat(document.getElementById('solar-rent-unit-price')?.value || 0);
    const calcC = rentPing * rentUnitPrice * 12; // 每年租金收益

    // D. 綠電園區
    const greenPrice = parseFloat(document.getElementById('solar-green-price')?.value || 5);
    const calcD = calcAnnualGen * greenPrice;

    // 總收益 (A + B + C + D)
    const totalRev = calcAnnualRev + calcB + calcC + calcD;

    setSolarText('res-solar-calc-a', `NT$ ${Math.round(calcAnnualRev).toLocaleString()}`);
    setSolarText('res-solar-calc-b', `NT$ ${Math.round(calcB).toLocaleString()}`);
    setSolarText('res-solar-calc-c', `NT$ ${Math.round(calcC).toLocaleString()}`);
    setSolarText('res-solar-calc-d', `NT$ ${Math.round(calcD).toLocaleString()}`);
    setSolarText('res-solar-total-rev', `NT$ ${Math.round(totalRev).toLocaleString()}`);
};

// 輔助安全設定文字函式 (避免命名衝突，改名為 setSolarText)
function setSolarText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text;
}

console.log('太陽能精算試算模組 (solar-calc.js) 載入成功且已修復！');
