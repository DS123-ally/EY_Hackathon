import { getState } from './data.js'

export function renderGeofence() {
  const wrap = document.getElementById('fw-geofence')
  if (!wrap) return
  const { geofence } = getState()
  wrap.innerHTML = ''
  for (const e of geofence.slice(0, 30)) {
    const sevCls = e.type === 'Violation' ? 'text-red-400' : e.type === 'Exit' ? 'text-amber-300' : 'text-emerald-300'
    const row = document.createElement('div')
    row.className = 'text-sm p-2 rounded border border-emerald-900/40 flex items-center justify-between'
    row.innerHTML = `
      <div>${new Date(e.ts).toLocaleTimeString()} · <span class="${sevCls}">${e.type}</span> · ${e.zone} · ${e.vehicleId}</div>
      <div class="flex items-center gap-2">
        <button class="text-xs underline">View</button>
        <button class="text-xs underline">Acknowledge</button>
      </div>
    `
    wrap.appendChild(row)
  }
}


