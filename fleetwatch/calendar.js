let current = new Date()

export function renderCalendar() {
  const wrap = document.getElementById('fw-calendar')
  const monthEl = document.getElementById('cal-month')
  if (!wrap || !monthEl) return
  const y = current.getFullYear(), m = current.getMonth()
  monthEl.textContent = current.toLocaleString(undefined, { month: 'long', year: 'numeric' })
  const first = new Date(y, m, 1)
  const startDay = first.getDay()
  const days = new Date(y, m + 1, 0).getDate()
  wrap.innerHTML = ''
  for (let i = 0; i < startDay; i++) wrap.appendChild(blank())
  for (let d = 1; d <= days; d++) wrap.appendChild(dayCell(d))
}

export function wireCalendar() {
  document.getElementById('cal-prev')?.addEventListener('click', () => { current = new Date(current.getFullYear(), current.getMonth() - 1, 1); renderCalendar() })
  document.getElementById('cal-next')?.addEventListener('click', () => { current = new Date(current.getFullYear(), current.getMonth() + 1, 1); renderCalendar() })
}

function blank() { const d = document.createElement('div'); d.className = 'h-24 border border-emerald-900/30 rounded'; return d }
function dayCell(day) {
  const d = document.createElement('div')
  d.className = 'h-24 border border-emerald-900/30 rounded p-1 text-xs'
  d.innerHTML = `<div class="text-slate-400">${day}</div>`
  d.draggable = true
  d.addEventListener('dragstart', (e) => e.dataTransfer?.setData('text/plain', `JOB-${day}`))
  d.addEventListener('dragover', (e) => e.preventDefault())
  d.addEventListener('drop', () => alert(`Rescheduled item to ${current.getFullYear()}-${String(current.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`))
  return d
}


