/**
 * 睿立集團系統｜收款期程自動換算模組 (payment-calc.js)
 */
function splitPaymentSchedule(totalAmount, stagesCount = 3) {
    let cleanAmount = typeof totalAmount === 'string' ? parseInt(totalAmount.replace(/[^0-9]/g, '')) : totalAmount;
    if (isNaN(cleanAmount)) cleanAmount = 0;

    if (stagesCount === 3) {
        return {
            p1: (cleanAmount * 0.3).toLocaleString(),
            p2: (cleanAmount * 0.3).toLocaleString(),
            p3: (cleanAmount * 0.4).toLocaleString()
        };
    } else {
        return {
            p1: (cleanAmount * 0.5).toLocaleString(),
            p2: (cleanAmount * 0.5).toLocaleString()
        };
    }
}
