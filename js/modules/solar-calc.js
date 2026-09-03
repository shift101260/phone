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
    
    // ==========================================
    // 2. 估算區塊計算 (二、估算 - 初次拜訪粗估)
    // ==========================================
    const dailyGen = (roofPing / 1.5) * (590 / 1000) * 4;
    const monthlyGen = dailyGen * 30;
    const annualGen = dailyGen * 365;
    
    // 每年發電收益
    const annualRev = annualGen * taipowerPrice;
    const monthlyRev = annualRev / 12;

    // 1. 台製模組 6% 每年回饋 = 每年發電收益 * 0.06
    const estB = annualRev * 0.06;

    // 2. 廠房租金收益 (估算用) = 坪數 * 附近實價登錄單價 * 12
    const estRentPing = parseFloat(document.getElementById('solar-est-rent-ping')?.value || 0);
    const estRentUnitPrice = parseFloat(document.getElementById('solar-est-rent-unit-price')?.value || 0);
    const estC = estRentPing * estRentUnitPrice * 12;

    // 3. 綠電收益 = 每度價格(自填) * 每年發電度數
    const estGreenPrice = parseFloat(document.getElementById('solar-est-green-price')?.value || 5);
    const estD = annualGen * estGreenPrice;

    // 4. 預估發電收益 (總收益) = 每年發電收益 + 6%回饋 + 廠房租金 + 綠電收益
    const estTotalRev = annualRev + estB + estC + estD;

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
    // 3. 精算試算區塊計算 (三、精算試算 - 現勘後使用)
    // ==========================================
    const panelCount = parseFloat(document.getElementById('solar-panel-count')?.value || 0);
    const panelWatt = parseFloat(document.getElementById('solar-panel-watt')?.value || 590);
    
    const calcAnnualGen = panelCount > 0 ? (panelCount * panelWatt / 1000 * 3.8 * 365) : annualGen;
    const calcAnnualRev = calcAnnualGen * taipowerPrice;
    const calcB = calcAnnualRev * 0.06; // 6% 每年回饋

    const rentPing = parseFloat(document.getElementById('solar-rent-ping')?.value || 0);
    const rentUnitPrice = parseFloat(document.getElementById('solar-rent-unit-price')?.value || 0);
    const calcC = rentPing * rentUnitPrice * 12; // 每年租金收益

    const greenPrice = parseFloat(document.getElementById('solar-green-price')?.value || 5);
    const calcD = calcAnnualGen * greenPrice;

    const totalRev = calcAnnualRev + calcB + calcC + calcD;

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

console.log('太陽能精算試算模組 (solar-calc.js) 估算與精算完整連動版載入成功！');
