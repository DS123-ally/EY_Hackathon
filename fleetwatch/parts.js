import { getState } from './data.js'

export function renderParts() {
  const wrap = document.getElementById('fw-parts')
  if (!wrap) return
  const critical = getState().vehicles.filter((v) => (v.pof || 0) > 60)
  const needs = tally(critical.map((v) => suggestPart(v)))
  wrap.innerHTML = ''
  for (const [part, qty] of Object.entries(needs)) {
    const row = document.createElement('div')
    row.className = 'p-2 border border-emerald-900/40 rounded flex items-center justify-between'
    row.innerHTML = `<span>${part}</span><span class="text-slate-400">${qty} needed</span>`
    wrap.appendChild(row)
  }
  if (!Object.keys(needs).length) wrap.innerHTML = '<div class="text-slate-400">No urgent parts required.</div>'
}

function suggestPart(v) {
  const comps = ['Brake Pads', 'Battery', 'Oil Filter', 'Coolant Hose', 'Spark Plugs']
  return comps[Math.floor(Math.random() * comps.length)]
}

function tally(arr) {
  const map = {}
  for (const a of arr) map[a] = (map[a] || 0) + 1
  return map
}


