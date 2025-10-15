import { getState } from './data.js'

export function renderVehiclesPanel(onClick) {
  const table = document.getElementById('fw-vehicles-table')
  if (!table) return
  const { vehicles } = getState()
  const rows = vehicles.map((v) => `
    <tr class="${v.health === 'critical' ? 'bg-red-900/20' : ''} hover:bg-emerald-900/10 cursor-pointer" data-id="${v.id}">
      <td class="px-3 py-2">${v.id}</td>
      <td class="px-3 py-2">${v.engine}</td>
      <td class="px-3 py-2">${v.speed} km/h</td>
      <td class="px-3 py-2">${v.fuel}%</td>
      <td class="px-3 py-2">${v.health}</td>
      <td class="px-3 py-2">${v.lastMaintenance}</td>
    </tr>`).join('')
  table.innerHTML = `
    <thead class="text-left text-slate-400">
      <tr>
        <th class="px-3 py-2">Vehicle ID</th>
        <th class="px-3 py-2">Engine</th>
        <th class="px-3 py-2">Speed</th>
        <th class="px-3 py-2">Fuel</th>
        <th class="px-3 py-2">Health</th>
        <th class="px-3 py-2">Last Maintenance</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-emerald-900/30">${rows}</tbody>`
  table.querySelectorAll('tbody tr').forEach((tr) => tr.addEventListener('click', () => {
    const id = tr.getAttribute('data-id')
    const v = getState().vehicles.find((x) => x.id === id)
    onClick?.(v)
  }))
}

export function wireVehiclesTools() {
  document.getElementById('btn-export-csv')?.addEventListener('click', exportCsv)
  document.getElementById('btn-simulate-telem')?.addEventListener('click', simulateSpike)
  document.getElementById('btn-bulk-maint')?.addEventListener('click', () => alert('Maintenance requests queued for filtered vehicles.'))
  document.getElementById('btn-flag-critical')?.addEventListener('click', flagCritical)
}

function exportCsv() {
  const { vehicles } = getState()
  const header = ['id','engine','speed','fuel','health','lastMaintenance']
  const rows = vehicles.map((v) => [v.id, v.engine, v.speed, v.fuel, v.health, v.lastMaintenance].join(','))
  const blob = new Blob([[header.join(',')].concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = 'fleet.csv'; a.click(); URL.revokeObjectURL(url)
}

function simulateSpike() {
  const { vehicles } = getState()
  const v = vehicles[Math.floor(Math.random() * vehicles.length)]
  if (v) {
    v.sensors.engineTemp = 120
    v.health = 'warning'
    alert(`Simulated telemetry spike on ${v.id}`)
  }
}

function flagCritical() {
  const { vehicles } = getState()
  const v = vehicles[Math.floor(Math.random() * vehicles.length)]
  if (v) {
    v.health = 'critical'
    v.alerts = Array.from(new Set([...(v.alerts||[]), 'Maintenance Due']))
    alert(`Flagged ${v.id} as critical`)
  }
}


