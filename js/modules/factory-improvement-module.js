// js/modules/factory-improvement-module.js
window.renderFactoryImprovementModule = function() {
    const container = document.getElementById('app-container');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-6 max-w-7xl mx-auto pb-12">
            <!-- 頁面標題列 -->
            <div class="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs gap-3">
                <div>
                    <h2 class="text-base font-bold text-stone-900 flex items-center space-x-2">
                        <i class="fa-solid fa-file-pdf text-amber-600"></i>
                        <span>工廠改善計畫名單</span>
                    </h2>
                    <p class="text-xs text-stone-500 mt-0.5">特定工廠改善計畫名單查詢與 PDF 匯入</p>
                </div>
                <div class="flex items-center space-x-2">
                    <!-- 上傳 PDF 按鈕 -->
                    <label class="px-3 py-1.5 bg-ruili-brand text-white rounded-xl text-xs font-bold hover:opacity-90 transition shadow-2xs flex items-center space-x-1 cursor-pointer">
                        <i class="fa-solid fa-upload text-[10px]"></i>
                        <span>上傳 PDF 匯入名單</span>
                        <input type="file" id="pdf-upload-input" accept=".pdf" class="hidden" onchange="handlePdfUpload(this)">
                    </label>
                    <button type="button" onclick="window.renderToolsModule()" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition flex items-center space-x-1">
                        <i class="fa-solid fa-arrow-left text-[10px]"></i><span>返回工具專區</span>
                    </button>
                </div>
            </div>

            <!-- 前台即時智慧篩選與表格整合區塊 -->
            <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden space-y-4">
                <!-- 搜尋列區域 -->
                <div class="p-4 border-b border-stone-100 flex flex-col lg:flex-row gap-3 items-end">
                    <div class="flex-1 w-full">
                        <label class="block text-[10px] font-bold text-stone-500 mb-1">關鍵字搜尋</label>
                        <div class="flex space-x-2">
                            <input type="text" id="factory-search-input" placeholder="輸入縣市、工廠名稱、廠址..." class="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-ruili-brand">
                            <button type="button" onclick="alert('🔍 已依條件執行即時智慧篩選！')" class="px-4 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition shadow-2xs shrink-0">
                                執行篩選
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 表格標題列 -->
                <div class="px-4 pb-2 flex items-center justify-between">
                    <h3 class="font-bold text-xs text-stone-900 flex items-center space-x-1.5">
                        <i class="fa-solid fa-list-check text-sky-600"></i>
                        <span>特定工廠改善計畫清單</span>
                    </h3>
                    <div class="flex items-center space-x-2">
                        <a href="https://www.cto.moea.gov.tw/FactoryMCLA/web/information/detail.php?cid=7&id=350" target="_blank" rel="noopener noreferrer" class="text-[11px] text-sky-600 hover:text-sky-800 font-bold flex items-center space-x-1">
                            <span>參考經濟部官方說明</span>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                        <span id="record-count" class="text-[10px] text-stone-400">共 0 筆紀錄</span>
                    </div>
                </div>

                <!-- 表格內容 -->
                <div class="overflow-x-auto border-t border-stone-100">
                    <table class="w-full min-w-[750px] text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-stone-50 text-stone-500 border-b border-stone-200 text-[11px]">
                                <th class="p-3 font-bold whitespace-nowrap">編號</th>
                                <th class="p-3 font-bold whitespace-nowrap">縣市</th>
                                <th class="p-3 font-bold whitespace-nowrap">工廠名稱</th>
                                <th class="p-3 font-bold whitespace-nowrap">廠址</th>
                                <th class="p-3 font-bold text-right whitespace-nowrap">功能操作與系統連動</th>
                            </tr>
                        </thead>
                        <tbody id="factory-table-body" class="divide-y divide-stone-100 text-stone-700">
                            <tr>
                                <td colspan="5" class="p-12 text-center text-stone-400 text-xs">
                                    <i class="fa-solid fa-folder-open text-3xl mb-2 block text-stone-300"></i>
                                    目前尚無特定工廠改善計畫案件紀錄，請點選右上角「上傳 PDF 匯入名單」
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
};

// 處理 PDF 上傳與模擬解析的函式
window.handlePdfUpload = function(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        alert(`📂 已成功選取檔案：${file.name}\n系統正在進行自動解析，即將帶入清單！`);
        
        // 這裡模擬從 PDF 解析後寫入清單的測試資料
        const tbody = document.getElementById('factory-table-body');
        const countSpan = document.getElementById('record-count');
        
        if (tbody) {
            tbody.innerHTML = `
                <tr class="hover:bg-stone-50 transition">
                    <td class="p-3 font-mono font-bold text-stone-900 whitespace-nowrap">2026-PDF-01</td>
                    <td class="p-3 whitespace-nowrap">高雄市</td>
                    <td class="p-3 font-bold text-stone-900 whitespace-nowrap">立新金屬工業股份有限公司</td>
                    <td class="p-3 text-stone-600">高雄市大寮區光華路 12 號</td>
                    <td class="p-3 text-right space-x-2 whitespace-nowrap">
                        <button type="button" onclick="alert('📄 檢視 ${file.name} 解析摘要')" class="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[10px] font-bold transition">
                            檢視摘要
                        </button>
                        <button type="button" onclick="alert('🔗 已成功一鍵連動至【集團案件完整建檔與評估中心】！')" class="px-2.5 py-1 bg-ruili-brand text-white rounded-lg text-[10px] font-bold hover:opacity-90 transition shadow-2xs">
                            一鍵連動案件中心
                        </button>
                    </td>
                </tr>
            `;
            if (countSpan) countSpan.textContent = "共 1 筆紀錄";
        }
    }
};
