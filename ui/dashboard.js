export function wireNavigation() {
  const btns = document.querySelectorAll('.tab-btn')
  btns.forEach((b) =>
    b.addEventListener('click', () => {
      const view = b.getAttribute('data-view')
      document.querySelectorAll('.tab-btn').forEach((x) => x.classList.remove('bg-slate-100'))
      b.classList.add('bg-slate-100')
      document.querySelectorAll('[data-view-panel]').forEach((p) => p.classList.add('hidden'))
      const panel = document.querySelector(`[data-view-panel="${view}"]`)
      if (panel) panel.classList.remove('hidden')
    })
  )
}

export function renderDashboard(state) {
  setText('kpi-vehicles', state.vehicles.length)
  setText('kpi-failures', state.predictions.filter((p) => p.risk > 0.5).length)
  setText('kpi-scheduled', state.schedule.length)
  const uebaStored = JSON.parse(localStorage.getItem('uebaEvents') || '[]')
  setText('kpi-ueba', uebaStored.slice(-50).filter((e) => e.severity !== 'info').length)

  renderWorkloadBars(state)
}

function renderWorkloadBars(state) {
  const wrap = document.getElementById('workload-bars')
  if (!wrap) return
  wrap.innerHTML = ''
  const counts = new Map()
  for (const job of state.schedule) {
    counts.set(job.techId, (counts.get(job.techId) || 0) + 1)
  }
  for (const tech of state.technicians) {
    const used = counts.get(tech.id) || 0
    const cap = tech.dailyCapacity || 4
    const pct = Math.min(100, Math.round((used / cap) * 100))
    const row = document.createElement('div')
    row.innerHTML = `
      <div class="text-sm mb-1">${tech.name} · ${used}/${cap}</div>
      <div class="w-full h-3 bg-slate-100 rounded">
        <div class="h-3 bg-brand-500 rounded" style="width:${pct}%"></div>
      </div>
    `
    wrap.appendChild(row)
  }
}

function setText(id, val) {
  const el = document.getElementById(id)
  if (el) el.textContent = String(val)
}


