import { getState } from './data.js'

export function initFirestoreSync() {
  try {
    const cfg = loadSettings()
    const syncEl = document.getElementById('fw-sync')
    if (!cfg.fbApiKey || !cfg.fbProject) {
      if (syncEl) syncEl.textContent = 'Local'
      return
    }
    if (!window.firebase?.apps?.length) {
      window.firebase.initializeApp({ apiKey: cfg.fbApiKey, projectId: cfg.fbProject })
    }
    const db = window.firebase.firestore()
    if (syncEl) syncEl.textContent = 'Firestore'
    // Example: sync vehicles collection
    db.collection('vehicles').limit(100).onSnapshot((snap) => {
      // In a real app, merge into state; here we just indicate activity
      if (syncEl) syncEl.textContent = `Firestore (${snap.size})`
    })
  } catch (e) {
    const syncEl = document.getElementById('fw-sync'); if (syncEl) syncEl.textContent = 'Local'
  }
}

function loadSettings() {
  try { return JSON.parse(localStorage.getItem('fleetwatch-settings')) || {} } catch { return {} }
}


