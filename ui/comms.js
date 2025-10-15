export function wireComms(state) {
  document.getElementById('btn-speak')?.addEventListener('click', () => {
    const text = document.getElementById('voice-text').value || 'Hello from the agent orchestrator.'
    try {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text)
        u.rate = 1
        u.pitch = 1
        window.speechSynthesis.speak(u)
      }
    } catch {}
  })

  document.getElementById('btn-notify')?.addEventListener('click', async () => {
    const text = document.getElementById('notif-text').value || 'Notification from the orchestrator.'
    try {
      if ('Notification' in window) {
        if (Notification.permission === 'default') await Notification.requestPermission()
        if (Notification.permission === 'granted') new Notification('Orchestrator', { body: text })
      }
    } catch {}
  })
}


