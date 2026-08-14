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


// ---- events ----
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const tx = {
    id: Date.now().toString(),
    title: (fd.get('title') || '').toString().trim(),
    amount: Number(fd.get('amount')),
    type: fd.get('type'),
    category: fd.get('category'),
    date: fd.get('date'),
  };
  if (!tx.title || !tx.amount || tx.amount <= 0) return;
  txs.unshift(tx);
  save();
  form.reset();
  form.date.value = new Date().toISOString().slice(0, 10);
  render();
});

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-del]');
  if (!btn) return;
  txs = txs.filter((t) => t.id !== btn.dataset.del);
  save();
  render();
});

filterType.addEventListener('change', () => { filter.type = filterType.value; render(); });
filterCat.addEventListener('change', () => { filter.cat = filterCat.value; render(); });
searchInp.addEventListener('input', () => { filter.q = searchInp.value.toLowerCase(); render(); });

themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(cur);
});