<!-- ========================================================== -->
<!-- 2. 土地變更評估與試算 Modal (功能完整對齊版) -->
<!-- ========================================================== -->
<div id="land-change-modal" class="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[60] hidden flex items-center justify-center p-2 sm:p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] sm:max-h-[95vh] flex flex-col overflow-hidden border border-sky-100 relative">
        <div class="p-4 md:p-5 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white shadow-md shrink-0">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 text-lg shadow-inner shrink-0">
                    <i class="fa-solid fa-layer-group"></i>
                </div>
                <div>
                    <h3 class="font-bold text-base tracking-wide text-white">土地變更專屬評估與回饋金試算</h3>
                    <p class="text-[11px] text-sky-300/80 font-normal">Ruili Land Alteration & Feedback Fee Evaluation Tool</p>
                </div>
            </div>
            <button onclick="closeLandChangeModal()" class="text-slate-400 hover:text-white hover:bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <div class="p-4 md:p-6 space-y-6 overflow-y-auto flex-1 text-xs bg-slate-50/50">
            <!-- 一、基本條件評估 (已新增指定欄位與排序) -->
            <div class="bg-white p-4 md:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <h4 class="font-bold text-slate-800 text-sm">一、基本條件評估</h4>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">工廠登記發文日期</label>
                        <input type="date" id="lc-factory-date" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white font-mono text-slate-700 shadow-sm">
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">工廠登記字號</label>
                        <input type="text" id="lc-factory-no" placeholder="例：特定工廠登記字號..." class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white font-medium shadow-sm">
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">組織型態</label>
                        <select id="lc-org-type" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white font-medium text-slate-700 shadow-sm">
                            <option value="企業社">企業社</option>
                            <option value="有限公司">有限公司</option>
                            <option value="股份有限公司">股份有限公司</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">主要產品</label>
                        <input type="text" id="lc-main-product" placeholder="例：金屬機械加工、木模等..." class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white font-medium shadow-sm">
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">鄰路幾米</label>
                        <input type="text" id="lc-road-width" placeholder="例：8米或12米" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white font-medium shadow-sm">
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">送件前三年內是否因違反環保法規停工</label>
                        <select id="lc-env-violation" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white font-medium text-slate-700 shadow-sm">
                            <option value="否">否</option>
                            <option value="是">是</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block font-semibold text-slate-700 mb-1.5">隔離綠帶說明 (手動自填)</label>
                    <textarea id="lc-green-belt" rows="3" placeholder="請詳細輸入隔離綠帶規劃與說明..." class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 bg-white font-medium shadow-sm"></textarea>
                </div>
            </div>

            <!-- 二、工廠登記證面積計算 (自動換算坪數) -->
            <div class="bg-white p-4 md:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    <h4 class="font-bold text-slate-800 text-sm">二、工廠登記證面積計算</h4>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <span class="block font-semibold text-slate-700">廠地面積</span>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" step="0.01" placeholder="面積 (㎡)" oninput="window.calcFactoryArea(this)" class="factory-sqm px-3 py-1.5 border rounded-lg bg-white font-mono">
                            <input type="text" placeholder="坪數" readonly class="factory-ping px-3 py-1.5 border rounded-lg bg-slate-100 font-mono font-bold text-slate-700">
                        </div>
                    </div>
                    <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <span class="block font-semibold text-slate-700">廠房面積</span>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" step="0.01" placeholder="面積 (㎡)" oninput="window.calcFactoryArea(this)" class="factory-sqm px-3 py-1.5 border rounded-lg bg-white font-mono">
                            <input type="text" placeholder="坪數" readonly class="factory-ping px-3 py-1.5 border rounded-lg bg-slate-100 font-mono font-bold text-slate-700">
                        </div>
                    </div>
                    <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <span class="block font-semibold text-slate-700">建物面積</span>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" step="0.01" placeholder="面積 (㎡)" oninput="window.calcFactoryArea(this)" class="factory-sqm px-3 py-1.5 border rounded-lg bg-white font-mono">
                            <input type="text" placeholder="坪數" readonly class="factory-ping px-3 py-1.5 border rounded-lg bg-slate-100 font-mono font-bold text-slate-700">
                        </div>
                    </div>
                    <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <span class="block font-semibold text-slate-700">建物及廠房面積合計</span>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="number" step="0.01" placeholder="面積 (㎡)" oninput="window.calcFactoryArea(this)" class="factory-sqm px-3 py-1.5 border rounded-lg bg-white font-mono">
                            <input type="text" placeholder="坪數" readonly class="factory-ping px-3 py-1.5 border rounded-lg bg-slate-100 font-mono font-bold text-slate-700">
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1">建蔽率 70% (土地及建物佔比說明)</label>
                        <input type="text" placeholder="手動填入說明或比例" class="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white">
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1">容積率 180% (總樓地板面積說明)</label>
                        <input type="text" placeholder="手動填入說明或總樓地板面積" class="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white">
                    </div>
                </div>
            </div>

            <!-- 三、回饋金試算 (已加入地籍圖連結按鈕) -->
            <div class="bg-white p-4 md:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div class="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <h4 class="font-bold text-slate-800 text-sm">三、回饋金試算</h4>
                    </div>
                    <div class="flex items-center gap-2">
                        <!-- 地籍圖外部連結按鈕 -->
                        <a href="https://maps.nlsc.gov.tw" target="_blank" class="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition flex items-center gap-1.5 shadow-sm text-xs cursor-pointer">
                            <i class="fa-solid fa-map-location-dot"></i> 地籍圖
                        </a>
                        <button type="button" onclick="window.addFeedbackRow()" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition flex items-center gap-1 shadow-sm cursor-pointer">
                            <i class="fa-solid fa-plus"></i> ＋新增地號
                        </button>
                    </div>
                </div>
                <div class="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-3">
                    <div class="table-scroll-container">
                        <div class="min-w-[600px]">
                            <div class="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1.2fr_32px] gap-2 font-bold text-slate-600 border-b pb-2 text-center text-[11px]">
                                <div>地號</div>
                                <div>面積 (㎡)</div>
                                <div>公告現值 (NT$)</div>
                                <div>分區</div>
                                <div>回饋金試算 (NT$)</div>
                                <div>刪除</div>
                            </div>
                            <div id="feedback-rows-container" class="space-y-2 mt-2">
                                <!-- 預設第一列 -->
                                <div class="feedback-row grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1.2fr_32px] gap-2 items-center bg-white p-2 rounded-lg border shadow-sm">
                                    <input type="text" placeholder="例：頂番段123地號" class="px-2 py-1 border rounded-lg text-xs">
                                    <input type="number" step="0.01" placeholder="面積(㎡)" oninput="window.calcFeedbackTotal()" class="fb-area px-2 py-1 border rounded-lg text-xs font-mono">
                                    <input type="number" step="0.01" placeholder="公告現值" oninput="window.calcFeedbackTotal()" class="fb-price px-2 py-1 border rounded-lg text-xs font-mono">
                                    <select onchange="window.calcFeedbackTotal()" class="fb-zone px-2 py-1 border rounded-lg text-xs bg-white font-medium">
                                        <option value="都內">都內 (×0.1)</option>
                                        <option value="非都">非都 (×0.5)</option>
                                    </select>
                                    <span class="fb-result font-bold text-emerald-700 text-xs font-mono text-center">NT$ 0</span>
                                    <button type="button" onclick="this.closest('.feedback-row').remove(); window.calcFeedbackTotal();" class="text-slate-400 hover:text-rose-600 cursor-pointer flex justify-center"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 flex justify-between items-center shadow-inner">
                    <span class="font-bold text-emerald-900 text-xs">回饋金估算總額</span>
                    <span id="feedback-grand-total" class="text-sm font-bold text-emerald-800 font-mono">NT$ 0</span>
                </div>
            </div>

            <!-- 四、都內土地代金計算 (新功能區塊) -->
            <div class="bg-white p-4 md:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <h4 class="font-bold text-slate-800 text-sm">四、都內土地代金計算 (面積 × 0.3 × 公告現值 × 0.5)</h4>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">代金計算面積 (手動自填)</label>
                        <input type="number" step="0.01" id="urban-alt-area" placeholder="請輸入面積..." oninput="window.calcUrbanAltTotal()" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-mono text-xs shadow-sm">
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">公告現值 (手動自填)</label>
                        <input type="number" step="0.01" id="urban-alt-price" placeholder="請輸入公告現值..." oninput="window.calcUrbanAltTotal()" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-mono text-xs shadow-sm">
                    </div>
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1.5">都內土地代金 (自動試算)</label>
                        <input type="text" id="urban-alt-result" readonly value="NT$ 0" class="w-full px-3 py-2 border border-amber-300 rounded-lg bg-amber-50 font-mono font-bold text-amber-800 text-xs shadow-sm text-center">
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 shrink-0 sticky bottom-0 z-10 shadow-lg">
            <button type="button" onclick="closeLandChangeModal()" class="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-white transition text-xs cursor-pointer">取消</button>
            <button type="button" onclick="closeLandChangeModal()" class="px-5 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-lg font-bold transition shadow-md text-xs cursor-pointer">儲存</button>
        </div>
    </div>
</div>

<script>
// 土地變更評估互動與計算邏輯
window.openLandChangeModal = function() {
    const modal = document.getElementById('land-change-modal');
    if (modal) { modal.classList.remove('hidden'); modal.style.display = 'flex'; }
};
window.closeLandChangeModal = function() {
    const modal = document.getElementById('land-change-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
};

// 二、工廠面積自動換算坪數 (*0.3025)
window.calcFactoryArea = function(input) {
    const parent = input.closest('div.p-3');
    if (!parent) return;
    const sqm = parseFloat(input.value) || 0;
    const pingInput = parent.querySelector('.factory-ping');
    if (pingInput) {
        pingInput.value = sqm > 0 ? (sqm * 0.3025).toFixed(2) + ' 坪' : '';
    }
};

// 三、回饋金動態新增列
window.addFeedbackRow = function() {
    const container = document.getElementById('feedback-rows-container');
    if (!container) return;
    const html = `
        <div class="feedback-row grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1.2fr_32px] gap-2 items-center bg-white p-2 rounded-lg border shadow-sm">
            <input type="text" placeholder="例：頂番段123地號" class="px-2 py-1 border rounded-lg text-xs">
            <input type="number" step="0.01" placeholder="面積(㎡)" oninput="window.calcFeedbackTotal()" class="fb-area px-2 py-1 border rounded-lg text-xs font-mono">
            <input type="number" step="0.01" placeholder="公告現值" oninput="window.calcFeedbackTotal()" class="fb-price px-2 py-1 border rounded-lg text-xs font-mono">
            <select onchange="window.calcFeedbackTotal()" class="fb-zone px-2 py-1 border rounded-lg text-xs bg-white font-medium">
                <option value="都內">都內 (×0.1)</option>
                <option value="非都">非都 (×0.5)</option>
            </select>
            <span class="fb-result font-bold text-emerald-700 text-xs font-mono text-center">NT$ 0</span>
            <button type="button" onclick="this.closest('.feedback-row').remove(); window.calcFeedbackTotal();" class="text-slate-400 hover:text-rose-600 cursor-pointer flex justify-center"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
};

// 三、回饋金試算公式計算（都內 *0.1，非都 *0.5）
window.calcFeedbackTotal = function() {
    let grandTotal = 0;
    const rows = document.querySelectorAll('.feedback-row');
    rows.forEach(row => {
        const area = parseFloat(row.querySelector('.fb-area')?.value) || 0;
        const price = parseFloat(row.querySelector('.fb-price')?.value) || 0;
        const zone = row.querySelector('.fb-zone')?.value;
         
        let subtotal = 0;
        if (zone === '都內') {
            subtotal = area * price * 0.1;
        } else if (zone === '非都') {
            subtotal = area * price * 0.5;
        }
         
        const resultSpan = row.querySelector('.fb-result');
        if (resultSpan) {
            resultSpan.textContent = `NT$ ${Math.round(subtotal).toLocaleString()}`;
        }
        grandTotal += subtotal;
    });

    const grandTotalSpan = document.getElementById('feedback-grand-total');
    if (grandTotalSpan) {
        grandTotalSpan.textContent = `NT$ ${Math.round(grandTotal).toLocaleString()}`;
    }
};

// 四、都內土地代金計算公式（面積 * 0.3 * 公告現值 * 0.5）
window.calcUrbanAltTotal = function() {
    const area = parseFloat(document.getElementById('urban-alt-area')?.value) || 0;
    const price = parseFloat(document.getElementById('urban-alt-price')?.value) || 0;
    const subtotal = area * 0.3 * price * 0.5;
    
    const resultInput = document.getElementById('urban-alt-result');
    if (resultInput) {
        resultInput.value = `NT$ ${Math.round(subtotal).toLocaleString()}`;
    }
};
</script>
