// Frontend-only orchestration demo: Master Agent + Worker Agents
// Data is stored in localStorage. No backend.

import { AgentMaster } from './core/agents/master.js'
import { seedMockData, getStateSnapshot, persistState } from './core/state.js'
import { renderDashboard, wireNavigation } from './ui/dashboard.js'
import { renderVehicles } from './ui/vehicles.js'
import { renderPredictions } from './ui/predictions.js'
import { renderScheduler } from './ui/scheduler.js'
import { renderRcaCapa } from './ui/rca_capa.js'
import { renderUEBA } from './ui/ueba.js'
import { wireComms } from './ui/comms.js'

// App bootstrap
;(async function init() {
  seedMockData()

  const master = new AgentMaster({ onEvent: appendEvent })
  window.__master = master

  // Wire navigation
  wireNavigation()

  // Render initial views
  renderAll()

  // Buttons
  document.getElementById('btn-run-cycle')?.addEventListener('click', async () => {
    await master.runCycle()
    renderAll()
  })

  document.getElementById('btn-permissions')?.addEventListener('click', async () => {
    await requestPermissions()
  })

  // Clear events
  document.getElementById('btn-clear-events')?.addEventListener('click', () => {
    const el = document.getElementById('event-feed')
    if (el) el.innerHTML = ''
  })

  // Periodic UEBA sampling
  setInterval(() => {
    master.sampleUEBA()
    renderAll({ soft: true })
  }, 12000)
})()

function renderAll(opts = {}) {
  const state = getStateSnapshot()
  renderDashboard(state)
  renderVehicles(state)
  renderPredictions(state)
  renderScheduler(state)
  renderRcaCapa(state)
  renderUEBA(state)
  wireComms(state)
  persistState(state)
}

function appendEvent(evt) {
  const el = document.getElementById('event-feed')
  if (!el) return
  const li = document.createElement('li')
  li.className = 'p-2 rounded-md bg-slate-50 border border-slate-200'
  li.textContent = `${new Date().toLocaleTimeString()} • ${evt}`
  el.prepend(li)
}

async function requestPermissions() {
  try {
    if ('Notification' in window) {
      if (Notification.permission === 'default') await Notification.requestPermission()
    }
    // Warm up TTS voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
    }
    appendEvent('Permissions requested for Notifications and Voice')
  } catch (e) {
    appendEvent('Permission request failed')
  }
}


