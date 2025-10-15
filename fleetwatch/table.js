import { getState } from './data.js'

export function renderTable(onClick) {
  const table = document.getElementById('fw-table')
  if (!table) return
  const { vehicles } = getState()
  const q = (document.getElementById('tbl-search')?.value || '').toLowerCase()
  const f = document.getElementById('tbl-filter')?.value || 'all'
  const filtered = vehicles.filter((v) => (
    (!q || v.id.toLowerCase().includes(q)) && (f === 'all' || v.health === f)
  ))
  const rows = filtered.map((v) => `
    <tr class="${v.health === 'critical' ? 'bg-red-50 dark:bg-red-900/20' : ''} hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" data-id="${v.id}">
      <td class="px-3 py-2">${v.id}</td>
      <td class="px-3 py-2">${v.speed} km/h</td>
      <td class="px-3 py-2">${v.engine}</td>
      <td class="px-3 py-2">${v.fuel}%</td>
      <td class="px-3 py-2">${v.battery}%</td>
      <td class="px-3 py-2">${v.driverScore}</td>
      <td class="px-3 py-2">${v.lastMaintenance}</td>
      <td class="px-3 py-2">${(v.alerts||[]).join(', ') || '-'}</td>
    </tr>`).join('')
  table.innerHTML = `
    <thead class="text-left text-slate-500">
      <tr>
        <th class="px-3 py-2">Vehicle ID</th>
        <th class="px-3 py-2">Speed</th>
        <th class="px-3 py-2">Engine</th>
        <th class="px-3 py-2">Fuel</th>
        <th class="px-3 py-2">Battery</th>
        <th class="px-3 py-2">Driver Score</th>
        <th class="px-3 py-2">Last Maintenance</th>
        <th class="px-3 py-2">Alerts</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">${rows}</tbody>`

  table.querySelectorAll('tbody tr').forEach((tr) => tr.addEventListener('click', () => {
    const id = tr.getAttribute('data-id')
    const v = getState().vehicles.find((x) => x.id === id)
    onClick?.(v)
  }))

  document.getElementById('tbl-search')?.addEventListener('input', () => renderTable(onClick))
  document.getElementById('tbl-filter')?.addEventListener('change', () => renderTable(onClick))
}


