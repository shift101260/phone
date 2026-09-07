// js/modules/factory-improvement-module.js
window.renderFactoryImprovementModule = function() {
    const container = document.getElementById('app-container');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-6 max-w-7xl mx-auto">
            <!-- 頁面標題列 -->
            <div class="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs gap-3">
                <div>
                    <h2 class="text-base font-bold text-stone-900 flex items-center space-x-2">
                        <i class="fa-solid fa-file-pdf text-amber-600"></i>
                        <span>工廠改善計畫查詢與管理模組</span>
                    </h2>
                    <p class="text-xs text-stone-500 mt-0.5">特定工廠改善計畫書 PDF 自動解析、前台智慧篩選與集團案件中心一鍵連動</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button type="button" onclick="switchModule('tools-module', document.querySelector('button[onclick*=\\'tools-module\\']'))" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition flex items-center space-x-1">
                        <i class="fa-solid fa-arrow-left text-[10px]"></i><span>返回工具專區</span>
                    </button>
                    <button type="button" onclick="alert('📤 【後台 PDF 自動解析】請上傳特定工廠改善計畫書 PDF，系統將自動解析並結構化寫入資料庫。')" class="px-3 py-1.5 bg-ruili-brand text-white rounded-xl text-xs font-bold hover:opacity-90 transition shadow-2xs flex items-center space-x-1">
                        <i class="fa-solid fa-upload text-[10px]"></i><span>上傳解析 PDF</span>
                    </button>
                </div>
            </div>

            <!-- 功能 2：前台即時智慧篩選介面 -->
            <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                    <label class="block text-[10px] font-bold text-stone-500 mb-1">關鍵字搜尋 (案名 / 廠名)</label>
                    <input type="text" id="factory-search-input" placeholder="輸入廠名、負責人或案號..." class="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-ruili-brand">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-stone-500 mb-1">審查進度狀態</label>
                    <select id="factory-status-select" class="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-ruili-brand">
                        <option value="">全部進度</option>
                        <option value="reviewing">改善計畫審查中</option>
                        <option value="approved">已核准通過</option>
                        <option value="closed">已結案歸檔</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-stone-500 mb-1">縣市別</label>
                    <select id="factory-city-select" class="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-ruili-brand">
                        <option value="">全部縣市</option>
                        <option value="KHH">高雄市</option>
                        <option value="TNN">臺南市</option>
                        <option value="PTH">屏東縣</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button type="button" onclick="alert('🔍 已依條件執行即時智慧篩選！')" class="w-full py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition shadow-2xs">
                        執行篩選
                    </button>
                </div>
            </div>

            <!-- 篩選結果與表格呈現 -->
            <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
                <div class="p-4 border-b border-stone-100 flex items-center justify-between">
                    <h3 class="font-bold text-xs text-stone-900 flex items-center space-x-1.5">
                        <i class="fa-solid fa-list-check text-sky-600"></i>
                        <span>特定工廠改善計畫清單與關聯檢視</span>
                    </h3>
                    <div class="flex items-center space-x-2">
                        <a href="https://www.cto.moea.gov.tw/FactoryMCLA/web/information/detail.php?cid=7&id=350" target="_blank" rel="noopener noreferrer" class="text-[11px] text-sky-600 hover:text-sky-800 font-bold flex items-center space-x-1">
                            <span>參考經濟部官方說明</span>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                        <span class="text-[10px] text-stone-400">共 2 筆紀錄</span>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="bg-stone-50 text-stone-500 border-b border-stone-200 text-[11px]">
                                <th class="p-3 font-bold">案件編號</th>
                                <th class="p-3 font-bold">廠名 / 負責人</th>
                                <th class="p-3 font-bold">所在地點</th>
                                <th class="p-3 font-bold">送件狀態</th>
                                <th class="p-3 font-bold text-right">功能操作與系統連動</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-100 text-stone-700">
                            <tr class="hover:bg-stone-50 transition">
                                <td class="p-3 font-mono font-bold text-stone-900">2026-002</td>
                                <td class="p-3">
                                    <div class="font-bold text-stone-900">黃總經理特定工廠專案</div>
                                    <div class="text-[10px] text-stone-400">特定工廠專用區</div>
                                </td>
                                <td class="p-3 text-stone-600">高雄市大寮區</td>
                                <td class="p-3">
                                    <span class="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[10px] font-bold">審查中</span>
                                </td>
                                <td class="p-3 text-right space-x-2">
                                    <button type="button" onclick="alert('📄 讀取 2026-002 PDF 解析內文與歷程紀錄')" class="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[10px] font-bold transition">
                                        檢視 PDF 摘要
                                    </button>
                                    <button type="button" onclick="switchModule('all-cases', document.querySelector('button[onclick*=\\'all-cases\\']')); alert('🔗 已成功一鍵連動至【集團案件完整建檔與評估中心】！')" class="px-2.5 py-1 bg-ruili-brand text-white rounded-lg text-[10px] font-bold hover:opacity-90 transition shadow-2xs">
                                        一鍵連動案件中心
                                    </button>
                                </td>
                            </tr>
                            <tr class="hover:bg-stone-50 transition">
                                <td class="p-3 font-mono font-bold text-stone-900">2026-001</td>
                                <td class="p-3">
                                    <div class="font-bold text-stone-900">林董事長農地變更專案</div>
                                    <div class="text-[10px] text-stone-400">土地變更</div>
                                </td>
                                <td class="p-3 text-stone-600">屏東縣內埔鄉</td>
                                <td class="p-3">
                                    <span class="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-bold">已核准</span>
                                </td>
                                <td class="p-3 text-right space-x-2">
                                    <button type="button" onclick="alert('📄 讀取 2026-001 PDF 解析內文與歷程紀錄')" class="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[10px] font-bold transition">
                                        檢視 PDF 摘要
                                    </button>
                                    <button type="button" onclick="switchModule('all-cases', document.querySelector('button[onclick*=\\'all-cases\\']')); alert('🔗 已成功一鍵連動至【集團案件完整建檔與評估中心】！')" class="px-2.5 py-1 bg-ruili-brand text-white rounded-lg text-[10px] font-bold hover:opacity-90 transition shadow-2xs">
                                        一鍵連動案件中心
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
};
