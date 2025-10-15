import { PredictionAgent } from './workers/prediction.js'
import { SchedulerAgent } from './workers/scheduler.js'
import { CommsAgent } from './workers/comms.js'
import { RcaCapaAgent } from './workers/rca_capa.js'
import { UebaAgent } from './workers/ueba.js'
import { getStateSnapshot, updateState } from '../../state.js'

export class AgentMaster {
  constructor({ onEvent }) {
    this.onEvent = onEvent || (() => {})
    this.prediction = new PredictionAgent(this._emit.bind(this))
    this.scheduler = new SchedulerAgent(this._emit.bind(this))
    this.comms = new CommsAgent(this._emit.bind(this))
    this.rca = new RcaCapaAgent(this._emit.bind(this))
    this.ueba = new UebaAgent(this._emit.bind(this))
  }

  async runCycle() {
    this._emit('Master: cycle started')
    const state = getStateSnapshot()
    // 1) Predict
    const predictions = await this.prediction.run(state)
    updateState({ predictions })
    this._emit(`Prediction: ${predictions.length} risks identified`)
    // 2) Schedule
    const schedule = await this.scheduler.optimize(state, predictions)
    updateState({ schedule })
    this._emit(`Scheduler: ${schedule.length} jobs updated`)
    // 3) RCA/CAPA on high-risk
    const rcaUpdates = await this.rca.process(predictions)
    updateState(rcaUpdates)
    // 4) Comms to customers for booked jobs
    const commsEvents = await this.comms.notify(schedule)
    this._emit(`Comms: ${commsEvents.length} notifications queued`)
    // 5) UEBA sample
    this.sampleUEBA()
    this._emit('Master: cycle completed')
  }

  sampleUEBA() {
    const events = this.ueba.sample()
    if (events.length) this._emit(`UEBA: ${events.length} events`)
  }

  _emit(msg) {
    this.onEvent(msg)
  }
}

