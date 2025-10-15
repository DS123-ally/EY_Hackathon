const LS_KEY = 'agentic-orchestrator-state'

export function seedMockData() {
  const existing = localStorage.getItem(LS_KEY)
  if (existing) return
  const today = new Date().toISOString().slice(0, 10)
  const vehicles = [
    { id: 'V-101', vin: '1FTFW1E55JKD12345', mileage: 58210, lastServiceDate: '2025-06-15', health: 0.78, telemetry: { batteryVolts: 12.1, brakeTemp: 240, errorCodes: [] } },
    { id: 'V-205', vin: '2C4RC1BG3KR123456', mileage: 121330, lastServiceDate: '2025-03-03', health: 0.62, telemetry: { batteryVolts: 11.6, brakeTemp: 320, errorCodes: ['P0420'] } },
    { id: 'V-330', vin: '3GNAXHEV8LS123456', mileage: 40220, lastServiceDate: '2025-08-22', health: 0.9, telemetry: { batteryVolts: 12.5, brakeTemp: 180, errorCodes: [] } },
  ]
  const technicians = [
    { id: 'T-1', name: 'A. Sharma', dailyCapacity: 4 },
    { id: 'T-2', name: 'B. Patel', dailyCapacity: 3 },
    { id: 'T-3', name: 'C. Singh', dailyCapacity: 5 },
  ]
  const schedule = [
    { id: 'JOB-0001', vehicleId: 'V-101', component: 'Oil System', date: today, techId: 'T-1', status: 'Scheduled', risk: 0.3 },
  ]
  const state = { vehicles, technicians, schedule, predictions: [], rcaCases: [], capaActions: [] }
  localStorage.setItem(LS_KEY, JSON.stringify(state))
}

export function getStateSnapshot() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || { vehicles: [], technicians: [], schedule: [], predictions: [], rcaCases: [], capaActions: [] }
  } catch {
    return { vehicles: [], technicians: [], schedule: [], predictions: [], rcaCases: [], capaActions: [] }
  }
}

export function updateState(partial) {
  const state = getStateSnapshot()
  const next = { ...state }
  for (const [k, v] of Object.entries(partial)) {
    if (k === 'rcaCasesAppend') next.rcaCases = [...(next.rcaCases || []), ...v]
    else if (k === 'capaActionsAppend') next.capaActions = [...(next.capaActions || []), ...v]
    else next[k] = v
  }
  persistState(next)
}

export function persistState(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state))
}

