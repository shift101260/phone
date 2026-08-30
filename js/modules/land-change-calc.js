/**
 * 睿立集團系統｜土地變更與回饋金試算模組 (land-change-calc.js)
 */
function calculateLandChangeFee(landAreaPing,公告現值PerPing) {
    const totalValue = landAreaPing * 公告現值PerPing;
    // 依通常法規比例試算回饋金 (例如 5%)
    const feedbackFee = totalValue * 0.05;

    return {
        totalValue: totalValue.toLocaleString(),
        feedbackFee: feedbackFee.toLocaleString()
    };
}
