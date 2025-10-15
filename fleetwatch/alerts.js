import { getState } from './data.js'

export function renderAlerts() {
  const wrap = document.getElementById('fw-alerts')
  if (!wrap) return
  const { alerts } = getState()
  wrap.innerHTML = ''
  for (const a of alerts.slice(0, 30)) {
    const cls = a.severity === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' : a.severity === 'Warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' : 'bg-slate-100 dark:bg-slate-800'
    const div = document.createElement('div')
    div.className = `p-2 rounded border border-slate-200 dark:border-slate-700 ${cls}`
    div.innerHTML = `
      <div class="text-sm flex items-center justify-between">
        <div>${new Date(a.ts).toLocaleTimeString()} · ${a.severity} · ${a.message} · ${a.vehicleId}</div>
        <div class="flex items-center gap-2">
          <button class="text-xs underline">Resolve</button>
          <button class="text-xs underline">Contact Driver</button>
          <button class="text-xs underline">Coach</button>
        </div>
      </div>
    `
    wrap.appendChild(div)
  }
}


