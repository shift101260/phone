<!DOCTYPE html> 
<html lang="zh-Hant"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>睿立集團｜精密營運管理與結案系統</title> 
    <script src="https://cdn.tailwindcss.com"></script> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"> 
     
    <!-- 引入獨立的全域色號變數樣式檔 --> 
    <link rel="stylesheet" href="./css/variables.css"> 
    <link rel="stylesheet" href="./css/layout.css"> 

    <!-- 引入資料同步與持久化模組 --> 
    <script src="./js/api/data-sync.js"></script> 
     
    <!-- 讓 Tailwind 能夠抓取我們的 CSS 變數 --> 
    <script> 
        tailwind.config = { 
            theme: { 
                extend: { 
                    colors: { 
                        ruili: { 
                            bg: 'var(--ruili-bg)', 
                            brand: 'var(--ruili-brand)', 
                            sidebar: 'var(--ruili-sidebar)', 
                            matcha: 'var(--ruili-matcha)', 
                            pink: 'var(--ruili-pink)', 
                            dark: 'var(--ruili-dark)', 
                            border: 'var(--ruili-border)' 
                        } 
                    } 
                } 
            } 
        } 
    </script>
    <style>
        /* 移除數字輸入框的上下箭頭 (Spinner) */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }
        input[type=number] {
            -moz-appearance: textfield;
        }

        /* 📱 手機版左右滑動橫向捲軸優化共用樣式 */
        .table-scroll-container {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    </style>
</head> 
<body class="bg-ruili-bg text-ruili-dark flex h-screen overflow-hidden font-sans"> 

    <!-- 左側功能導覽列 --> 
    <aside class="ruili-sidebar text-stone-300 flex flex-col justify-between md:flex border-r border-ruili-dark"> 
        <div> 
            <!-- 品牌 Logo 與名稱 --> 
            <div class="p-5 border-b border-ruili-dark flex items-center space-x-3 sticky top-0 bg-ruili-sidebar z-10"> 
                <div class="bg-ruili-brand text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shadow-xs">睿</div> 
                <div> 
                    <h1 class="text-white font-bold tracking-wider text-xs">睿立集團</h1> 
                    <p class="text-[9px] text-stone-400">RUILI Group ERP</p> 
                </div> 
            </div> 
             
            <!-- 功能選單 --> 
            <nav id="nav-menu" class="p-3 space-y-1 text-xs"> 
                <button onclick="switchModule('dashboard', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-ruili-brand text-white transition shadow-xs font-bold"> 
                    <i class="fa-solid fa-chart-line w-4"></i><span>戰情室總覽</span> 
                </button> 
                 
                <button onclick="switchModule('kanban', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-stone-800 text-stone-300 transition"> 
                    <i class="fa-solid fa-list-check w-4 text-amber-400"></i><span>工作看板</span> 
                </button> 

                <!-- 全集團案件總覽 -->
                <button onclick="switchModule('all-cases', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-stone-800 text-stone-300 transition">
                    <i class="fa-solid fa-layer-group w-4 text-amber-500"></i><span>全集團案件總覽</span>
                </button>

                <!-- 年度案件快速切換（可收合選單） -->
                <div class="mt-2">
                    <button onclick="toggleYearList()" class="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-500 px-3 py-1.5 hover:text-stone-300 transition group">
                        <span>年度案件展開</span>
                        <i id="year-chevron" class="fa-solid fa-chevron-down text-[9px] transition-transform duration-200"></i>
                    </button>
                    
                    <!-- 年份按鈕清單容器 -->
                    <div id="year-list-container" class="space-y-1 mt-1">
                        <button onclick="switchModule('year-2027', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-stone-800 text-stone-300 transition text-xs">
                            <i class="fa-solid fa-folder w-3.5 ml-0.5"></i><span>2027 案件管理</span>
                        </button>
                        <button onclick="switchModule('year-2026', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-stone-800 text-stone-300 transition text-xs">
                            <i class="fa-solid fa-folder w-3.5 ml-0.5"></i><span>2026 案件管理 (大宗)</span>
                        </button>
                        <button onclick="switchModule('year-2025', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-stone-800 text-stone-300 transition text-xs">
                            <i class="fa-solid fa-folder w-3.5 ml-0.5"></i><span>2025 案件管理</span>
                        </button>
                        <button onclick="switchModule('year-2024', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-stone-800 text-stone-300 transition text-xs">
                            <i class="fa-solid fa-folder w-3.5 ml-0.5"></i><span>2024 案件管理</span>
                        </button>
                        <button onclick="switchModule('year-2023', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-stone-800 text-stone-300 transition text-xs">
                            <i class="fa-solid fa-folder w-3.5 ml-0.5"></i><span>2023 案件管理</span>
                        </button>
                        <button onclick="switchModule('year-2022', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-stone-800 text-stone-300 transition text-xs">
                            <i class="fa-solid fa-folder w-3.5 ml-0.5"></i><span>2022 案件管理</span>
                        </button>
                        <button onclick="switchModule('year-2021', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-xl hover:bg-stone-800 text-stone-300 transition text-xs">
                            <i class="fa-solid fa-folder w-3.5 ml-0.5"></i><span>2021 案件管理</span>
                        </button>
                    </div>
                </div>

                <div class="pt-1"></div>

                <button onclick="switchModule('tools-module', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-stone-800 text-stone-300 transition"> 
                    <i class="fa-solid fa-toolbox w-4 text-sky-400"></i><span>工具專區</span> 
                </button>

                <button onclick="switchModule('closing', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-stone-800 text-stone-300 transition"> 
                    <i class="fa-solid fa-flag-checkered w-4"></i><span>結案中心</span> 
                </button> 

                <button onclick="switchModule('quotation', this)" class="nav-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-stone-800 text-stone-300 transition"> 
                    <i class="fa-solid fa-barcode w-4"></i><span>支出自填</span> 
                </button>
            </nav> 
        </div>

        <div class="p-3 border-t border-ruili-dark text-[11px] text-stone-400 flex items-center justify-between bg-ruili-sidebar"> 
            <span>身分：<strong>最高管理者</strong></span> 
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
        </div> 
    </aside> 

    <!-- 右側主畫面內容容器 --> 
    <main class="ruili-main"> 
        <!-- 📱 手機版專屬頂部列 --> 
        <div class="mobile-header-bar md:hidden flex items-center justify-between px-4 py-2.5 bg-[#2C2A29] text-white border-b border-[#292524]"> 
            <div class="flex items-center space-x-2.5"> 
                <div class="bg-[#D4A373] text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs">睿</div> 
                <span class="text-xs font-bold tracking-wider">睿立集團系統</span> 
            </div> 
            <button onclick="toggleSidebar()" class="text-stone-300 hover:text-white p-1.5 focus:outline-none"> 
                <i class="fa-solid fa-bars text-base"></i> 
            </button> 
        </div> 

        <!-- 主畫面內容 --> 
        <div id="app-container" class="ruili-container space-y-6"> 
            <!-- 動態載入內容 --> 
        </div> 
    </main> 

    <!-- ========================================== -->
    <!-- 互動彈窗模板區塊 -->
    <!-- ========================================== -->

    <!-- 1-1. 秘書待簽核案件列表彈窗 -->
    <div id="pendingListModal" class="fixed inset-0 bg-black/50 backdrop-blur-xs hidden flex items-center justify-center z-50 p-3 overflow-y-auto">
        <div class="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border border-stone-200 my-6">
            <div class="bg-[#2C2A29] text-white px-5 py-3 flex justify-between items-center sticky top-0 z-10">
                <h3 class="font-bold text-xs"><i class="fa-solid fa-layer-group text-amber-400 mr-1.5"></i> 秘書待簽核案件列表 (共 0 件)</h3>
                <button onclick="closeModal('pendingListModal')" class="text-stone-400 hover:text-white"><i class="fa-solid fa-xmark text-base"></i></button>
            </div>
            
            <div class="p-4 space-y-2.5 text-xs text-stone-700 bg-stone-50 max-h-[60vh] overflow-y-auto">
                <p class="text-stone-500 text-[11px] mb-1">目前尚無待簽核案件。</p>
            </div>

            <div class="bg-stone-100 px-5 py-2.5 border-t border-stone-200 flex justify-end">
                <button onclick="closeModal('pendingListModal')" class="px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg text-xs font-medium">關閉</button>
            </div>
        </div>
    </div>

    <!-- ========================================================== -->
    <!-- 互動彈窗區：集團案件完整建檔與評估中心 (Modal) -->
    <!-- ========================================================== -->
    <div id="editCaseModal" class="fixed inset-0 bg-black/60 backdrop-blur-xs hidden flex items-center justify-center z-50 p-3 overflow-y-auto">
        <!-- 外層白色卡片 -->
        <div class="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 my-6 text-stone-800">
           
            <!-- 彈窗頂部標題 -->
            <div class="bg-[#2C2A29] text-white px-6 py-4 flex justify-between items-center shrink-0 z-20">
                <h3 class="font-bold text-sm flex items-center tracking-wide">
                    <i class="fa-solid fa-circle-plus text-amber-400 mr-2 text-base"></i> 集團案件完整建檔與評估中心
                </h3>
                <button type="button" onclick="closeModal('editCaseModal')" class="text-stone-400 hover:text-white cursor-pointer transition">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <!-- 彈窗內容主體 -->
            <div class="p-6 space-y-6 text-xs text-stone-700 flex-1 overflow-y-auto bg-stone-50/50">
                <input type="hidden" id="edit-case-year" value="2026">
                <input type="hidden" id="edit-case-id" value="">
             
                <!-- 區塊一：基本資訊區域 -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <div class="flex justify-between items-center border-b border-stone-100 pb-2">
                        <h4 class="font-bold text-stone-900 flex items-center text-xs">
                            <i class="fa-solid fa-info-circle text-ruili-brand mr-1.5"></i> 一、基本資訊區域
                        </h4>
                        <div class="text-[11px] text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                            📅 建檔時間與日期：<strong id="edit-case-time-display" class="text-stone-800 font-mono">-</strong>
                        </div>
                    </div>
                   
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="font-bold block mb-1 text-stone-900">案件名稱 <span class="text-rose-500">*</span></label>
                            <input type="text" id="edit-case-name" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand font-bold shadow-2xs" placeholder="例：農地變更專案">
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-900">服務細項 <span class="text-rose-500">*</span></label>
                            <input type="text" id="edit-case-service-detail" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand font-medium shadow-2xs" placeholder="例：特定工廠用地變更細項">
                        </div>
                    </div>
             
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="font-bold block mb-1 text-stone-900">工作進度狀態</label>
                            <select id="edit-case-progress-status" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand font-bold text-stone-900 shadow-2xs cursor-pointer">
                                <option value="潛在">潛在</option>
                                <option value="現勘">現勘</option>
                                <option value="報價">報價</option>
                                <option value="準備簽約">準備簽約</option>
                                <option value="案件簽約">案件簽約</option>
                            </select>
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-900">服務項目 <span class="text-rose-500">*</span></label>
                            <select id="edit-case-service" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand font-bold text-stone-900 shadow-2xs cursor-pointer">
                                <option value="地政士">地政士</option>
                                <option value="改善計畫">改善計畫</option>
                                <option value="特定工廠登記">特定工廠登記</option>
                                <option value="一般工廠登記/變更">一般工廠登記/變更</option>
                                <option value="土地變更">土地變更</option>
                                <option value="補照">補照</option>
                                <option value="容許">容許</option>
                                <option value="不動產買賣">不動產買賣</option>
                                <option value="不動產租賃">不動產租賃</option>
                                <option value="ESG轉型">ESG轉型</option>
                                <option value="債務糾紛">債務糾紛</option>
                                <option value="太陽能">太陽能</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                    </div>
             
                    <div>
                        <label class="font-bold block mb-1 text-stone-900">案件地址</label>
                        <div class="flex items-center space-x-2">
                            <input type="text" id="edit-case-address" class="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand font-medium shadow-2xs" placeholder="例：高雄市仁武區...">
                            <button type="button" onclick="openGoogleMapDrawer()" class="px-3 py-2 bg-stone-100 hover:bg-ruili-brand hover:text-white text-stone-700 border border-stone-300 rounded-xl text-xs font-bold transition shadow-2xs whitespace-nowrap flex items-center space-x-1 cursor-pointer" title="Google地圖 街景與導航">
                                <i class="fa-solid fa-map-location-dot"></i><span>Google地圖</span>
                            </button>
                        </div>
                    </div>
             
                    <div>
                        <label class="font-bold block mb-1 text-stone-900">地段地號</label>
                        <div class="flex items-center space-x-2">
                            <input type="text" id="edit-case-land-number" class="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand font-medium shadow-2xs" placeholder="例：仁武段 123-4地號">
                            <a href="https://maps.nlsc.gov.tw" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-stone-100 hover:bg-ruili-brand hover:text-white text-stone-700 border border-stone-300 rounded-xl text-xs font-bold transition shadow-2xs whitespace-nowrap flex items-center space-x-1" title="國土測繪圖資服務雲">
                                <i class="fa-solid fa-map-location-dot"></i><span>地籍圖</span>
                            </a>
                        </div>
                    </div>
             
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="font-bold block mb-1 text-stone-900">案件說明</label>
                            <textarea id="edit-case-desc" class="w-full bg-white border border-stone-300 rounded-xl p-2.5 h-16 text-xs focus:outline-none focus:border-ruili-brand font-medium shadow-2xs" placeholder="拋轉至簽約案件時將顯示於秘書待簽核案件..."></textarea>
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-900">案件即時說明</label>
                            <textarea id="edit-case-note" class="w-full bg-white border border-stone-300 rounded-xl p-2.5 h-16 text-xs focus:outline-none focus:border-ruili-brand font-medium shadow-2xs" placeholder="內部即時備註與進度說明..."></textarea>
                        </div>
                    </div>
                </div>
             
                <!-- 區塊二：案件評估工具 -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <h4 class="font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center text-xs">
                        <i class="fa-solid fa-calculator text-ruili-brand mr-1.5"></i> 二、案件評估工具
                    </h4>
                    <div class="flex flex-wrap gap-2.5 py-1">
                        <button type="button" onclick="openLandModal()" class="px-4 py-2 bg-stone-100 hover:bg-ruili-brand hover:text-white text-stone-800 rounded-xl text-xs font-bold border border-stone-200 transition shadow-2xs flex items-center space-x-2 cursor-pointer">
                            <i class="fa-solid fa-map text-amber-600"></i><span>土地基本資料</span>
                        </button>
                        <button type="button" onclick="openRegisteredBuildingModal()" class="px-4 py-2 bg-stone-100 hover:bg-ruili-brand hover:text-white text-stone-800 rounded-xl text-xs font-bold border border-stone-200 transition shadow-2xs flex items-center space-x-2 cursor-pointer">
                            <i class="fa-solid fa-building text-sky-600"></i><span>保存登記建物</span>
                        </button>
                        <button type="button" onclick="openUnregisteredBuildingModal()" class="px-4 py-2 bg-stone-100 hover:bg-ruili-brand hover:text-white text-stone-800 rounded-xl text-xs font-bold border border-stone-200 transition shadow-2xs flex items-center space-x-2 cursor-pointer">
                            <i class="fa-solid fa-house-chimney text-emerald-600"></i><span>未保存登記建物</span>
                        </button>
                    </div>
                </div>
             
                <!-- 區塊三：服務項目試算 -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <h4 class="font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center text-xs">
                        <i class="fa-solid fa-chart-line text-ruili-brand mr-1.5"></i> 三、服務項目試算
                    </h4>
                    <div class="flex flex-wrap gap-2.5 py-1">
                        <button type="button" onclick="openLandChangeModal()" class="px-4 py-2 bg-stone-100 hover:bg-ruili-brand hover:text-white text-stone-800 rounded-xl text-xs font-bold border border-stone-200 transition shadow-2xs flex items-center space-x-2 cursor-pointer">
                            <i class="fa-solid fa-earth-asia text-sky-600"></i><span>土地變更評估</span>
                        </button>
                        <button type="button" onclick="openSolarModal()" class="px-4 py-2 bg-stone-100 hover:bg-ruili-brand hover:text-white text-stone-800 rounded-xl text-xs font-bold border border-stone-200 transition shadow-2xs flex items-center space-x-2 cursor-pointer">
                            <i class="fa-solid fa-solar-panel text-amber-600"></i><span>太陽能試算</span>
                        </button>
                    </div>
                    <div id="calc-module-viewport" class="mt-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-xs hidden"></div>
                </div>
             
                <!-- 區塊四：財務會計（報價、佣金與合約） -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <h4 class="font-bold text-stone-900 border-b border-stone-200 pb-2.5 flex items-center text-xs">
                        <i class="fa-solid fa-calculator text-ruili-brand mr-1.5"></i> 四、財務會計（報價、佣金與合約）
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <span class="text-[11px] text-stone-600 font-bold block">依照案件結案條件填寫</span>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="text" placeholder="報價金額 (NT$)" class="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-800 focus:outline-none focus:border-ruili-brand bg-white">
                                <input type="text" placeholder="報價趴數 (%)" class="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 text-center font-mono font-bold text-stone-800 focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                        </div>
                        <div class="space-y-1.5">
                            <span class="text-[11px] text-stone-600 font-bold block">依照案件結案條件填寫 (期程參考基準)</span>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="contract-amount" oninput="calculateQuoteTotals()" placeholder="簽約金額 (NT$)" class="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-rose-600 focus:outline-none focus:border-ruili-brand bg-white">
                                <input type="text" placeholder="簽約％數 (%)" class="w-full text-xs border border-stone-300 rounded-xl px-3 py-2 text-center font-mono font-bold text-rose-600 focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                        </div>
                    </div>
                </div>
             
                <!-- 區塊五：收款期程配置 -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <h4 class="font-bold text-stone-900 border-b border-stone-200 pb-2.5 flex items-center text-xs">
                        <i class="fa-solid fa-calendar-days text-ruili-brand mr-1.5"></i> 五、收款期程配置
                    </h4>
                    <span class="text-[11px] text-stone-500 block">依上方簽約金額按各期 % 自動換算</span>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <!-- 第一期款 -->
                        <div class="p-3 rounded-xl border border-stone-200 space-y-2 bg-stone-50/50">
                            <div class="flex items-center justify-between">
                                <span class="text-[11px] text-stone-700 font-bold">第一期款 (%)</span>
                                <input type="number" id="quote-inst-1-pct" value="20" oninput="calculateQuoteTotals()" class="w-16 text-xs border border-stone-300 rounded-lg px-2 py-1 text-center font-mono focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div class="flex items-center justify-between pt-1 border-t border-stone-200">
                                <span class="text-[10px] text-stone-500">應收金額：</span>
                                <span id="quote-inst-1-val" class="text-xs text-emerald-700 font-bold font-mono">NT$ 0</span>
                            </div>
                            <div>
                                <input type="date" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 font-mono text-stone-600 focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div>
                                <input type="text" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-ruili-brand bg-white" placeholder="期程備註...">
                            </div>
                        </div>
                        <!-- 第二期款 -->
                        <div class="p-3 rounded-xl border border-stone-200 space-y-2 bg-stone-50/50">
                            <div class="flex items-center justify-between">
                                <span class="text-[11px] text-stone-700 font-bold">第二期款 (%)</span>
                                <input type="number" id="quote-inst-2-pct" value="20" oninput="calculateQuoteTotals()" class="w-16 text-xs border border-stone-300 rounded-lg px-2 py-1 text-center font-mono focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div class="flex items-center justify-between pt-1 border-t border-stone-200">
                                <span class="text-[10px] text-stone-500">應收金額：</span>
                                <span id="quote-inst-2-val" class="text-xs text-emerald-700 font-bold font-mono">NT$ 0</span>
                            </div>
                            <div>
                                <input type="date" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 font-mono text-stone-600 focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div>
                                <input type="text" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-ruili-brand bg-white" placeholder="期程備註...">
                            </div>
                        </div>
                        <!-- 第三期款 -->
                        <div class="p-3 rounded-xl border border-stone-200 space-y-2 bg-stone-50/50">
                            <div class="flex items-center justify-between">
                                <span class="text-[11px] text-stone-700 font-bold">第三期款 (%)</span>
                                <input type="number" id="quote-inst-3-pct" value="50" oninput="calculateQuoteTotals()" class="w-16 text-xs border border-stone-300 rounded-lg px-2 py-1 text-center font-mono focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div class="flex items-center justify-between pt-1 border-t border-stone-200">
                                <span class="text-[10px] text-stone-500">應收金額：</span>
                                <span id="quote-inst-3-val" class="text-xs text-emerald-700 font-bold font-mono">NT$ 0</span>
                            </div>
                            <div>
                                <input type="date" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 font-mono text-stone-600 focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div>
                                <input type="text" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-ruili-brand bg-white" placeholder="期程備註...">
                            </div>
                        </div>
                        <!-- 第四期款 -->
                        <div class="p-3 rounded-xl border border-stone-200 space-y-2 bg-stone-50/50">
                            <div class="flex items-center justify-between">
                                <span class="text-[11px] text-stone-700 font-bold">第四期款 (%)</span>
                                <input type="number" id="quote-inst-4-pct" value="10" oninput="calculateQuoteTotals()" class="w-16 text-xs border border-stone-300 rounded-lg px-2 py-1 text-center font-mono focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div class="flex items-center justify-between pt-1 border-t border-stone-200">
                                <span class="text-[10px] text-stone-500">應收金額：</span>
                                <span id="quote-inst-4-val" class="text-xs text-emerald-700 font-bold font-mono">NT$ 0</span>
                            </div>
                            <div>
                                <input type="date" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 font-mono text-stone-600 focus:outline-none focus:border-ruili-brand bg-white">
                            </div>
                            <div>
                                <input type="text" class="w-full text-xs border border-stone-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-ruili-brand bg-white" placeholder="期程備註...">
                            </div>
                        </div>
                    </div>
                </div>
             
                <!-- 區塊六：供應商報價利潤工具 -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <div class="flex justify-between items-center border-b border-stone-200 pb-2.5">
                        <h4 class="font-bold text-stone-900 flex items-center text-xs">
                            <i class="fa-solid fa-file-invoice-dollar text-ruili-brand mr-1.5"></i> 六、供應商報價利潤工具
                        </h4>
                        <button type="button" onclick="addQuoteSupplierRow()" class="px-3 py-1.5 bg-ruili-brand hover:opacity-90 text-white rounded-xl text-xs font-bold transition shadow-2xs flex items-center space-x-1.5 cursor-pointer">
                            <i class="fa-solid fa-plus text-[10px]"></i><span>新增供應商</span>
                        </button>
                    </div>
             
                    <div class="overflow-x-auto w-full pb-2">
                        <div id="suppliers-rows-container" class="space-y-3 min-w-[700px]">
                            <div class="grid grid-cols-6 gap-3 items-center bg-stone-50 p-3 rounded-xl border border-stone-200">
                                <div><input type="text" placeholder="供應商名稱" class="supplier-name w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand"></div>
                                <div><input type="text" placeholder="施作項目" class="supplier-item w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand"></div>
                                <div><input type="number" placeholder="未稅價格" oninput="calculateQuoteTotals()" class="supplier-untaxed w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand font-mono"></div>
                                <div><input type="number" placeholder="報價金額" oninput="calculateQuoteTotals()" class="supplier-amount w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand font-mono"></div>
                                <div><input type="number" placeholder="簽約金額" oninput="calculateQuoteTotals()" class="supplier-contract w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-ruili-brand font-mono text-rose-600 font-bold"></div>
                                <div class="flex items-center space-x-2">
                                    <input type="number" value="5" oninput="calculateQuoteTotals()" class="supplier-tax w-14 bg-white border border-stone-300 rounded-xl px-2 py-1.5 text-xs text-center font-mono">
                                    <span class="text-[10px] text-stone-500 font-bold">稅%</span>
                                </div>
                            </div>
                        </div>
                    </div>
             
                    <!-- 四個自動總計欄位 -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                        <div>
                            <label class="font-bold block mb-1 text-stone-700 text-[11px]">總報價金額 (自動)</label>
                            <input type="text" id="calc-total-quote" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-stone-800" readonly value="NT$ 0">
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-700 text-[11px]">稅後總金額 (自動)</label>
                            <input type="text" id="calc-tax-after" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-stone-800" readonly value="NT$ 0">
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-700 text-[11px]">簽約總金額 (自動)</label>
                            <input type="text" id="calc-total-contract" class="w-full bg-rose-50 border border-rose-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-rose-700" readonly value="NT$ 0">
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-700 text-[11px]">案件總利潤 (自動)</label>
                            <input type="text" id="calc-total-profit" class="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-700" readonly value="NT$ 0">
                        </div>
                    </div>
                </div>
             
                <!-- 區塊七：案件介紹人與佣金機制 -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <h4 class="font-bold text-stone-900 border-b border-stone-200 pb-2.5 flex items-center text-xs">
                        <i class="fa-solid fa-user-tie text-ruili-brand mr-1.5"></i> 七、案件介紹人與佣金機制
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label class="font-bold block mb-1 text-stone-700 text-[11px]">介紹人姓名</label>
                            <input type="text" id="referral-name" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand" placeholder="例：陳總監">
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-700 text-[11px]">佣金金額</label>
                            <input type="number" id="referral-commission" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand font-mono" placeholder="0">
                        </div>
                        <div>
                            <label class="font-bold block mb-1 text-stone-700 text-[11px]">退佣機制說明</label>
                            <input type="text" id="referral-mechanism" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-ruili-brand" placeholder="例：陳經理 / 10% / 匯款退佣">
                        </div>
                    </div>
                </div>
             
                <!-- 區塊八：簽約程序與合約備註 -->
                <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <h4 class="font-bold text-stone-900 border-b border-stone-200 pb-2.5 flex items-center text-xs">
                        <i class="fa-solid fa-file-contract text-ruili-brand mr-1.5"></i> 八、簽約程序與合約備註
                    </h4>
                    <div class="flex items-center space-x-4 py-1">
                        <span class="font-bold text-stone-700 text-xs">簽約金額是否含稅選項：</span>
                        <label class="flex items-center space-x-1.5 cursor-pointer text-xs">
                            <input type="radio" name="tax-option" value="none" class="text-ruili-brand focus:ring-ruili-brand">
                            <span class="font-bold text-stone-600">不含稅</span>
                        </label>
                        <label class="flex items-center space-x-1.5 cursor-pointer text-xs">
                            <input type="radio" name="tax-option" value="included" checked class="text-ruili-brand focus:ring-ruili-brand">
                            <span class="font-bold text-stone-600">含稅</span>
                        </label>
                    </div>
                    <div>
                        <label class="font-bold block mb-1 text-stone-700 text-[11px]">業務合約備註</label>
                        <textarea id="contract-business-note" class="w-full bg-white border border-stone-300 rounded-xl p-2.5 h-20 text-xs focus:outline-none focus:border-ruili-brand font-medium" placeholder="請輸入合約相關的特殊條件、付款期程或業務備註..."></textarea>
                    </div>
                    <div class="pt-2 flex justify-end">
                        <!-- 匯出PDF 按鈕 -->
                        <button type="button" onclick="openQuotationGeneratorModal()" class="px-3 py-1.5 bg-ruili-brand hover:opacity-90 text-white rounded-xl text-xs font-bold transition shadow-2xs flex items-center space-x-1.5 cursor-pointer">
                            <i class="fa-solid fa-file-invoice"></i><span>匯出PDF</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- 彈窗內容主體結束 -->
             
            <!-- 彈窗底部固定按鈕列 -->
            <div class="px-6 py-4 bg-stone-100 border-t border-stone-200 flex justify-between items-center shrink-0">
                <!-- 左側：案件簽核按鈕 -->
                <div>
                    <button type="button" onclick="handleCaseSignOff(currentEditingId)" class="px-3 py-1.5 bg-ruili-brand hover:opacity-90 text-white rounded-xl text-xs font-bold transition shadow-2xs flex items-center space-x-1.5 cursor-pointer">
                        <i class="fa-solid fa-file-signature"></i>
                        <span>案件簽核</span>
                    </button>
                </div>
             
                <!-- 右側：取消與儲存按鈕群組 -->
                <div class="flex items-center space-x-3">
                    <!-- 取消 按鈕 -->
                    <button type="button" onclick="closeModal('editCaseModal')" class="px-3 py-1.5 bg-white hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-bold border border-stone-300 transition shadow-2xs cursor-pointer">
                        取消
                    </button>
                    <!-- 儲存 按鈕 -->
                    <button type="button" onclick="saveCaseData()" class="px-3 py-1.5 bg-ruili-brand hover:opacity-90 text-white rounded-xl text-xs font-bold transition shadow-2xs flex items-center space-x-1.5 cursor-pointer">
                        <i class="fa-solid fa-check"></i>
                        <span>儲存</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 頁面切換與控制邏輯 --> 
    <script> 
        window.toggleYearList = function() {
            const list = document.getElementById('year-list-container');
            const chevron = document.getElementById('year-chevron');
            
            if (list.classList.contains('hidden')) {
                list.classList.remove('hidden');
                chevron.style.transform = 'rotate(0deg)';
            } else {
                list.classList.add('hidden');
                chevron.style.transform = 'rotate(-90deg)';
            }
        };

        window.openGoogleMapDrawer = function() {
            const addressInput = document.getElementById('edit-case-address');
            const address = addressInput ? addressInput.value.trim() : '';

            if (!address) {
                alert('⚠️ 請先輸入案件地址，方可進行 Google Map 街景與導航查詢！');
                if (addressInput) addressInput.focus();
                return;
            }

            const encodedAddr = encodeURIComponent(address);
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddr}`;
            window.open(mapUrl, '_blank');
        };
    
        function openModal(modalId) { 
            const modal = document.getElementById(modalId); 
            if (modal) {
                modal.classList.remove('hidden');
                if (modalId === 'editCaseModal') {
                    const timeDisplay = document.getElementById('edit-case-time-display');
                    if (timeDisplay) {
                        const now = new Date();
                        const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
                        timeDisplay.innerText = timeStr;
                    }
                }
            } 
        } 

        function closeModal(modalId) { 
            const modal = document.getElementById(modalId); 
            if (modal) modal.classList.add('hidden'); 
        } 

        function toggleSidebar() {
            const sidebar = document.querySelector('.ruili-sidebar');
            sidebar.classList.toggle('mobile-open');
        }

        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.nav-btn');
            if (btn && window.innerWidth < 768) {
                const sidebar = document.querySelector('.ruili-sidebar');
                if (sidebar && sidebar.classList.contains('mobile-open')) {
                    toggleSidebar();
                }
            }
        });

        function switchModule(moduleName, btnElement) { 
            document.querySelectorAll('.nav-btn').forEach(btn => { 
                btn.classList.remove('bg-ruili-brand', 'text-white', 'font-bold', 'shadow-xs'); 
                btn.classList.add('hover:bg-stone-800', 'text-stone-300'); 
            }); 
            if(btnElement) { 
                btnElement.classList.remove('hover:bg-stone-800', 'text-stone-300'); 
                btnElement.classList.add('bg-ruili-brand', 'text-white', 'font-bold', 'shadow-xs'); 
            } 

            const container = document.getElementById('app-container'); 
             
            if(moduleName === 'dashboard') { 
                container.innerHTML = ` 
                    <div class="bg-white p-6 rounded-2xl border border-ruili-border shadow-2xs space-y-2"> 
                        <h2 class="text-base font-bold text-stone-900">戰情室總覽</h2> 
                        <p class="text-xs text-stone-500">掌握集團整體 YoY 財報、營運案件數與跨通路效益分析。</p> 
                    </div>`; 
            } else if (moduleName === 'kanban') {
                renderWorkflowOverviewWithPipelineView('secretary');
            } else if (moduleName === 'tools-module') {
                container.innerHTML = `<div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs"><h2 class="text-base font-bold text-stone-900">工具專區</h2><p class="text-xs text-stone-500 mt-1">請選擇對應的試算與管理工具模組。</p></div>`;
            } else if (moduleName === 'all-cases') {
                container.innerHTML = `
                    <div class="space-y-6"> 
                        <div class="bg-white p-5 rounded-2xl border border-ruili-border shadow-2xs space-y-3"> 
                            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3"> 
                                <div> 
                                    <h2 class="text-base font-bold text-stone-900">全集團案件總覽</h2> 
                                    <p class="text-xs text-stone-500">跨年份集中檢索所有歷史與進行中案件，掌握全局脈動。</p> 
                                </div> 
                                <div class="flex items-center space-x-2"> 
                                    <input type="text" id="global-search-input" oninput="filterGlobalCases()" placeholder="全集團關鍵字搜尋..." class="px-3 py-1.5 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 w-48"> 
                                </div> 
                            </div> 
                        </div> 

                        <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden"> 
                            <div class="table-scroll-container"> 
                                <table class="w-full text-left text-xs min-w-[650px]"> 
                                    <thead> 
                                        <tr class="bg-stone-50/60 border-b border-stone-200 text-stone-400 font-medium"> 
                                            <th class="py-3 px-4">年度</th> 
                                            <th class="py-3 px-4">客戶名稱</th> 
                                            <th class="py-3 px-4">服務細項</th> 
                                            <th class="py-3 px-4">工作進度</th> 
                                            <th class="py-3 px-4">簽約金額</th> 
                                            <th class="py-3 px-4">目前狀態</th> 
                                        </tr> 
                                    </thead> 
                                    <tbody id="global-cases-tbody" class="divide-y divide-stone-100"> 
                                        <tr><td colspan="6" class="py-6 text-center text-stone-400 text-xs">目前無任何案件記錄</td></tr> 
                                    </tbody> 
                                </table> 
                            </div> 
                        </div> 
                    </div>`; 
            } else if(moduleName.startsWith('year-')) { 
                const year = moduleName.split('-')[1]; 
                container.innerHTML = `
                    <div class="space-y-6">
                        <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 class="text-base font-bold text-stone-900">${year} 年度案件管理中心</h2>
                                <p class="text-xs text-stone-500 mt-0.5">管理與檢視 ${year} 年度的所有專案與案件進度。</p>
                            </div>
                            <button onclick="openModal('editCaseModal'); document.getElementById('edit-case-year').value='${year}';" class="px-4 py-2 bg-ruili-brand hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center space-x-2">
                                <i class="fa-solid fa-plus"></i><span>新增 ${year} 案件</span>
                            </button>
                        </div>
                        <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden p-6 text-center text-stone-400 text-xs">
                            目前尚無 ${year} 年度建檔案件，點擊上方按鈕開始新增。
                        </div>
                    </div>`;
            } else if(moduleName === 'quotation') { 
                container.innerHTML = `
                    <div class="space-y-6">
                        <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 class="text-base font-bold text-stone-900"><i class="fa-solid fa-pen-to-square text-ruili-brand mr-2"></i>支出自填與查詢中心</h2>
                                    <p class="text-xs text-stone-500 mt-0.5">請手動輸入相關編號或資訊進行查詢與記錄。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if(moduleName === 'closing') { 
                container.innerHTML = ` 
                    <div class="space-y-6"> 
                        <div class="bg-white p-5 rounded-2xl border border-ruili-border shadow-2xs space-y-1.5"> 
                            <h2 class="text-base font-bold text-stone-900"><i class="fa-solid fa-flag-checkered text-emerald-600 mr-2"></i> 結案中心（正式結案報告清單）</h2> 
                            <p class="text-xs text-stone-500">以下為已完成收尾並永久封存的正式結案案件。</p> 
                        </div> 

                        <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden"> 
                            <div class="table-scroll-container">
                                <div class="min-w-[650px]">
                                    <div class="p-3.5 bg-stone-50 border-b border-stone-200 font-bold text-xs text-stone-600 grid grid-cols-12 gap-3 items-center"> 
                                        <div class="col-span-2">案件編號</div> 
                                        <div class="col-span-3">案件名稱 / 客戶</div> 
                                        <div class="col-span-3">服務項目</div> 
                                        <div class="col-span-2 text-right">結案報告</div> 
                                    </div> 
                                    <div class="divide-y divide-stone-100 text-xs"> 
                                        <div class="p-6 text-center text-stone-400 text-xs">目前尚無已完成結案歸檔的案件</div>
                                    </div> 
                                </div>
                            </div>
                        </div> 
                    </div>`; 
            } 
        } 

        function renderWorkflowOverviewWithPipelineView(activeRole) { 
            const container = document.getElementById('app-container'); 
             
            const rolesConfig = [ 
                { key: 'secretary', name: '秘書' }, 
                { key: 'assistant', name: '特助' }, 
                { key: 'surveyor', name: '地政士' }, 
                { key: 'accountant', name: '財務長' }, 
                { key: 'cbo', name: '品牌長' } 
            ]; 

            let tabsHtml = rolesConfig.map(r => ` 
                <button onclick="renderWorkflowOverviewWithPipelineView('${r.key}')" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${activeRole === r.key ? 'bg-ruili-brand text-white shadow-xs' : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200/60'}"> 
                    <span>${r.name}</span> 
                </button> 
            `).join(''); 

            container.innerHTML = ` 
                <div class="space-y-6"> 
                    <div class="space-y-3"> 
                        <div class="bg-gradient-to-br from-white via-stone-50/50 to-stone-100/50 p-5 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"> 
                            <div class="space-y-1.5"> 
                                <h2 class="text-sm font-bold text-stone-900 flex items-center"> 
                                    <i class="fa-solid fa-compass text-amber-600 mr-2 text-base"></i> 睿立集團｜工作看板核心流程與交棒總覽 
                                </h2> 
                                <p class="text-xs text-stone-500 leading-relaxed">掌握集團各階段營運流程與交棒管道。</p> 
                            </div> 
                        </div> 

                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4"> 
                            <div class="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between group"> 
                                <div class="space-y-2.5"> 
                                    <div class="flex justify-between items-center"> 
                                        <span class="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/60 rounded-lg text-[10px] font-bold">SOP1</span> 
                                        <span class="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/60 rounded-full text-[10px] font-bold">0 件待簽核</span> 
                                    </div> 
                                    <h3 class="font-bold text-stone-900 text-xs">1. 案件簽核 / 受理</h3> 
                                    <p class="text-[11px] text-stone-500">進行正式合約登錄與跨部門交辦。</p> 
                                </div> 
                                <button onclick="openModal('pendingListModal')" class="w-full py-2 bg-ruili-brand hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"> 
                                    <span>秘書待簽核案件</span> 
                                </button> 
                            </div> 

                            <div class="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between group"> 
                                <div class="space-y-2.5"> 
                                    <div class="flex justify-between items-center"> 
                                        <span class="px-2.5 py-0.5 bg-sky-50 text-sky-800 border border-sky-200/60 rounded-lg text-[10px] font-bold">SOP2</span> 
                                        <span class="px-2.5 py-0.5 bg-sky-50 text-sky-700 border border-sky-200/60 rounded-full text-[10px] font-bold">0 件執行中</span> 
                                    </div> 
                                    <h3 class="font-bold text-stone-900 text-xs">2. 執行中案件</h3> 
                                    <p class="text-[11px] text-stone-500">進行中案件總計與即時檢視。</p> 
                                </div> 
                                <button onclick="alert('目前無執行中案件')" class="w-full py-2 bg-ruili-brand hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"> 
                                    <span>檢視執行中清單</span> 
                                </button> 
                            </div> 

                            <div class="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between group"> 
                                <div class="space-y-2.5"> 
                                    <div class="flex justify-between items-center"> 
                                        <span class="px-2.5 py-0.5 bg-purple-50 text-purple-800 border border-purple-200/60 rounded-lg text-[10px] font-bold">SOP3</span> 
                                        <span class="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200/60 rounded-full text-[10px] font-bold">0 件待結案</span> 
                                    </div> 
                                    <h3 class="font-bold text-stone-900 text-xs">3. 階段性請款</h3> 
                                    <p class="text-[11px] text-stone-500">等待主管機關核發最後公文。</p> 
                                </div> 
                                <button onclick="alert('目前無待結案案件')" class="w-full py-2 bg-ruili-brand hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"> 
                                    <span>待結案專區列表</span> 
                                </button> 
                            </div> 

                            <div class="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between group"> 
                                <div class="space-y-2.5"> 
                                    <div class="flex justify-between items-center"> 
                                        <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-lg text-[10px] font-bold">SOP4</span> 
                                        <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-[10px] font-bold">0 件收尾中</span> 
                                    </div> 
                                    <h3 class="font-bold text-stone-900 text-xs">4. 待結案專區</h3> 
                                    <p class="text-[11px] text-stone-500">開立發票與產出結案報告。</p> 
                                </div> 
                                <button onclick="alert('目前無收尾中案件')" class="w-full py-2 bg-ruili-brand hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"> 
                                    <span>模擬結案收尾流水線</span> 
                                </button> 
                            </div> 
                        </div> 
                    </div> 

                    <div class="space-y-4 pt-3 border-t border-stone-200/80"> 
                        <div class="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-3"> 
                            <div> 
                                <h2 class="text-sm font-bold text-stone-900 flex items-center"> 
                                    <i class="fa-solid fa-users-viewfinder text-stone-700 mr-2 text-base"></i> 工作看板：跨角色交棒專屬列表 
                                </h2> 
                                <p class="text-xs text-stone-500 mt-0.5">點擊不同角色分頁，系統會自動切換對應負責清單。</p> 
                            </div> 
                            <div class="flex flex-wrap gap-2 pt-1">${tabsHtml}</div> 
                        </div> 
                        <div class="p-6 bg-white rounded-3xl border border-stone-200 text-center text-stone-400 text-xs"></div> 
                    </div> 
                </div> 
            `; 
        } 

        window.onload = function() { 
            switchModule('kanban', document.querySelector("button[onclick*='kanban']")); 
        }; 
    </script> 

    <!-- 引入模組化主程式 (main.js) --> 
    <script type="module" src="./js/main.js"></script> 
</body> 
</html>
