import { getState } from './data.js'

let charts = {}

export function renderAnalytics() {
  const fuel = document.getElementById('ch-fuel')
  const costs = document.getElementById('ch-costs')
  const failures = document.getElementById('ch-failures')
  const uptime = document.getElementById('ch-uptime')
  if (!fuel || !costs || !failures || !uptime) return

  const labels = Array.from({ length: 12 }).map((_, i) => `M${i + 1}`)
  const fuelData = labels.map(() => 10 + Math.random() * 5)
  const costData = labels.map(() => 50 + Math.random() * 20)
  const failData = labels.map(() => Math.random() * 10)
  const upData = labels.map(() => 95 + Math.random() * 5)

  charts.fuel?.destroy(); charts.costs?.destroy(); charts.failures?.destroy(); charts.uptime?.destroy()
  charts.fuel = new Chart(fuel, { type: 'line', data: { labels, datasets: [{ label: 'Fuel Efficiency (km/l)', data: fuelData, borderColor: '#0ea5e9' }] }, options: { responsive: true, scales: { y: { beginAtZero: false } } } })
  charts.costs = new Chart(costs, { type: 'bar', data: { labels, datasets: [{ label: 'Maintenance Cost (k$)', data: costData, backgroundColor: '#10b981' }] }, options: { responsive: true } })
  charts.failures = new Chart(failures, { type: 'bar', data: { labels, datasets: [{ label: 'Sensor Failures', data: failData, backgroundColor: '#f59e0b' }] }, options: { responsive: true } })
  charts.uptime = new Chart(uptime, { type: 'line', data: { labels, datasets: [{ label: 'Uptime (%)', data: upData, borderColor: '#22c55e' }] }, options: { responsive: true, scales: { y: { min: 0, max: 100 } } } })
}


