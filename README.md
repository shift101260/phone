<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>睿立業務系統 - 案件評估 (RWD 藍金奢華版)</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome 圖標 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- 導入 ExcelJS 與 FileSaver 用於支援高階藍金配色 Excel 匯出 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen font-sans">

    <!-- 頂部導覽列：全面響應式調整 -->
    <header class="bg-gradient-to-r from-blue-950 to-slate-900 text-white shadow-md px-4 py-4 md:px-6 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
            <!-- 標題與標籤 -->
            <div class="flex items-center space-x-3 justify-between lg:justify-start">
                <div class="flex items-center space-x-2">
                    <i class="fa-solid fa-layer-group text-xl md:text-2xl text-amber-400"></i>
                    <h1 class="text-lg md:text-xl font-bold tracking-wider">睿立業務系統 <span class="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold ml-1">RWD 高級版</span></h1>
                </div>
                <span id="caseCountMobile" class="lg:hidden text-xs bg-slate-800 px-2 py-1 rounded text-amber-400 font-medium border border-slate-700">共 0 筆</span>
            </div>
            
            <!-- 頂部控制列：手機端自動垂直堆疊，平板以上橫向排列 -->
            <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 items-stretch sm:items-center w-full lg:w-auto">
                <div class="relative flex-1 sm:flex-initial">
                    <input type="text" id="searchBar" oninput="filterCases()" placeholder="搜尋公司、經理、服務項目..." class="w-full sm:w-64 px-4 py-2 pl-10 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 border border-slate-300">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-xs"></i>
                </div>
                <div class="grid grid-cols-3 gap-2 sm:flex sm:space-x-2">
                    <button onclick="openModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-2 rounded-lg text-xs md:text-sm font-semibold shadow flex items-center justify-center space-x-1 transition-all">
                        <i class="fa-solid fa-plus"></i> <span class="hidden xs:inline">新增案件</span>
                    </button>
                    <button onclick="exportLuxuryExcel()" class="bg-blue-900 hover:bg-blue-800 text-amber-400 border border-amber-500/40 px-2.5 py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center space-x-1 transition-all shadow-sm">
                        <i class="fa-solid fa-file-excel"></i> <span>匯出藍金Excel</span>
                    </button>
                    <button onclick="saveToCloud()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-2 rounded-lg text-xs md:text-sm font-bold shadow flex items-center justify-center space-x-1 transition-all">
                        <i class="fa-solid fa-cloud-arrow-up"></i> <span>儲存更新</span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- 主區塊 -->
    <main class="p-4 md:p-6 max-w-7xl mx-auto">
        <!-- 統計看板：手機雙列，平板/電腦六列並排 -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6" id="statsContainer">
            <!-- 動態渲染統計數字 -->
        </div>

        <!-- 案件管理區塊容器 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 class="font-bold text-slate-700 flex items-center space-x-2 text-sm md:text-base">
                    <i class="fa-solid fa-list-check text-blue-900"></i>
                    <span>動態案件管理系統</span>
                </h2>
                <span id="caseCount" class="hidden lg:inline-block text-sm bg-slate-200 px-2 py-0.5 rounded text-slate-600 font-medium">共 0 筆案件</span>
            </div>

            <!-- 1. 桌機與平板橫放視圖 (Desktop & Tablet Landscape Table View) -->
            <div class="hidden md:block overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                            <th class="py-3.5 px-4">狀態</th>
                            <th class="py-3.5 px-4">公司名稱 (統編)</th>
                            <th class="py-3.5 px-4">專案經理</th>
                            <th class="py-3.5 px-4">服務項目</th>
                            <th class="py-3.5 px-4">土地/建物總坪</th>
                            <th class="py-3.5 px-4">ESG 評估指標</th>
                            <th class="py-3.5 px-4 text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody id="caseTableBody" class="divide-y divide-slate-100 text-sm">
                        <!-- 動態案件桌機版名單 -->
                    </tbody>
                </table>
            </div>

            <!-- 2. 手機端精緻卡片無視圖 (Mobile Responsive Card View) -->
            <div id="caseCardContainer" class="block md:hidden p-4 space-y-4 bg-slate-50">
                <!-- 動態手機卡片名單 -->
            </div>
        </div>
    </main>

    <!-- 新增/編輯彈窗 (Modal) -->
    <div id="caseModal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm hidden flex justify-center items-center z-50 p-2 md:p-4">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] lg:max-h-[90vh] overflow-y-auto border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <!-- Header -->
            <div class="p-4 md:p-5 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 id="modalTitle" class="text-base md:text-lg font-bold text-slate-800 flex items-center space-x-2">
                    <i class="fa-solid fa-pen-to-square text-blue-900"></i> <span>新增公司案件評估</span>
                </h3>
                <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 text-xl p-1"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <!-- Form Body -->
            <form id="caseForm" onsubmit="handleFormSubmit(event)" class="p-4 md:p-6 space-y-5">
                <input type="hidden" id="editCaseId">

                <!-- 一、專案人員與狀態 -->
                <div class="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200">
                    <h4 class="font-bold text-blue-950 text-xs md:text-sm mb-3 flex items-center space-x-1.5"><span class="w-1 h-4 bg-blue-900 rounded-full inline-block"></span><span>一、專案負責與狀態</span></h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">案件狀態 *</label>
                            <select id="caseStatus" required class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900 bg-white">
                                <option value="初期評估">初期評估 (綠色)</option>
                                <option value="已報價">已報價 (藍色)</option>
                                <option value="準備簽約">準備簽約 (金色)</option>
                                <option value="已簽約">已簽約 (紅色)</option>
                                <option value="結案">結案 (紫色)</option>
                                <option value="沒下文">沒下文 (黑色)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">專案經理 *</label>
                            <select id="projectManager" required class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900 bg-white">
                                <option value="樊靖畇">樊靖畇</option>
                                <option value="鄭家承">鄭家承</option>
                                <option value="陳宥騰">陳宥騰</option>
                                <option value="楊裕憲">楊裕憲</option>
                                <option value="黃逸豪">黃逸豪</option>
                                <option value="李宜璇">李宜璇</option>
                                <option value="王瑋聆">王瑋聆</option>
                                <option value="許先生">許先生</option>
                            </select>
                        </div>
                        <div class="sm:col-span-2 md:col-span-1">
                            <label class="block text-xs font-semibold text-slate-500 mb-1">案件來源</label>
                            <input type="text" id="caseSource" placeholder="例如：開發、舊客介紹" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                    </div>
                    <div class="mt-3">
                        <label class="block text-xs font-semibold text-slate-500 mb-1">業務即時狀態備註</label>
                        <textarea id="statusRemark" rows="2" placeholder="請輸入當前進度追蹤備註..." class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900"></textarea>
                    </div>
                </div>

                <!-- 二、公司基本資料 -->
                <div class="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200">
                    <h4 class="font-bold text-blue-950 text-xs md:text-sm mb-3 flex items-center space-x-1.5"><span class="w-1 h-4 bg-blue-900 rounded-full inline-block"></span><span>二、公司基本資料</span></h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div class="sm:col-span-2">
                            <label class="block text-xs font-semibold text-slate-500 mb-1">公司名稱 *</label>
                            <input type="text" id="companyName" required class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">統一編號</label>
                            <input type="text" id="companyTaxId" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">工廠登記證字號</label>
                            <input type="text" id="factoryRegId" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">產業類型</label>
                            <input type="text" id="industryType" placeholder="如: 金屬製品製造業" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">聯絡人</label>
                            <input type="text" id="contactPerson" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">聯絡電話</label>
                            <input type="text" id="contactPhone" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div class="sm:col-span-2 md:col-span-2">
                            <label class="block text-xs font-semibold text-slate-500 mb-1">E-mail</label>
                            <input type="email" id="contactEmail" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div class="grid grid-cols-1 sm:col-span-2 md:col-span-4">
                            <label class="block text-xs font-semibold text-slate-500 mb-1">工廠地址</label>
                            <input type="text" id="factoryAddress" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                    </div>
                </div>

                <!-- 服務項目明細層 -->
                <div class="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="font-bold text-blue-950 text-xs md:text-sm flex items-center space-x-1.5"><span class="w-1 h-4 bg-blue-900 rounded-full inline-block"></span><span>服務項目明細</span></h4>
                        <button type="button" onclick="addServiceRow()" class="text-xs bg-blue-900 hover:bg-indigo-9究 text-white px-2.5 py-1 rounded flex items-center space-x-1"><i class="fa-solid fa-plus"></i> <span>新增項目</span></button>
                    </div>
                    <div id="servicesContainer" class="space-y-2">
                        <!-- 動態服務項目列 -->
                    </div>
                </div>

                <!-- 三、土地基本資料 -->
                <div class="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="font-bold text-blue-950 text-xs md:text-sm flex items-center space-x-1.5"><span class="w-1 h-4 bg-blue-900 rounded-full inline-block"></span><span>三、土地基本資料</span></h4>
                        <button type="button" onclick="addLandRow()" class="text-xs bg-blue-900 hover:bg-blue-800 text-white px-2.5 py-1 rounded flex items-center space-x-1"><i class="fa-solid fa-plus"></i> <span>地段地號</span></button>
                    </div>
                    
                    <div id="landsContainer" class="space-y-2 mb-3">
                        <!-- 地段地號動態列 -->
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 pt-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">土地總坪數 (坪)</label>
                            <input type="number" step="0.01" id="totalLandPing" class="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 text-xs md:text-sm font-bold text-blue-900" readonly placeholder="下方加總">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">都市計畫內使用分區</label>
                            <input type="text" id="urbanZone" placeholder="如: 工業區" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">都市計畫外使用地類別</label>
                            <input type="text" id="nonUrbanZone" placeholder="如: 丁種建築用地" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                    </div>
                </div>

                <!-- 四、建物基本資料 -->
                <div class="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="font-bold text-blue-950 text-xs md:text-sm flex items-center space-x-1.5"><span class="w-1 h-4 bg-blue-900 rounded-full inline-block"></span><span>四、建物基本資料</span></h4>
                        <button type="button" onclick="addBuildingRow()" class="text-xs bg-blue-900 hover:bg-blue-800 text-white px-2.5 py-1 rounded flex items-center space-x-1"><i class="fa-solid fa-plus"></i> <span>建號</span></button>
                    </div>
                    
                    <div id="buildingsContainer" class="space-y-2 mb-3">
                        <!-- 建號動態列 -->
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 pt-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">建造年份</label>
                            <input type="text" id="buildYear" placeholder="如: 1998" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">合法建物坪數 (坪)</label>
                            <input type="number" step="0.01" id="legalBuildPing" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">違章建物坪數 (坪)</label>
                            <input type="number" step="0.01" id="illegalBuildPing" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                    </div>
                </div>

                <!-- 五、ESG 評估 -->
                <div class="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200">
                    <h4 class="font-bold text-blue-950 text-xs md:text-sm mb-3 flex items-center space-x-1.5"><span class="w-1 h-4 bg-blue-900 rounded-full inline-block"></span><span>五、ESG 評估與能耗狀況</span></h4>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">是否有接班人</label>
                            <select id="esgSuccessor" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900 bg-white">
                                <option value="是">是</option>
                                <option value="否">否</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">產品是否外銷</label>
                            <select id="esgExport" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900 bg-white">
                                <option value="是">是</option>
                                <option value="否">否</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">是否受歐盟減碳要求</label>
                            <select id="esgCarbon" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900 bg-white">
                                <option value="是">是</option>
                                <option value="否">否</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 pt-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">每月平均電費 (元)</label>
                            <input type="number" id="esgElectricity" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">馬力 (HP)</label>
                            <input type="number" id="esgHp" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-500 mb-1">契約容量 (kW)</label>
                            <input type="number" id="esgKw" class="w-full border border-slate-300 rounded-lg p-2 text-xs md:text-sm focus:ring-2 focus:ring-blue-900">
                        </div>
                    </div>
                </div>

                <!-- Footer 控制 -->
                <div class="border-t border-slate-200 pt-4 flex justify-end space-x-2 bg-white sticky bottom-0 z-10">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 border border-slate-300 rounded-lg text-xs md:text-sm font-medium text-slate-700 hover:bg-slate-50">取消</button>
                    <button type="submit" class="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs md:text-sm font-semibold shadow">確認儲存</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 核心運作 JavaScript -->
    <script>
        // 初始化空白資料庫結構
        let casesData = JSON.parse(localStorage.getItem('ruili_cases')) || [];

        // 核心狀態樣式表
        const statusConfig = {
            '初期評估': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', dot: 'bg-emerald-500' },
            '已報價': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-500' },
            '準備簽約': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-400', dot: 'bg-amber-500' },
            '已簽約': { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300', dot: 'bg-rose-500' },
            '結案': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', dot: 'bg-purple-500' },
            '沒下文': { bg: 'bg-slate-800', text: 'text-white', border: 'border-slate-900', dot: 'bg-slate-400' }
        };

        document.addEventListener("DOMContentLoaded", () => {
            renderTableAndCards(casesData);
            updateStats();
        });

        // 同時渲染桌機版表格與手機版卡片
        function renderTableAndCards(data) {
            const tbody = document.getElementById('caseTableBody');
            const cardContainer = document.getElementById('caseCardContainer');
            
            // 更新計數器
            const countStr = `共 ${data.length} 筆案件`;
            document.getElementById('caseCount').innerText = countStr;
            document.getElementById('caseCountMobile').innerText = `共 ${data.length} 筆`;

            tbody.innerHTML = '';
            cardContainer.innerHTML = '';

            if(data.length === 0) {
                const emptyHTML = `<div class="text-center py-8 text-slate-400"><i class="fa-solid fa-folder-open text-3xl mb-2 block"></i>目前無任何案件資料</div>`;
                tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">${emptyHTML}</td></tr>`;
                cardContainer.innerHTML = emptyHTML;
                return;
            }

            data.forEach(item => {
                const cfg = statusConfig[item.status] || statusConfig['初期評估'];
                const totalLand = item.lands.reduce((acc, l) => acc + (parseFloat(l.ping) || 0), 0).toFixed(1);
                const totalBuild = ((parseFloat(item.legalBuildPing) || 0) + (parseFloat(item.illegalBuildPing) || 0)).toFixed(1);
                const serviceNames = item.services.map(s => s.name).join(', ') || '無項目';

                // 1. 桌機與平板橫放視圖 (Table Row)
                const tr = document.createElement('tr');
                tr.className = "hover:bg-slate-50 transition-colors";
                tr.innerHTML = `
                    <td class="py-3 px-4">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text} border ${cfg.border}">
                            <span class="w-1.5 h-1.5 rounded-full ${cfg.dot} mr-1.5"></span>${item.status}
                        </span>
                    </td>
                    <td class="py-3 px-4 font-medium text-slate-900">
                        <div class="font-bold text-slate-800">${item.companyName}</div>
                        <div class="text-xs text-slate-400">${item.companyTaxId || '無統編'}</div>
                    </td>
                    <td class="py-3 px-4 text-slate-600 font-medium">${item.projectManager}</td>
                    <td class="py-3 px-4"><span class="text-xs bg-blue-50 text-blue-900 px-2 py-1 rounded border border-blue-100 max-w-[180px] inline-block truncate" title="${serviceNames}">${serviceNames}</span></td>
                    <td class="py-3 px-4 text-xs text-slate-600">
                        <div>地: <strong class="text-slate-800">${totalLand}</strong> 坪</div>
                        <div>建: <strong class="text-slate-800">${totalBuild}</strong> 坪</div>
                    </td>
                    <td class="py-3 px-4 text-xs">
                        <span class="px-1.5 py-0.5 rounded ${item.esgExport === '是' ? 'bg-cyan-100 text-cyan-900 font-medium' : 'bg-slate-100'}">外銷: ${item.esgExport}</span>
                        <span class="px-1.5 py-0.5 rounded ${item.esgSuccessor === '是' ? 'bg-emerald-100 text-emerald-900 font-medium' : 'bg-slate-100'} ml-1">接班: ${item.esgSuccessor}</span>
                    </td>
                    <td class="py-3 px-4 text-center space-x-1.5">
                        <button onclick="editCase('${item.id}')" class="text-blue-700 hover:text-blue-900 p-1"><i class="fa-solid fa-marker"></i></button>
                        <button onclick="deleteCase('${item.id}')" class="text-rose-600 hover:text-rose-800 p-1"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);

                // 2. 手機直放視圖 (Responsive Cards)
                const card = document.createElement('div');
                card.className = "bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3";
                card.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold text-base text-slate-800">${item.companyName}</h4>
                            <p class="text-xs text-slate-400">統編: ${item.companyTaxId || '無'} | 經理: ${item.projectManager}</p>
                        </div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${cfg.bg} ${cfg.text} border ${cfg.border}">
                            ${item.status}
                        </span>
                    </div>
                    <div class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg space-y-1">
                        <div><strong class="text-slate-700">主要服務:</strong> <span class="text-blue-900 font-medium">${serviceNames}</span></div>
                        <div class="grid grid-cols-2 gap-1 mt-1">
                            <div><strong>土地坪數:</strong> ${totalLand} 坪</div>
                            <div><strong>建物坪數:</strong> ${totalBuild} 坪</div>
                        </div>
                        <div class="pt-1 flex space-x-2 border-t border-slate-200 mt-1">
                            <span class="text-[10px] px-1.5 py-0.5 rounded ${item.esgExport === '是' ? 'bg-cyan-100 text-cyan-900' : 'bg-slate-100'}">外銷: ${item.esgExport}</span>
                            <span class="text-[10px] px-1.5 py-0.5 rounded ${item.esgSuccessor === '是' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100'}">接班: ${item.esgSuccessor}</span>
                            <span class="text-[10px] px-1.5 py-0.5 rounded ${item.esgCarbon === '是' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100'}">歐盟減碳: ${item.esgCarbon}</span>
                        </div>
                    </div>
                    ${item.statusRemark ? `<p class="text-xs text-slate-500 italic bg-amber-50/60 p-2 rounded border border-amber-100/70"><i class="fa-regular fa-comment-dots mr-1"></i>${item.statusRemark}</p>` : ''}
                    <div class="flex justify-end space-x-3 pt-1 border-t border-slate-100 text-sm">
                        <button onclick="editCase('${item.id}')" class="text-blue-700 font-semibold flex items-center space-x-1"><i class="fa-solid fa-marker"></i> <span>編輯詳情</span></button>
                        <button onclick="deleteCase('${item.id}')" class="text-rose-600 font-semibold flex items-center space-x-1"><i class="fa-solid fa-trash-can"></i> <span>刪除</span></button>
                    </div>
                `;
                cardContainer.appendChild(card);
            });
        }

        // 統計看板更新
        function updateStats() {
            const statsContainer = document.getElementById('statsContainer');
            const counts = { '初期評估': 0, '已報價': 0, '準備簽約': 0, '已簽約': 0, '結案': 0, '沒下文': 0 };
            casesData.forEach(c => { if(counts[c.status] !== undefined) counts[c.status]++; });

            statsContainer.innerHTML = Object.keys(counts).map(key => {
                const cfg = statusConfig[key];
                return `
                    <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p class="text-[11px] font-bold text-slate-400 tracking-tight">${key}</p>
                            <p class="text-lg font-black text-slate-800 mt-0.5">${counts[key]}</p>
                        </div>
                        <span class="w-2.5 h-2.5 rounded-full ${cfg.dot} shrink-0 ml-2"></span>
                    </div>
                `;
            }).join('');
        }

        // 開啟彈窗（新增模式）
        function openModal() {
            document.getElementById('caseForm').reset();
            document.getElementById('editCaseId').value = '';
            document.getElementById('modalTitle').innerText = '新增公司案件評估';
            document.getElementById('servicesContainer').innerHTML = '';
            document.getElementById('landsContainer').innerHTML = '';
            document.getElementById('buildingsContainer').innerHTML = '';
            
            addServiceRow();
            addLandRow();
            addBuildingRow();

            document.getElementById('caseModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('caseModal').classList.add('hidden');
        }

        // 動態增減欄位控制：服務項目 (支援手機端彈性縮緊與自適應換行)
        function addServiceRow(data = {name:'', desc:'', quote:''}) {
            const div = document.createElement('div');
            div.className = "flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 items-stretch sm:items-center bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm";
            div.innerHTML = `
                <input type="text" placeholder="項目名稱 (如: 特定工廠變更)" value="${data.name}" class="w-full sm:w-1/3 border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900" required>
                <input type="text" placeholder="案件說明/評估結果" value="${data.desc}" class="w-full sm:w-5/12 border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900">
                <div class="flex items-center space-x-1 w-full sm:w-2/12">
                    <input type="number" placeholder="報價" value="${data.quote}" class="w-full border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900">
                    <button type="button" onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-rose-600 p-1.5 sm:p-1"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            document.getElementById('servicesContainer').appendChild(div);
        }

        // 動態增減欄位控制：地段地號
        function addLandRow(data = {section:'', no:'', m2:'', ping:''}) {
            const div = document.createElement('div');
            div.className = "grid grid-cols-2 sm:flex sm:space-x-2 items-center gap-1.5 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm relative";
            div.innerHTML = `
                <input type="text" placeholder="地段" value="${data.section}" class="border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900 w-full">
                <input type="text" placeholder="地號" value="${data.no}" class="border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900 w-full">
                <input type="number" step="0.01" placeholder="平方公尺" value="${data.m2}" oninput="calcPing(this, 'm2')" class="border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900 w-full">
                <div class="flex items-center space-x-1 w-full">
                    <input type="number" step="0.01" placeholder="坪數" value="${data.ping}" oninput="calcPing(this, 'ping')" class="border border-slate-300 rounded p-1.5 text-xs font-semibold text-blue-900 bg-blue-50/50 w-full land-ping-input">
                    <button type="button" onclick="this.parentElement.parentElement.remove(); sumTotalLandPing();" class="text-slate-400 hover:text-rose-600 p-1"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            document.getElementById('landsContainer').appendChild(div);
        }

        // 動態增減欄位控制：建號
        function addBuildingRow(data = {no:'', m2:'', ping:''}) {
            const div = document.createElement('div');
            div.className = "grid grid-cols-3 sm:flex sm:space-x-2 items-center gap-1.5 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm";
            div.innerHTML = `
                <input type="text" placeholder="建號" value="${data.no}" class="border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900 w-full">
                <input type="number" step="0.01" placeholder="平方公尺" value="${data.m2}" oninput="calcBuildingPing(this, 'm2')" class="border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900 w-full">
                <div class="flex items-center space-x-1 w-full">
                    <input type="number" step="0.01" placeholder="坪數" value="${data.ping}" oninput="calcBuildingPing(this, 'ping')" class="border border-slate-300 rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-900 w-full building-ping-input">
                    <button type="button" onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-rose-600 p-1"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            document.getElementById('buildingsContainer').appendChild(div);
        }

        function calcPing(element, type) {
            const row = element.closest('.grid, .flex');
            const inputs = row.querySelectorAll('input');
            const m2Input = inputs[2];
            const pingInput = inputs[3];
            if(type === 'm2' && m2Input.value) {
                pingInput.value = (parseFloat(m2Input.value) * 0.3025).toFixed(2);
            } else if(type === 'ping' && pingInput.value) {
                m2Input.value = (parseFloat(pingInput.value) / 0.3025).toFixed(2);
            }
            sumTotalLandPing();
        }

        function calcBuildingPing(element, type) {
            const row = element.closest('.grid, .flex');
            const inputs = row.querySelectorAll('input');
            const m2Input = inputs[1];
            const pingInput = inputs[2];
            if(type === 'm2' && m2Input.value) {
                pingInput.value = (parseFloat(m2Input.value) * 0.3025).toFixed(2);
            } else if(type === 'ping' && pingInput.value) {
                m2Input.value = (parseFloat(pingInput.value) / 0.3025).toFixed(2);
            }
        }

        function sumTotalLandPing() {
            let total = 0;
            document.querySelectorAll('.land-ping-input').forEach(input => { total += parseFloat(input.value) || 0; });
            document.getElementById('totalLandPing').value = total.toFixed(2);
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            
            const services = [];
            document.querySelectorAll('#servicesContainer > div').forEach(row => {
                const inputs = row.querySelectorAll('input');
                if(inputs[0].value) services.push({ name: inputs[0].value, desc: inputs[1].value, quote: inputs[2].value });
            });

            const lands = [];
            document.querySelectorAll('#landsContainer > div').forEach(row => {
                const inputs = row.querySelectorAll('input');
                if(inputs[0].value || inputs[1].value) lands.push({ section: inputs[0].value, no: inputs[1].value, m2: inputs[2].value, ping: inputs[3].value });
            });

            const buildings = [];
            document.querySelectorAll('#buildingsContainer > div').forEach(row => {
                const inputs = row.querySelectorAll('input');
                if(inputs[0].value) buildings.push({ no: inputs[0].value, m2: inputs[1].value, ping: inputs[2].value });
            });

            const caseId = document.getElementById('editCaseId').value;
            const caseObject = {
                id: caseId || 'case_' + Date.now(),
                status: document.getElementById('caseStatus').value,
                projectManager: document.getElementById('projectManager').value,
                caseSource: document.getElementById('caseSource').value,
                statusRemark: document.getElementById('statusRemark').value,
                companyName: document.getElementById('companyName').value,
                companyTaxId: document.getElementById('companyTaxId').value,
                factoryRegId: document.getElementById('factoryRegId').value,
                industryType: document.getElementById('industryType').value,
                contactPerson: document.getElementById('contactPerson').value,
                contactPhone: document.getElementById('contactPhone').value,
                contactEmail: document.getElementById('contactEmail').value,
                factoryAddress: document.getElementById('factoryAddress').value,
                urbanZone: document.getElementById('urbanZone').value,
                nonUrbanZone: document.getElementById('nonUrbanZone').value,
                buildYear: document.getElementById('buildYear').value,
                legalBuildPing: document.getElementById('legalBuildPing').value,
                illegalBuildPing: document.getElementById('illegalBuildPing').value,
                esgSuccessor: document.getElementById('esgSuccessor').value,
                esgExport: document.getElementById('esgExport').value,
                esgCarbon: document.getElementById('esgCarbon').value,
                esgElectricity: document.getElementById('esgElectricity').value,
                esgHp: document.getElementById('esgHp').value,
                esgKw: document.getElementById('esgKw').value,
                services: services,
                lands: lands,
                buildings: buildings,
                updatedAt: new Date().toLocaleString()
            };

            if(caseId) {
                const idx = casesData.findIndex(c => c.id === caseId);
                casesData[idx] = caseObject;
            } else {
                casesData.unshift(caseObject);
            }

            localStorage.setItem('ruili_cases', JSON.stringify(casesData));
            renderTableAndCards(casesData);
            updateStats();
            closeModal();
        }

        function editCase(id) {
            const item = casesData.find(c => c.id === id);
            if(!item) return;

            openModal();
            document.getElementById('modalTitle').innerText = '編輯案件評估 - ' + item.companyName;
            document.getElementById('editCaseId').value = item.id;
            
            document.getElementById('caseStatus').value = item.status;
            document.getElementById('projectManager').value = item.projectManager;
            document.getElementById('caseSource').value = item.caseSource || '';
            document.getElementById('statusRemark').value = item.statusRemark || '';
            document.getElementById('companyName').value = item.companyName;
            document.getElementById('companyTaxId').value = item.companyTaxId || '';
            document.getElementById('factoryRegId').value = item.factoryRegId || '';
            document.getElementById('industryType').value = item.industryType || '';
            document.getElementById('contactPerson').value = item.contactPerson || '';
            document.getElementById('contactPhone').value = item.contactPhone || '';
            document.getElementById('contactEmail').value = item.contactEmail || '';
            document.getElementById('factoryAddress').value = item.factoryAddress || '';
            document.getElementById('urbanZone').value = item.urbanZone || '';
            document.getElementById('nonUrbanZone').value = item.nonUrbanZone || '';
            document.getElementById('buildYear').value = item.buildYear || '';
            document.getElementById('legalBuildPing').value = item.legalBuildPing || '';
            document.getElementById('illegalBuildPing').value = item.illegalBuildPing || '';
            document.getElementById('esgSuccessor').value = item.esgSuccessor || '是';
            document.getElementById('esgExport').value = item.esgExport || '是';
            document.getElementById('esgCarbon').value = item.esgCarbon || '是';
            document.getElementById('esgElectricity').value = item.esgElectricity || '';
            document.getElementById('esgHp').value = item.esgHp || '';
            document.getElementById('esgKw').value = item.esgKw || '';

            document.getElementById('servicesContainer').innerHTML = '';
            if(item.services && item.services.length > 0) item.services.forEach(s => addServiceRow(s)); else addServiceRow();

            document.getElementById('landsContainer').innerHTML = '';
            if(item.lands && item.lands.length > 0) item.lands.forEach(l => addLandRow(l)); else addLandRow();

            document.getElementById('buildingsContainer').innerHTML = '';
            if(item.buildings && item.buildings.length > 0) item.buildings.forEach(b => addBuildingRow(b)); else addBuildingRow();

            sumTotalLandPing();
        }

        function deleteCase(id) {
            if(confirm('確定要刪除此筆工廠案件評估資料嗎？')) {
                casesData = casesData.filter(c => c.id !== id);
                localStorage.setItem('ruili_cases', JSON.stringify(casesData));
                renderTableAndCards(casesData);
                updateStats();
            }
        }

        function filterCases() {
            const query = document.getElementById('searchBar').value.toLowerCase();
            const filtered = casesData.filter(c => {
                const sNames = c.services.map(s => s.name).join(' ').toLowerCase();
                return c.companyName.toLowerCase().includes(query) || 
                       (c.companyTaxId && c.companyTaxId.includes(query)) ||
                       c.projectManager.toLowerCase().includes(query) ||
                       sNames.includes(query);
            });
            renderTableAndCards(filtered);
        }

        function saveToCloud() {
            localStorage.setItem('ruili_cases', JSON.stringify(casesData));
            alert('【睿立提示】資料已與本地資料庫完全同步保存！');
        }

        // 🌟 奢華高階：一鍵匯出「顧問藍底 ＋ 金色文字」頂級配色 Excel 報表
        async function exportLuxuryExcel() {
            if(casesData.length === 0) { alert('目前無資料可供匯出！'); return; }

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('睿立業務案件明細');

            // 建立藍金主題欄位表頭
            worksheet.columns = [
                { header: '案件狀態', key: 'status', width: 14 },
                { header: '公司名稱', key: 'companyName', width: 28 },
                { header: '統一編號', key: 'taxId', width: 15 },
                { header: '專案負責人', key: 'pm', width: 14 },
                { header: '主要服務項目', key: 'services', width: 35 },
                { header: '土地總坪數', key: 'land', width: 14 },
                { header: '建物總坪數', key: 'build', width: 14 },
                { header: '外銷', key: 'export', width: 10 },
                { header: '二代接班', key: 'successor', width: 10 },
                { header: '即時進度備註', key: 'remark', width: 30 }
            ];

            // 1. 針對表頭行進行【顧問藍 #1E3A8A】底色與【尊爵金 #D4AF37】粗體文字染色
            const headerRow = worksheet.getRow(1);
            headerRow.height = 26;
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF1E3A8A' } // 睿立專業顧問藍
                };
                cell.font = {
                    name: '微軟正黑體',
                    color: { argb: 'FFD4AF37' }, // 奢華金文字
                    bold: true,
                    size: 11
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.border = {
                    bottom: { style: 'medium', color: { argb: 'FFD4AF37' } }
                };
            });

            // 2. 注入資料並設定細節格線與對齊
            casesData.forEach(c => {
                const totalLand = c.lands.reduce((acc, l) => acc + (parseFloat(l.ping) || 0), 0).toFixed(1);
                const totalBuild = ((parseFloat(c.legalBuildPing) || 0) + (parseFloat(c.illegalBuildPing) || 0)).toFixed(1);
                const serviceNames = c.services.map(s => s.name).join('、');

                const newRow = worksheet.addRow({
                    status: c.status,
                    companyName: c.companyName,
                    taxId: c.companyTaxId || '',
                    pm: c.projectManager,
                    services: serviceNames,
                    land: parseFloat(totalLand),
                    build: parseFloat(totalBuild),
                    export: c.esgExport,
                    successor: c.esgSuccessor,
                    remark: c.statusRemark || ''
                });

                newRow.height = 22;
                newRow.alignment = { vertical: 'middle' };
                
                // 設定內文字型與基礎輕微細格線
                newRow.eachCell((cell) => {
                    cell.font = { name: '微軟正黑體', size: 10 };
                    cell.border = {
                        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } }
                    };
                });
            });

            // 3. 匯出二進位活頁簿檔案並下載
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), `睿立專業案件明細表_藍金版_${new Date().toISOString().slice(0,10)}.xlsx`);
        }
    </script>
</body>
</html>
