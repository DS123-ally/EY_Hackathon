let state = {
  vehicles: [],
  alerts: [],
  geofence: [],
  selectedVehicleId: null,
}

export function sampleData() {
  if (state.vehicles.length) return
  const now = Date.now()
  state.vehicles = Array.from({ length: 42 }).map((_, i) => ({
    id: `VH-${100 + i}`,
    lat: 28.61 + (Math.random() - 0.5) * 0.4,
    lng: 77.21 + (Math.random() - 0.5) * 0.4,
    speed: Math.round(Math.random() * 90),
    engine: Math.random() > 0.1 ? 'On' : 'Off',
    fuel: Math.round(20 + Math.random() * 80),
    battery: Math.round(70 + Math.random() * 30),
    health: randStatus(),
    driverScore: randDriverScore(),
    lastMaintenance: new Date(now - Math.random() * 60 * 86400000).toISOString().slice(0, 10),
    alerts: Math.random() > 0.8 ? ['Engine Temp High'] : [],
    sensors: seedSensors(),
  }))
  state.alerts = Array.from({ length: 10 }).map(() => randAlert())
  state.geofence = Array.from({ length: 12 }).map(() => randFence())
}

export function getState() { return state }
export function getSelectedVehicle() { return state.vehicles.find((v) => v.id === state.selectedVehicleId) }
export function setSelectedVehicle(id) { state.selectedVehicleId = id }

export function startTicker(cb) {
  setInterval(() => {
    // light random updates
    for (const v of state.vehicles) {
      v.speed = Math.max(0, Math.min(120, v.speed + Math.round((Math.random() - 0.5) * 10)))
      v.fuel = Math.max(0, Math.min(100, v.fuel - Math.random() * 0.5))
      v.lat += (Math.random() - 0.5) * 0.001
      v.lng += (Math.random() - 0.5) * 0.001
      v.pof = calculatePoFRisk(v)
      if (Math.random() > 0.98) state.alerts.unshift(randAlert())
      if (Math.random() > 0.97) state.geofence.unshift(randFence())
    }
    cb?.()
  }, 3000)
}

function randStatus() {
  const r = Math.random()
  if (r > 0.85) return 'critical'
  if (r > 0.6) return 'warning'
  return 'healthy'
}

function seedSensors() {
  return {
    engineTemp: 70 + Math.random() * 40,
    oilPressure: 40 + Math.random() * 30,
    tirePressure: 30 + Math.random() * 10,
    fuelConsumption: 5 + Math.random() * 10,
    gpsSpeed: Math.random() * 100,
    errorCodes: Math.random() > 0.85 ? ['P0300'] : [],
  }
}

function randAlert() {
  const severities = ['Critical', 'Warning', 'Info']
  const msgs = ['Engine Temp High', 'Low Tire Pressure', 'Maintenance Due', 'Battery Low', 'GeoFence Exit']
  const s = severities[Math.floor(Math.random() * severities.length)]
  const m = msgs[Math.floor(Math.random() * msgs.length)]
  return { id: Math.random().toString(36).slice(2, 8), ts: Date.now(), severity: s, message: m, vehicleId: `VH-${100 + Math.floor(Math.random() * 42)}` }
}

export function calculatePoFRisk(v) {
  // Probability of Failure scoring 0-100 using simple heuristic
  const ageFactor = daysSince(v.lastMaintenance) / 90 // >90d increases risk
  const tempFactor = clamp((v.sensors.engineTemp - 80) / 40, 0, 1)
  const oilFactor = clamp((60 - v.sensors.oilPressure) / 40, 0, 1)
  const tireFactor = clamp(Math.abs(36 - v.sensors.tirePressure) / 20, 0, 1)
  const errorFactor = (v.sensors.errorCodes || []).length > 0 ? 1 : 0
  const healthFactor = v.health === 'critical' ? 1 : v.health === 'warning' ? 0.5 : 0.1
  const base = 20 * ageFactor + 25 * tempFactor + 15 * oilFactor + 10 * tireFactor + 20 * errorFactor + 10 * healthFactor
  return Math.max(0, Math.min(100, Math.round(base)))
}

function daysSince(iso) { return (Date.now() - new Date(iso).getTime()) / 86400000 }
function clamp(x, a, b) { return Math.max(a, Math.min(b, x)) }

function randDriverScore() {
  const options = ['A+', 'A', 'B', 'C']
  const r = Math.random()
  if (r > 0.85) return 'C'
  if (r > 0.6) return 'B'
  if (r > 0.3) return 'A'
  return 'A+'
}

function randFence() {
  const types = ['Enter', 'Exit', 'Violation']
  const t = types[Math.floor(Math.random() * types.length)]
  return { id: Math.random().toString(36).slice(2, 8), ts: Date.now(), type: t, zone: `Zone-${1 + Math.floor(Math.random() * 5)}`, vehicleId: `VH-${100 + Math.floor(Math.random() * 42)}` }
}


