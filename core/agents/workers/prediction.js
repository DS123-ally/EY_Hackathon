import { getStateSnapshot } from '../../../core/state.js'

export class PredictionAgent {
  constructor(emit) {
    this.emit = emit
  }

  async run(state = getStateSnapshot()) {
    // Simple heuristic: combine mileage, last service age, error codes
    const now = Date.now()
    const results = []
    for (const v of state.vehicles) {
      const daysSinceService = (now - new Date(v.lastServiceDate).getTime()) / (1000 * 3600 * 24)
      const sensor = v.telemetry || {}
      const errorCount = (sensor.errorCodes || []).length
      const wearScore = (v.mileage / 10000) + (daysSinceService / 90) + errorCount * 1.5 + (1 - (v.health || 0)) * 3
      const risk = Math.min(0.99, wearScore / 6)

      if (risk > 0.35) {
        const component = this._selectComponent(sensor)
        const etaDays = Math.max(1, Math.round(30 * (1 - risk)))
        results.push({ vehicleId: v.id, component, risk, confidence: 0.55 + risk * 0.4, etaDays })
      }
    }
    this.emit('Prediction worker finished')
    return results.sort((a, b) => b.risk - a.risk)
  }

  _selectComponent(sensor) {
    const candidates = ['Brake Pads', 'Battery', 'Oil System', 'Cooling', 'Transmission']
    if ((sensor.errorCodes || []).includes('P0420')) return 'Catalytic Converter'
    if (sensor.brakeTemp && sensor.brakeTemp > 300) return 'Brake Pads'
    if (sensor.batteryVolts && sensor.batteryVolts < 11.8) return 'Battery'
    return candidates[Math.floor(Math.random() * candidates.length)]
  }
}

