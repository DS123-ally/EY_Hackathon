import { getState } from './data.js'

export function renderOverview() {
  const { vehicles } = getState()
  const wrap = document.getElementById('fw-overview-cards')
  if (!wrap) return
  const total = vehicles.length
  const online = vehicles.filter((v) => v.engine === 'On').length
  const critical = vehicles.filter((v) => v.health === 'critical').length
  const warning = vehicles.filter((v) => v.health === 'warning').length
  const healthy = total - critical - warning
  const avgFuel = Math.round(vehicles.reduce((a, v) => a + v.fuel, 0) / Math.max(1, total))
  const maintenanceDue = vehicles.filter((v) => v.alerts.includes('Maintenance Due')).length
  const fleetRisk = Math.round(vehicles.reduce((a, v) => a + (v.pof || 0), 0) / Math.max(1, total))

  const cards = [
    { label: 'Fleet Risk Score', value: fleetRisk, color: 'bg-emerald-900/20 border border-emerald-900/40' },
    { label: 'Total Vehicles', value: total, color: 'bg-slate-100 dark:bg-slate-700' },
    { label: 'Vehicles Online', value: online, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
    { label: 'Vehicles with Alerts', value: critical + warning, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
    { label: 'Average Fuel %', value: `${avgFuel}%`, color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200' },
    { label: 'Maintenance Due', value: maintenanceDue, color: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200' },
    { label: 'Healthy', value: healthy, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  ]
  wrap.innerHTML = ''
  for (const c of cards) {
    const div = document.createElement('div')
    div.className = `rounded p-3 border border-slate-200 dark:border-slate-700 ${c.color}`
    div.innerHTML = `<div class="text-xs">${c.label}</div><div class="text-2xl font-semibold">${c.value}</div>`
    wrap.appendChild(div)
  }
}


