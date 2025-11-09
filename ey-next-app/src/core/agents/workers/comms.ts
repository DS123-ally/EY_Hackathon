export class CommsAgent {
    constructor(private emit: (msg: string) => void) {}
  
    async notify(schedule: any[]) {
      const events = [];
      const upcoming = schedule.filter((j) => j.status === 'Scheduled');
      for (const job of upcoming.slice(0, 5)) {
        const text = `Service scheduled on ${job.date} for vehicle ${job.vehicleId} (${job.component}).`;
        this.notifySingle(text);
        this.speak(text);
        events.push(text);
      }
      this.emit('Comms worker finished');
      return events;
    }
  
    public notifySingle(text: string) {
      try {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Maintenance Update', { body: text });
        }
      } catch {}
    }
  
    public speak(text: string) {
      try {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(text);
          u.rate = 1;
          u.pitch = 1;
          window.speechSynthesis.speak(u);
        }
      } catch {}
    }
  }