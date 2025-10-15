import { getStateSnapshot, persistState } from '../core/state.js'

export function renderScheduler(state) {
  const list = document.getElementById('schedule-list')
  if (!list) return
  list.innerHTML = ''
  const sorted = [...state.schedule].sort((a, b) => a.date.localeCompare(b.date))
  for (const j of sorted) {
    const div = document.createElement('div')
    div.className = 'p-3 rounded-md border border-slate-200'
    div.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="text-sm">
          <div class="font-medium">${j.id} · ${j.vehicleId} · ${j.component}</div>
          <div class="text-slate-500">${j.date} · tech ${j.techId} · risk ${Math.round((j.risk || 0) * 100)}%</div>
        </div>
        <div class="flex items-center gap-2">
          <select data-job="${j.id}" class="px-2 py-1 border border-slate-300 rounded-md text-sm">
            <option ${j.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
            <option ${j.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option ${j.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option ${j.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
          <button data-del="${j.id}" class="text-xs text-red-700 hover:underline">Delete</button>
        </div>
      </div>
    `
    list.appendChild(div)
  }

  document.getElementById('btn-optimize')?.addEventListener('click', optimizeNow)
  list.querySelectorAll('select').forEach((s) => s.addEventListener('change', onStatusChange))
  list.querySelectorAll('[data-del]')?.forEach((b) => b.addEventListener('click', onDelete))

  renderCapacityBars(state)
}

function onStatusChange(ev) {
  const id = ev.currentTarget.getAttribute('data-job')
  const value = ev.currentTarget.value
  const state = getStateSnapshot()
  const job = state.schedule.find((x) => x.id === id)
  if (job) job.status = value
  persistState(state)
}

function onDelete(ev) {
  const id = ev.currentTarget.getAttribute('data-del')
  const state = getStateSnapshot()
  state.schedule = state.schedule.filter((x) => x.id !== id)
  persistState(state)
  window.location.reload()
}

function optimizeNow() {
  // Simple heuristic: move unscheduled high-risk to earlier dates if capacity
  const state = getStateSnapshot()
  state.schedule.sort((a, b) => b.risk - a.risk)
  persistState(state)
  window.location.reload()
}

function renderCapacityBars(state) {
  const wrap = document.getElementById('capacity-bars')
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


