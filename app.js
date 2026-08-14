// ----- SmartSpend - vanilla JS expense tracker -----
// data model: { id, title, amount, type, category, date }

const STORAGE_KEY = 'smartspend.tx.v1';
const THEME_KEY   = 'smartspend.theme';

// ---- state ----
let txs = load();
let filter = { type: 'all', cat: 'all', q: '' };

// ---- DOM refs ----
const $ = (s) => document.querySelector(s);
const form        = $('#txForm');
const list        = $('#txList');
const empty       = $('#empty');
const chart       = $('#chart');
const totalInc    = $('#totalIncome');
const totalExp    = $('#totalExpense');
const balanceEl   = $('#balance');
const filterType  = $('#filterType');
const filterCat   = $('#filterCat');
const searchInp   = $('#search');
const themeBtn    = $('#themeBtn');

// ---- init ----
initTheme();
form.date.value = new Date().toISOString().slice(0, 10);
render();