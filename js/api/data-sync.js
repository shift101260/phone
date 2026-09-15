/**
 * 睿立集團系統｜資料同步與 LocalStorage 持久化模組 (data-sync.js)
 */

const STORAGE_KEY = 'ruili_erp_cases_data_2026';

// 預設初始資料（乾淨的空狀態，無任何假案例）
const defaultCasesData = {
    '2027': [],
    '2026': [],
    '2025': [],
    '2024': [],
    '2023': [],
    '2022': [],
    '2021': []
};

// 載入資料（優先從 LocalStorage 讀取）
function loadCasesData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('解析儲存資料失敗，還原預設值', e);
        }
    }
    // 若沒有則寫入預設值
    saveCasesData(defaultCasesData);
    return JSON.parse(JSON.stringify(defaultCasesData));
}

// 儲存資料到 LocalStorage
function saveCasesData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 全域變數供系統調用
let globalCasesData = loadCasesData();
