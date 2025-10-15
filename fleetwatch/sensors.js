import { getState } from './data.js'

export function renderSensorPanel(vehicle) {
  const wrap = document.getElementById('fw-sensor-panel')
  if (!wrap) return
  wrap.innerHTML = ''
  if (!vehicle) {
    wrap.innerHTML = '<div class="text-sm text-slate-500">Select a vehicle from the map or table.</div>'
    return
  }
  const s = vehicle.sensors
  wrap.innerHTML = `
    <div class="text-sm">Vehicle: <span class="font-medium">${vehicle.id}</span></div>
    <div class="grid grid-cols-2 gap-2 mt-2">
      ${gauge('Engine Temp', s.engineTemp, 0, 120)}
      ${gauge('Oil Pressure', s.oilPressure, 0, 100)}
      ${gauge('Tire Pressure', s.tirePressure, 0, 60)}
      ${gauge('Fuel Cons.', s.fuelConsumption, 0, 20)}
      ${progress('Fuel Level', vehicle.fuel)}
      ${progress('Battery Health', vehicle.battery)}
    </div>
    <div class="mt-2 text-sm"><span class="text-slate-500">Error Codes:</span> ${(s.errorCodes||[]).join(', ') || '-'}</div>
  `
}

function gauge(label, value, min, max) {
  const pct = Math.round(((value - min) / (max - min)) * 100)
  return `
    <div class="p-2 rounded border border-slate-200 dark:border-slate-700">
      <div class="text-xs text-slate-500">${label}</div>
      <div class="text-xl font-semibold">${value.toFixed(1)}</div>
      <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded mt-1"><div class="h-2 bg-brand-600 rounded" style="width:${pct}%"></div></div>
    </div>
  `
}

function progress(label, value) {
  return `
    <div class="p-2 rounded border border-slate-200 dark:border-slate-700">
      <div class="text-xs text-slate-500">${label}</div>
      <div class="text-xl font-semibold">${Math.round(value)}%</div>
      <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded mt-1"><div class="h-2 bg-emerald-500 rounded" style="width:${Math.round(value)}%"></div></div>
    </div>
  `
}


