import { getStateSnapshot, persistState } from '../core/state.js'

export function renderVehicles(state) {
  const tbody = document.getElementById('vehicles-tbody')
  if (!tbody) return
  tbody.innerHTML = ''
  for (const v of state.vehicles) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td class="px-3 py-2">${v.id}</td>
      <td class="px-3 py-2">${v.vin}</td>
      <td class="px-3 py-2">${v.mileage.toLocaleString()} km</td>
      <td class="px-3 py-2">${v.lastServiceDate}</td>
      <td class="px-3 py-2">${Math.round((v.health || 0) * 100)}%</td>
      <td class="px-3 py-2">
        <button data-vehicle="${v.id}" class="text-brand-700 hover:underline text-sm btn-service">Mark Serviced</button>
      </td>
    `
    tbody.appendChild(tr)
  }

  document.getElementById('btn-add-vehicle')?.addEventListener('click', addVehicle)
  tbody.querySelectorAll('.btn-service').forEach((btn) => btn.addEventListener('click', markServiced))
}

function addVehicle() {
  const id = `V-${Math.floor(Math.random() * 900 + 100)}`
  const vin = prompt('Enter VIN') || `VIN${Math.random().toString(36).slice(2, 7)}`
  const state = getStateSnapshot()
  state.vehicles.push({ id, vin, mileage: 10000, lastServiceDate: new Date().toISOString().slice(0, 10), health: 0.95, telemetry: { batteryVolts: 12.3, brakeTemp: 200, errorCodes: [] } })
  persistState(state)
  window.location.reload()
}

function markServiced(ev) {
  const id = ev.currentTarget.getAttribute('data-vehicle')
  const state = getStateSnapshot()
  const v = state.vehicles.find((x) => x.id === id)
  if (v) {
    v.lastServiceDate = new Date().toISOString().slice(0, 10)
    v.health = Math.min(1, (v.health || 0.8) + 0.1)
    persistState(state)
    window.location.reload()
  }
}


