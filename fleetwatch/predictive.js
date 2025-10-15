import { getState } from './data.js'

export function renderPredictiveTop5() {
  const wrap = document.getElementById('fw-predictive')
  if (!wrap) return
  const { vehicles } = getState()
  const top = [...vehicles].map((v) => ({ id: v.id, pof: v.pof || 0, health: v.health })).sort((a, b) => b.pof - a.pof).slice(0, 5)
  wrap.innerHTML = ''
  for (const t of top) {
    const row = document.createElement('div')
    row.className = 'p-2 rounded border border-emerald-900/40 flex items-center justify-between'
    row.innerHTML = `
      <div class="text-sm">${t.id} · <span class="text-slate-400">${t.health}</span></div>
      <div class="text-sm font-semibold">PoF ${t.pof}</div>
    `
    wrap.appendChild(row)
  }
}


