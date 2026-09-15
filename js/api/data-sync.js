/**
 * 睿立集團系統｜資料同步與 LocalStorage 持久化模組 (data-sync.js)
 */

const STORAGE_KEY = 'ruili_erp_cases_data_2026';

// 1. 純淨的初始資料結構（乾淨的空資料）
const emptyCasesData = {
    '2027': [],
    '2026': [],
    '2025': [],
    '2024': [],
    '2023': [],
    '2022': [],
    '2021': []
};

// 2. （可選）保留假資料備用，方便測試，但預設不寫入系統
const mockDemoCasesData = {
    '2027': [
        { id: '2027-01', name: '烏日區未來產業專區', client: '何董事長', service: '土地變更', progress: '評估中', amount: 'NT$ 3,000,000', note: '審查準備中', status: '案件評估' }
    ],
    '2026': [
        { id: '2026-01', name: '大雅區農地變更專案', client: '張先生', service: '農地變更', progress: '簽約中', amount: 'NT$ 2,500,000', note: '預計118通檢', status: '簽約案件' },
        { id: '2026-02', name: '烏日區工廠合法化', client: '黃董事長', service: '特定工廠專用區', progress: '評估中', amount: 'NT$ 2,070,000', note: '廠房打掉重蓋，太陽能自建', status: '案件評估' },
        { id: '2026-03', name: '潭子區綠能用地申設', client: '林總經理', service: '綠能申設', progress: '結案歸檔', amount: 'NT$ 1,500,000', note: '已完成全數審查', status: '結案中心' },
        { id: '2026-04', name: '西屯區資產配置顧問', client: '陳小姐', service: '資產顧問', progress: '失敗', amount: 'NT$ 0', note: '客戶端暫緩投資', status: '失敗案件' },
        { id: '2026-05', name: '北屯區土地重劃案', client: '王董', service: '土地重劃', progress: '廢件', amount: 'NT$ 0', note: '條件不符撤案', status: '廢件專區' }
    ],
    '2025': [
        { id: '2025-01', name: '潭子綠能廠房申設', client: '林總經理', service: '綠能申設', progress: '已結案', amount: 'NT$ 1,800,000', note: '完美結案', status: '結案中心' }
    ],
    '2024': [],
    '2023': [],
    '2022': [],
    '2021': []
};

// 載入資料（優先從 LocalStorage 讀取，若沒有則載入空結構）
function loadCasesData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('解析儲存資料失敗，還原預設空資料', e);
        }
    }
    // 預設載入空資料結構
    saveCasesData(emptyCasesData);
    return JSON.parse(JSON.stringify(emptyCasesData));
}

// 儲存資料到 LocalStorage
function saveCasesData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 3. 安全取得指定年份案件的 Helper 函式（防止前端讀到 undefined 白屏）
function getCasesByYear(year) {
    return (globalCasesData && globalCasesData[year]) ? globalCasesData[year] : [];
}

// 4. 提供一個「一鍵清空 / 恢復測試資料」的工具函式（開發生態用）
function resetToEmptyData() {
    localStorage.removeItem(STORAGE_KEY);
    globalCasesData = loadCasesData();
    location.reload(); // 重新整理頁面讓 UI 更新
}

function loadMockDataForTesting() {
    saveCasesData(mockDemoCasesData);
    globalCasesData = mockDemoCasesData;
    location.reload();
}

// 全域變數供系統調用
let globalCasesData = loadCasesData();
