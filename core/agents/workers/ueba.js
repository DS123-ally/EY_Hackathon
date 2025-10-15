export class UebaAgent {
    constructor(emit) {
      this.emit = emit
      this.policies = [
        { id: 'POL-001', name: 'No data exfiltration', severity: 'high' },
        { id: 'POL-002', name: 'Voice use within hours', severity: 'medium' },
        { id: 'POL-003', name: 'Limited notification bursts', severity: 'low' },
      ]
    }
  
    sample() {
      // Randomly generate benign/anomalous events representing agent behavior
      const events = []
      const r = Math.random()
      if (r > 0.8) {
        const pol = this.policies[Math.floor(Math.random() * this.policies.length)]
        events.push({
          ts: Date.now(),
          policyId: pol.id,
          severity: pol.severity,
          detail: `Policy deviation detected: ${pol.name}`,
        })
      } else if (r > 0.5) {
        events.push({ ts: Date.now(), policyId: 'OK', severity: 'info', detail: 'Agent access normal' })
      }
      try {
        const stored = JSON.parse(localStorage.getItem('uebaEvents') || '[]')
        const merged = [...stored, ...events].slice(-200)
        localStorage.setItem('uebaEvents', JSON.stringify(merged))
      } catch {}
      return events
    }
  }
  
  