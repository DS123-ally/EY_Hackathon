
import { AppState } from '../../state';

export class SchedulerAgent {
    constructor(private emit: (msg: string) => void) {}
  
    async optimize(state: AppState, predictions: any[]) {
      // Simple greedy: sort by risk, assign to earliest tech with capacity
      const technicians = [...state.technicians];
      const schedule = [...state.schedule];
      const today = new Date();
      const dateKey = (d: Date) => d.toISOString().slice(0, 10);
  
      const capacityByTech = new Map();
      for (const t of technicians) capacityByTech.set(t.id, t.dailyCapacity || 4);
  
      const loadByTechDate = new Map(); // key: `${techId}:${date}` -> count
      for (const job of schedule) {
        const key = `${job.techId}:${job.date}`;
        loadByTechDate.set(key, (loadByTechDate.get(key) || 0) + 1);
      }
  
      const sorted = [...predictions].sort((a, b) => b.risk - a.risk);
      for (const p of sorted) {
        // Skip if already scheduled for this vehicle/component
        if (schedule.some((j) => j.vehicleId === p.vehicleId && j.component === p.component)) continue;
        let assigned = false;
        for (let dayOffset = 0; dayOffset < 14 && !assigned; dayOffset++) {
          const date = new Date(today.getTime() + dayOffset * 86400000);
          const day = dateKey(date);
          for (const tech of technicians) {
            const key = `${tech.id}:${day}`;
            const current = loadByTechDate.get(key) || 0;
            const cap = capacityByTech.get(tech.id) || 4;
            if (current < cap) {
              const job = {
                id: `JOB-${Math.random().toString(36).slice(2, 8)}`,
                vehicleId: p.vehicleId,
                component: p.component,
                date: day,
                techId: tech.id,
                status: 'Scheduled',
                risk: p.risk,
              };
              schedule.push(job);
              loadByTechDate.set(key, current + 1);
              assigned = true;
              break;
            }
          }
        }
      }
      this.emit('Scheduler worker finished');
      return schedule;
    }
  }
  