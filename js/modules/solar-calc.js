/**
 * 睿立集團系統｜太陽能發電效益與精算模組 (solar-calc.js)
 */
function calculateSolarBenefit(panelAreaSqMeters, sunlightHoursPerDay = 3.5) {
    // 假設每平方公尺太陽能板約可產出 0.2kW 功率，每日發電量試算
    const kwOutput = panelAreaSqMeters * 0.2;
    const dailyKWh = kwOutput * sunlightHoursPerDay;
    const annualKWh = dailyKWh * 365;

    return {
        kwOutput: kwOutput.toFixed(2),
        dailyKWh: dailyKWh.toFixed(2),
        annualKWh: annualKWh.toFixed(2)
    };
}
