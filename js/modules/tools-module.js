// js/modules/tools-module.js
export function renderToolsModule() {
    const container = document.getElementById('app-container');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-6 max-w-7xl mx-auto">
            <!-- 頁面標題列 -->
            <div class="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs gap-3">
                <div>
                    <h2 class="text-base font-bold text-stone-900 flex items-center space-x-2">
                        <i class="fa-solid fa-toolbox text-sky-600"></i>
                        <span>外勤工具專區與系統管理</span>
                    </h2>
                    <p class="text-xs text-stone-500 mt-0.5">整合土地測繪、官方查閱、稅費試算與改善計畫管理，專為外勤業務與內部行政打造</p>
                </div>
            </div>

            <!-- 區塊一：核心系統與改善計畫模組 -->
            <div class="space-y-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center space-x-1.5">
                    <i class="fa-solid fa-diagram-project text-amber-500"></i>
                    <span>核心管理與改善計畫</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <span class="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-[10px] font-bold">重點模組</span>
                                <i class="fa-solid fa-file-pdf text-amber-600 text-base"></i>
                            </div>
                            <h4 class="font-bold text-sm text-stone-900 mb-1">工廠改善計畫查詢與管理</h4>
                            <p class="text-xs text-stone-500 leading-relaxed mb-3">
                                支援後台 PDF 上傳自動解析、前台多重條件智慧篩選，並支援一鍵連動至案件評估中心。
                            </p>
                        </div>
                        <div class="pt-2 border-t border-stone-100 flex items-center justify-between">
                            <a href="https://www.cto.moea.gov.tw/FactoryMCLA/web/information/detail.php?cid=7&id=350" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center space-x-1">
                                <span>參考官方資料來源</span>
                                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                            </a>
                            <button type="button" onclick="alert('✨ 【工廠改善計畫管理後台】模組架構已就緒！')" class="px-3 py-1.5 bg-ruili-brand text-white rounded-xl text-xs font-bold hover:opacity-90 transition shadow-2xs">
                                進入管理模組
                            </button>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <span class="px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded-lg text-[10px] font-bold">企業門面</span>
                                <i class="fa-solid fa-globe text-sky-600 text-base"></i>
                            </div>
                            <h4 class="font-bold text-sm text-stone-900 mb-1">睿視野綠能官方網站</h4>
                            <p class="text-xs text-stone-500 leading-relaxed mb-3">
                                快速開啟集團官方網站，方便隨時向客戶展示綠能與土地開發實績。
                            </p>
                        </div>
                        <div class="pt-2 border-t border-stone-100 flex items-end justify-end">
                            <a href="https://www.yuanyeh.com.tw/" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-800 hover:text-white text-stone-700 border border-stone-300 rounded-xl text-xs font-bold transition shadow-2xs flex items-center space-x-1">
                                <i class="fa-solid fa-external-link text-[10px]"></i><span>開啟官網</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 區塊二：外勤地圖與工商查詢 -->
            <div class="space-y-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center space-x-1.5">
                    <i class="fa-solid fa-map-location-dot text-emerald-500"></i>
                    <span>外勤地圖與工商查詢</span>
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <a href="https://maps.nlsc.gov.tw/T09/mobilemap.action" target="_blank" rel="noopener noreferrer" class="p-3 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-2xl transition flex items-center space-x-3 shadow-2xs group">
                        <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-base shrink-0">
                            <i class="fa-solid fa-map"></i>
                        </div>
                        <div class="overflow-hidden">
                            <div class="font-bold text-xs text-stone-900 truncate">測繪雲 (手機版)</div>
                            <div class="text-[10px] text-stone-400 truncate">地籍圖快速定位</div>
                        </div>
                    </a>

                    <a href="https://findbiz.nat.gov.tw/fts/query/QueryList/queryList.do" target="_blank" rel="noopener noreferrer" class="p-3 bg-white hover:bg-sky-50 border border-stone-200 hover:border-sky-300 rounded-2xl transition flex items-center space-x-3 shadow-2xs group">
                        <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-base shrink-0">
                            <i class="fa-solid fa-building"></i>
                        </div>
                        <div class="overflow-hidden">
                            <div class="font-bold text-xs text-stone-900 truncate">商業司商工登記</div>
                            <div class="text-[10px] text-stone-400 truncate">企業背景查詢</div>
                        </div>
                    </a>

                    <a href="https://serv.gcis.nat.gov.tw/Fidbweb/index.jsp" target="_blank" rel="noopener noreferrer" class="p-3 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-2xl transition flex items-center space-x-3 shadow-2xs group">
                        <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base shrink-0">
                            <i class="fa-solid fa-industry"></i>
                        </div>
                        <div class="overflow-hidden">
                            <div class="font-bold text-xs text-stone-900 truncate">工廠登記查詢</div>
                            <div class="text-[10px] text-stone-400 truncate">合法與納管查驗</div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- 區塊三：稅費試算專區 -->
            <div class="space-y-3">
                <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center space-x-1.5">
                    <i class="fa-solid fa-calculator text-indigo-500"></i>
                    <span>稅費試算專區（外勤常用）</span>
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <a href="https://net.tax.nat.gov.tw/PLRX/Lrx200d01/trial_lnd.html" target="_blank" rel="noopener noreferrer" class="p-3 bg-white hover:bg-indigo-50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-2">
                            <i class="fa-solid fa-landmark text-indigo-600 text-sm"></i>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">地價稅試算</div>
                            <div class="text-[10px] text-stone-400">地方稅網路申報</div>
                        </div>
                    </a>

                    <a href="https://www.etax.nat.gov.tw/etwmain/etw158w/51" target="_blank" rel="noopener noreferrer" class="p-3 bg-white hover:bg-indigo-50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-2">
                            <i class="fa-solid fa-percent text-indigo-600 text-sm"></i>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">土地增值稅</div>
                            <div class="text-[10px] text-stone-400">財政部稅務入口網</div>
                        </div>
                    </a>

                    <a href="https://www.kctax.gov.tw/Calculate/HOUCompute2.aspx?1=1&MenuID=1076" target="_blank" rel="noopener noreferrer" class="p-3 bg-white hover:bg-indigo-50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-2">
                            <i class="fa-solid fa-house text-indigo-600 text-sm"></i>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">房屋稅 (高雄)</div>
                            <div class="text-[10px] text-stone-400">高雄市稅捐稽徵處</div>
                        </div>
                    </a>

                    <a href="https://www.etax.nat.gov.tw/etwmain/etw158w/53" target="_blank" rel="npm" target="_blank" rel="noopener noreferrer" class="p-3 bg-white hover:bg-indigo-50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex flex-col justify-between shadow-2xs group">
                        <div class="flex items-center justify-between mb-2">
                            <i class="fa-solid fa-file-contract text-indigo-600 text-sm"></i>
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-stone-300"></i>
                        </div>
                        <div>
                            <div class="font-bold text-xs text-stone-900">契稅試算</div>
                            <div class="text-[10px] text-stone-400">財政部稅務入口網</div>
                        </div>
                    </a>

                    <a href="https://net.tax.nat.gov.tw/PLRX/Lrx200d01/trial_cht.html" target="_blank" rel="noopener noreferrer" class="col-span-2 md:col-span-4 p-3 bg-white hover:bg-indigo-50 border border-stone-200 hover:border-indigo-300 rounded-2xl transition flex items-center justify-between shadow-2xs group">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs shrink-0">
                                <i class="fa-solid fa-calculator"></i>
                            </div>
                            <div>
                                <div class="font-bold text-xs text-stone-900">地方稅綜合試算（印花、土增、牌照、契稅、房屋、地價、娛樂、房地移轉）</div>
                                <div class="text-[10px] text-stone-400">地方稅網路申報作業入口網整合頁面</div>
                            </div>
                        </div>
                        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-stone-300 group-hover:text-indigo-600 pr-1"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}
