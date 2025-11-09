
import { PredictionAgent } from './workers/prediction';
import { SchedulerAgent } from './workers/scheduler';
import { CommsAgent } from './workers/comms';
import { RcaCapaAgent } from './workers/rca_capa';
import { UebaAgent } from './workers/ueba';
import { AppState } from '../state';

export class AgentMaster {
  private prediction: PredictionAgent;
  private scheduler: SchedulerAgent;
  private comms: CommsAgent;
  private rca: RcaCapaAgent;
  private ueba: UebaAgent;

  constructor(private dispatch: React.Dispatch<React.SetStateAction<AppState>>) {
    this.prediction = new PredictionAgent(this.emit.bind(this));
    this.scheduler = new SchedulerAgent(this.emit.bind(this));
    this.comms = new CommsAgent(this.emit.bind(this));
    this.rca = new RcaCapaAgent(this.emit.bind(this));
    this.ueba = new UebaAgent(this.emit.bind(this));
  }

  public async runCycle(state: AppState) {
    this.emit('Master: cycle started');
    
    // 1) Predict
    const predictions = await this.prediction.run(state);
    this.dispatch(s => ({ ...s, predictions }));
    this.emit(`Prediction: ${predictions.length} risks identified`);

    // 2) Schedule
    const schedule = await this.scheduler.optimize(state, predictions);
    this.dispatch(s => ({ ...s, schedule }));
    this.emit(`Scheduler: ${schedule.length} jobs updated`);

    // 3) RCA/CAPA on high-risk
    const rcaUpdates = await this.rca.process(predictions);
    this.dispatch(s => ({ ...s, ...rcaUpdates }));

    // 4) Comms to customers for booked jobs
    const commsEvents = await this.comms.notify(schedule);
    this.emit(`Comms: ${commsEvents.length} notifications queued`);

    // 5) UEBA sample
    this.sampleUEBA();
    this.emit('Master: cycle completed');
  }

  public sampleUEBA() {
    const events = this.ueba.sample();
    if (events.length) {
      this.emit(`UEBA: ${events.length} events`);
    }
  }

  private emit(msg: string) {
    this.dispatch(s => ({ ...s, events: [...s.events, msg] }));
  }
}
