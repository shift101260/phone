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
    // ==========================================
    // 1. 二、估算區塊計算 (初次拜訪粗估)
    // ==========================================
    const roofPing = parseFloat(document.getElementById('solar-roof-ping')?.value || 0);
    const taipowerPrice = parseFloat(document.getElementById('solar-taipower-price')?.value || 4.5);
    
    // 每日發電度數 = (屋頂坪數 / 1.5) * (590 / 1000) * 4
    const dailyGen = (roofPing / 1.5) * (590 / 1000) * 4;
    const monthlyGen = dailyGen * 30;
    const annualGen = dailyGen * 365;
    
    const annualRev = annualGen * taipowerPrice;
    const monthlyRev = annualRev / 12;

    // 1. 台製模組 6% 每年回饋 = 每年發電收益 * 0.06
    const estB = annualRev * 0.06;

    // 2. 廠房租金收益 (估算用) = 坪數 * 附近實價登錄單價 * 12
    const estRentPing = parseFloat(document.getElementById('solar-est-rent-ping')?.value || 0);
    const estRentUnitPrice = parseFloat(document.getElementById('solar-est-rent-unit-price')?.value || 0);
    const estC = estRentPing * estRentUnitPrice * 12;

    // 3. 綠電收益 = 每度價格(自填) * 每年發電度數
    const estGreenPrice = parseFloat(document.getElementById('solar-est-green-price')?.value || 0);
    const estD = annualGen * estGreenPrice;

    // 4. 預估總收益：預設為 每年發電收益 + 6%回饋，若有填寫廠房租金或綠電才動態累加
    let estTotalRev = annualRev + estB;
    if (estC > 0) estTotalRev += estC;
    if (estD > 0) estTotalRev += estD;

    // 填入估算區結果
    setSolarText('res-solar-daily-gen', `${dailyGen.toFixed(1)} 度`);
    setSolarText('res-solar-monthly-gen', `${Math.round(monthlyGen).toLocaleString()} 度`);
    setSolarText('res-solar-annual-gen', `${Math.round(annualGen).toLocaleString()} 度`);
    setSolarText('res-solar-monthly-rev', `NT$ ${Math.round(monthlyRev).toLocaleString()}`);
    setSolarText('res-solar-annual-rev', `NT$ ${Math.round(annualRev).toLocaleString()}`);
    setSolarText('res-solar-est-b', `NT$ ${Math.round(estB).toLocaleString()}`);
    setSolarText('res-solar-est-c', `NT$ ${Math.round(estC).toLocaleString()}`);
    setSolarText('res-solar-est-d', `NT$ ${Math.round(estD).toLocaleString()}`);
    setSolarText('res-solar-est-total', `NT$ ${Math.round(estTotalRev).toLocaleString()}`);


    // ==========================================
    // 2. 三、精算試算區塊計算 (現勘後使用)
    // ==========================================
    const panelCount = parseFloat(document.getElementById('solar-panel-count')?.value || 0);
    const panelWatt = parseFloat(document.getElementById('solar-panel-watt')?.value || 590);
    
    // 精算每年發電收益公式：片數 * 每瓦 / 1000 * 4 * 365 * 台電售電價格
    const calcAnnualGen = panelCount > 0 ? (panelCount * panelWatt / 1000 * 4 * 365) : 0;
    const calcAnnualRev = calcAnnualGen * taipowerPrice;
    const calcB = calcAnnualRev * 0.06; // 6% 每年回饋

    const rentPing = parseFloat(document.getElementById('solar-rent-ping')?.value || 0);
    const rentUnitPrice = parseFloat(document.getElementById('solar-rent-unit-price')?.value || 0);
    const calcC = rentPing * rentUnitPrice * 12; // 每年租金收益

    const greenPrice = parseFloat(document.getElementById('solar-green-price')?.value || 0);
    const calcD = calcAnnualGen * greenPrice; // 精算綠電收益

    let totalRev = calcAnnualRev + calcB;
    if (calcC > 0) totalRev += calcC;
    if (calcD > 0) totalRev += calcD;

    setSolarText('res-solar-calc-a', `NT$ ${Math.round(calcAnnualRev).toLocaleString()}`);
    setSolarText('res-solar-calc-b', `NT$ ${Math.round(calcB).toLocaleString()}`);
    setSolarText('res-solar-calc-c', `NT$ ${Math.round(calcC).toLocaleString()}`);
    setSolarText('res-solar-calc-d', `NT$ ${Math.round(calcD).toLocaleString()}`);
    setSolarText('res-solar-total-rev', `NT$ ${Math.round(totalRev).toLocaleString()}`);
};

// 輔助安全設定文字函式
function setSolarText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text;
}

console.log('太陽能試算模組 (solar-calc.js) 完整連動修正版載入成功！');
