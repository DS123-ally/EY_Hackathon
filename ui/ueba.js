export function renderUEBA(state) {
  const wrap = document.getElementById('ueba-events')
  if (!wrap) return
  wrap.innerHTML = ''
  const events = JSON.parse(localStorage.getItem('uebaEvents') || '[]').slice(-50).reverse()
  for (const e of events) {
    const div = document.createElement('div')
    div.className = 'p-2 rounded-md border border-slate-200'
    const badge = badgeFor(e.severity)
    div.innerHTML = `
      <div class="text-sm flex items-center gap-2">
        ${badge}
        <span>${new Date(e.ts).toLocaleString()} · ${e.detail}</span>
      </div>
    `
    wrap.appendChild(div)
  }
  document.getElementById('btn-simulate-ueba')?.addEventListener('click', simulate)
}

function badgeFor(sev) {
  const map = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-emerald-100 text-emerald-700', info: 'bg-slate-100 text-slate-700' }
  const cls = map[sev] || map.info
  return `<span class="text-xs px-2 py-0.5 rounded ${cls}">${sev}</span>`
}

function simulate() {
  const stored = JSON.parse(localStorage.getItem('uebaEvents') || '[]')
  stored.push({ ts: Date.now(), policyId: 'POL-TEST', severity: 'medium', detail: 'Simulated policy breach by user action' })
  localStorage.setItem('uebaEvents', JSON.stringify(stored))
  window.location.reload()
}


