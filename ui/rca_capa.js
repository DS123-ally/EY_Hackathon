import { getStateSnapshot, persistState } from '../core/state.js'

export function renderRcaCapa(state) {
  const rcaList = document.getElementById('rca-list')
  const capaList = document.getElementById('capa-list')
  if (!rcaList || !capaList) return
  rcaList.innerHTML = ''
  capaList.innerHTML = ''

  for (const r of state.rcaCases) {
    const div = document.createElement('div')
    div.className = 'p-3 rounded-md border border-slate-200'
    div.innerHTML = `
      <div class="font-medium text-sm">${r.id} · ${r.vehicleId}</div>
      <div class="text-sm text-slate-600">${r.hypothesis}</div>
      <div class="text-xs text-slate-500">Evidence: ${r.evidence.join(', ')}</div>
      <div class="mt-1">
        <select data-rca="${r.id}" class="px-2 py-1 border border-slate-300 rounded-md text-sm">
          <option ${r.status === 'Open' ? 'selected' : ''}>Open</option>
          <option ${r.status === 'Investigating' ? 'selected' : ''}>Investigating</option>
          <option ${r.status === 'Closed' ? 'selected' : ''}>Closed</option>
        </select>
      </div>
    `
    rcaList.appendChild(div)
  }

  for (const c of state.capaActions) {
    const div = document.createElement('div')
    div.className = 'p-3 rounded-md border border-slate-200'
    div.innerHTML = `
      <div class="font-medium text-sm">${c.id} · RCA ${c.rcaId}</div>
      <div class="text-sm text-slate-600">${c.action}</div>
      <div class="text-xs text-slate-500">Owner: ${c.owner} · Due ${c.dueDate}</div>
      <div class="mt-1">
        <select data-capa="${c.id}" class="px-2 py-1 border border-slate-300 rounded-md text-sm">
          <option ${c.status === 'Proposed' ? 'selected' : ''}>Proposed</option>
          <option ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option ${c.status === 'Implemented' ? 'selected' : ''}>Implemented</option>
          <option ${c.status === 'Verified' ? 'selected' : ''}>Verified</option>
        </select>
      </div>
    `
    capaList.appendChild(div)
  }

  document.getElementById('btn-new-rca')?.addEventListener('click', newRca)
  rcaList.querySelectorAll('select').forEach((s) => s.addEventListener('change', onRcaChange))
  capaList.querySelectorAll('select').forEach((s) => s.addEventListener('change', onCapaChange))
}

function newRca() {
  const state = getStateSnapshot()
  state.rcaCases.push({ id: `RCA-${Math.random().toString(36).slice(2, 8)}`, vehicleId: state.vehicles[0]?.id || 'V-NEW', hypothesis: 'Manual RCA', evidence: ['User input'], status: 'Open' })
  persistState(state)
  window.location.reload()
}

function onRcaChange(ev) {
  const id = ev.currentTarget.getAttribute('data-rca')
  const state = getStateSnapshot()
  const r = state.rcaCases.find((x) => x.id === id)
  if (r) r.status = ev.currentTarget.value
  persistState(state)
}

function onCapaChange(ev) {
  const id = ev.currentTarget.getAttribute('data-capa')
  const state = getStateSnapshot()
  const c = state.capaActions.find((x) => x.id === id)
  if (c) c.status = ev.currentTarget.value
  persistState(state)
}


