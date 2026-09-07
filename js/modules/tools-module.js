// js/modules/tools-module.js
window.renderToolsModule = function() {
    const container = document.getElementById('app-container');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-8 max-w-7xl mx-auto pb-12">
            <!-- 頁面標題列 -->
            <div class="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs gap-4">
                <div>
                    <h2 class="text-lg font-bold text-stone-900 flex items-center space-x-2.5">
                        <div class="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-sm">
                            <i class="fa-solid fa-toolbox"></i>
                        </div>
                        <span>工具與管理</span>
                    </h2>
                    <p class="text-xs text-stone-500 mt-1">專為業務與內部行政打造</p>
                </div>
            </div>

            <!-- 區塊一：核心工具模組 -->
            <div class="space-y-3">
                <div class="flex items-center space-x-2 px-1">
                    <i class="fa-solid fa-diagram-project text-amber-500 text-sm"></i>
                    <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500">核心管理與改善計畫</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between group">
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <span class="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-[10px] font-bold">重點模組</span>
                                <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base group-hover:scale-105 transition">
                                    <i class="fa-solid fa-file-pdf"></i>
                                </div>
                            </div>
                            <h4 class="font-bold text-sm text-stone-900 mb-1">工廠改善計畫查詢與管理</h4>
                            <p class="text-xs text-stone-500 leading-relaxed mb-4">
                                支援特定工廠改善計畫書查詢、前台多重條件智慧篩選，並可一鍵連動至集團案件中心。
                            </p>
                        </div>
                        <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
                            <a href="https://www.cto.moea.gov.tw/FactoryMCLA/web/information/detail.php?cid=7&id=350" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center space-x-1">
                                <span>官方參考說明</span>
                                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                            </a>
                            <button type="button" onclick="renderFactoryImprovementModule()" class="px-4 py-2 bg-ruili-brand text-white rounded-xl text-xs font-bold hover:opacity-90 transition shadow-2xs flex items-center space-x-1.5">
                                <span>進入管理模組</span>
                                <i class="fa-solid fa-arrow-right text-[10px]"></i>
                            </button>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between group">
                        <div>
                            <div class="flex items-center justify-between mb-3">
                                <span class="px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded-lg text-[10px] font-bold">企業門面</span>
                                <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-base group-hover:scale-105 transition">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                            </div>
                            <h4 class="font-bold text-sm text-stone-900 mb-1">睿立官方網站</h4>
                            <p class="text-xs text-stone-500 leading-relaxed mb-4">
                                快速開啟集團官方網站，方便隨時向客戶展示綠能與土地開發實績。
                            </p>
                        </div>
                        <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
                            <span class="text-[11px] text-stone-400">外部形象連結</span>
                            <a href="https://www.yuanyeh.com.tw/" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 border border-stone-200 rounded-xl text-xs font-bold transition shadow-2xs flex items-center space-x-1.5">
                                <i class="fa-solid fa-external-link text-[10px]"></i><span>開啟官網</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 區塊二：地籍與工商查詢 -->
            <div class="space-y-3">
                <div class="flex items-center space-x-2 px-1">
                    <i class="fa-solid fa-map-location-dot text-emerald-500 text-sm"></i>
                    <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500">地籍與工商查詢</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="https://maps.nlsc.gov.tw/T09/mobilemap.action" target="_blank" rel="noopener noreferrer" class="p-4 bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-300 rounded-2xl transition flex items-center space-x-3.5 shadow-2xs group">
                        <div class="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition">
                            <i class="fa-solid fa-map"></i>
                        </div>
                        <div class="overflow-hidden flex-1">
                            <div class="font-bold text-xs text-stone-900 truncate">測繪雲</div>
                            <div class="text-[10px] text-stone-400 truncate mt-0.5">地籍圖快速定位與實地查勘</div>
                        </div>
                        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-stone-300 group-hover:text-emerald-600"></i>
                    </a>

                    <a href="https://findbiz.nat.gov.tw/fts/query/QueryList/queryList.do" target="_blank" rel="noopener noreferrer" class="p-4 bg-white hover:bg-sky-50/50 border border-stone-200 hover:border-sky-300 rounded-2xl transition flex items-center space-x-3.5 shadow-2xs group">
                        <div class="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition">
                            <i class="fa-solid fa-building"></i>
                        </div>
                        <div class="overflow-hidden flex-1">
                            <div class="font-bold text-xs text-stone-900 truncate">商業司</div>
                            <div class="text-[10px] text-stone-400 truncate mt-0.5">企業背景資訊查詢</div>
                        </div>
                        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-stone-300 group-hover:text-sky-600"></i>
                    </a>

                    <a href="https://serv.gcis.nat.gov.tw/Fidbweb/index.jsp" target="_blank" rel="noopener noreferrer" class="p-4 bg-white hover:bg-amber-50/50 border border-stone-200 hover:border-amber-300 rounded-2xl transition flex items-center space-x-3.5 shadow-2xs group">
                        <div class="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition">
                            <i class="fa-solid fa-industry"></i>
                        </div>
                        <div class="overflow-hidden flex-1">
                            <div class="font-bold text-xs text-stone-900 truncate">工廠登記查詢</div>
                            <div class="text-[10px] text-stone-400 truncate mt-0.5">工廠登記證查驗</div>
                        </div>
                        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-stone-300 group-hover:text-amber-600"></i>
                    </a>
                </div>
            </div>

            <!-- 區塊三：稅費試算專區 -->
            <div class="space-y-3">
                <div class="flex items-center space-x-2 px-1">
                    <i class="fa-solid fa-calculator text-indigo-500 text-sm"></i>
                    <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500">稅費試算專區</h3>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="https://net.tax.nat.gov.tw/PLRX/Lrx200d01/trial_lnd.html" target="_blank" rel="noopener noreferrer" class="p-4 bg-white hover:bg-indigo-50/50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                                <i class="fa-solid fa-landmark"></i>
                            </div>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300 group-hover:text-indigo-600"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">地價稅試算</div>
                            <div class="text-[10px] text-stone-400 mt-0.5">地方稅網路申報</div>
                        </div>
                    </a>

                    <a href="https://www.etax.nat.gov.tw/etwmain/etw158w/51" target="_blank" rel="noopener noreferrer" class="p-4 bg-white hover:bg-indigo-50/50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                                <i class="fa-solid fa-percent"></i>
                            </div>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300 group-hover:text-indigo-600"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">土地增值稅</div>
                            <div class="text-[10px] text-stone-400 mt-0.5">財政部稅務入口網</div>
                        </div>
                    </a>

                    <a href="https://www.kctax.gov.tw/Calculate/HOUCompute2.aspx?1=1&MenuID=1076" target="_blank" rel="noopener noreferrer" class="p-4 bg-white hover:bg-indigo-50/50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                                <i class="fa-solid fa-house"></i>
                            </div>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300 group-hover:text-indigo-600"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">房屋稅 (高雄)</div>
                            <div class="text-[10px] text-stone-400 mt-0.5">高雄市稅捐稽徵處</div>
                        </div>
                    </a>

                    <a href="https://www.etax.nat.gov.tw/etwmain/etw158w/53" target="_blank" rel="noopener noreferrer" class="p-4 bg-white hover:bg-indigo-50/50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-3">
                            <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                                <i class="fa-solid fa-file-contract"></i>
                            </div>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300 group-hover:text-indigo-600"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">契稅試算</div>
                            <div class="text-[10px] text-stone-400 mt-0.5">財政部稅務入口網</div>
                        </div>
                    </a>

                    <a href="https://net.tax.nat.gov.tw/PLRX/Lrx200d01/trial_cht.html" target="_blank" rel="noopener noreferrer" class="col-span-2 md:col-span-4 p-4 bg-white hover:bg-indigo-50/50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex items-center justify-between shadow-2xs group">
                        <div class="flex items-center space-x-3.5">
                            <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm shrink-0">
                                <i class="fa-solid fa-calculator"></i>
                            </div>
                            <div>
                                <div class="font-bold text-xs text-stone-900">地方稅綜合試算（印花、土增、牌照、契稅、房屋、地價、娛樂、房地移轉）</div>
                                <div class="text-[10px] text-stone-400 mt-0.5">地方稅網路申報作業入口網整合頁面</div>
                            </div>
                        </div>
                        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-stone-300 group-hover:text-indigo-600 pr-1"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
};
