import { getState } from './data.js'

export function renderLeaderboard() {
  const wrap = document.getElementById('fw-leaderboard')
  if (!wrap) return
  const { vehicles } = getState()
  const scored = vehicles.map((v) => ({ id: v.id, score: scoreValue(v.driverScore) }))
  const best = [...scored].sort((a, b) => b.score - a.score).slice(0, 5)
  const worst = [...scored].sort((a, b) => a.score - b.score).slice(0, 5)
  wrap.innerHTML = ''
  wrap.appendChild(section('Top Drivers', best, 'up'))
  wrap.appendChild(section('Needs Coaching', worst, 'down'))
}

export function assignCoachingTip() {
  alert('Assigned coaching tip to drivers in the Needs Coaching list (mock).')
}

function section(title, list, trend) {
  const div = document.createElement('div')
  div.className = 'border border-emerald-900/40 rounded p-2'
  const rows = list.map((x) => `<div class="flex items-center justify-between text-sm"><span>${x.id}</span><span>${trendIcon(trend)} ${x.score}</span></div>`).join('')
  div.innerHTML = `<div class="text-xs text-slate-400 mb-1">${title}</div>${rows}`
  return div
}

function scoreValue(grade) {
  return grade === 'A+' ? 100 : grade === 'A' ? 90 : grade === 'B' ? 75 : 60
}

function trendIcon(t) { return t === 'up' ? '▲' : '▼' }


