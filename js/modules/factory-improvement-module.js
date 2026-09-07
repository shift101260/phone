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
                    <p class="text-xs text-stone-500 mt-0.5">特定工廠改善計畫名單查詢</p>
                </div>
                <div class="flex items-center space-x-2">
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
                        <span class="text-[10px] text-stone-400">共 0 筆紀錄</span>
                    </div>
                </div>

                <!-- 表格內容（支援手機左右滑動） -->
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
                        <tbody class="divide-y divide-stone-100 text-stone-700">
                            <tr>
                                <td colspan="5" class="p-12 text-center text-stone-400 text-xs">
                                    <i class="fa-solid fa-folder-open text-3xl mb-2 block text-stone-300"></i>
                                    目前尚無特定工廠改善計畫案件紀錄
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
};
