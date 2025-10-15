export class CommsAgent {
    constructor(emit) {
      this.emit = emit
    }
  
    async notify(schedule) {
      const events = []
      const upcoming = schedule.filter((j) => j.status === 'Scheduled')
      for (const job of upcoming.slice(0, 5)) {
        const text = `Service scheduled on ${job.date} for vehicle ${job.vehicleId} (${job.component}).`
        this._notify(text)
        this._speak(text)
        events.push(text)
      }
      this.emit('Comms worker finished')
      return events
    }
  
    _notify(text) {
      try {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Maintenance Update', { body: text })
        }
      } catch {}
    }
  
    _speak(text) {
      try {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(text)
          u.rate = 1
          u.pitch = 1
          window.speechSynthesis.speak(u)
        }
      } catch {}
    }
  }
  
  