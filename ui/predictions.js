import { getStateSnapshot, persistState } from '../core/state.js'
import { AgentMaster } from '../core/agents/master.js'

export function renderPredictions(state) {
  const tbody = document.getElementById('predictions-tbody')
  if (!tbody) return
  tbody.innerHTML = ''
  for (const p of state.predictions) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td class="px-3 py-2">${p.vehicleId}</td>
      <td class="px-3 py-2">${p.component}</td>
      <td class="px-3 py-2">${Math.round(p.risk * 100)}%</td>
      <td class="px-3 py-2">${Math.round(p.confidence * 100)}%</td>
      <td class="px-3 py-2">${p.etaDays} days</td>
      <td class="px-3 py-2"><button class="text-sm text-brand-700 hover:underline btn-schedule" data-vehicle="${p.vehicleId}" data-component="${p.component}">Schedule</button></td>
    `
    tbody.appendChild(tr)
  }

  document.getElementById('btn-run-predictions')?.addEventListener('click', async () => {
    const master = new AgentMaster({ onEvent: () => {} })
    await master.runCycle()
    window.location.reload()
  })

  tbody.querySelectorAll('.btn-schedule').forEach((b) => b.addEventListener('click', manualSchedule))
}

function manualSchedule(ev) {
  const vehicleId = ev.currentTarget.getAttribute('data-vehicle')
  const component = ev.currentTarget.getAttribute('data-component')
  const date = prompt('Enter service date (YYYY-MM-DD)', new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10))
  if (!date) return
  const state = getStateSnapshot()
  const anyTech = state.technicians[0]
  state.schedule.push({ id: `JOB-${Math.random().toString(36).slice(2, 8)}`, vehicleId, component, date, techId: anyTech.id, status: 'Scheduled', risk: 0.5 })
  persistState(state)
  window.location.reload()
}


