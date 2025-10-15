import { initThemeAndNav } from './shell.js'
import { renderOverview } from './overview.js'
import { initMap, highlightVehicleOnMap } from './map.js'
import { renderTable } from './table.js'
import { renderAlerts } from './alerts.js'
import { renderAnalytics } from './analytics.js'
import { sampleData, startTicker, getSelectedVehicle, setSelectedVehicle, getState } from './data.js'
import { renderPredictiveTop5 } from './predictive.js'
import { renderGeofence } from './geofence.js'
import { initFirestoreSync } from './firestore.js'
import { renderSensorPanel } from './sensors.js'
import { renderVehiclesPanel, wireVehiclesTools } from './vehicles.js'
import { wireSettings } from './settings.js'
import { renderLeaderboard, assignCoachingTip } from './leaderboard.js'
import { initMapAdvancedControls } from './map_adv.js'
import { renderCalendar, wireCalendar } from './calendar.js'
import { renderParts } from './parts.js'
import { exportPdf, scheduleWeeklyReport } from './reporting.js'

;(function init() {
  sampleData()
  initThemeAndNav(onViewChange)
  renderOverview()
  renderTable(onVehicleClick)
  renderVehiclesPanel(onVehicleClick)
  renderAlerts()
  renderAnalytics()
  initMap(onVehicleClick)
  initMapAdvancedControls()
  renderPredictiveTop5()
  renderGeofence()
  renderLeaderboard()
  renderCalendar()
  renderParts()
  let live = true
  const btnLive = document.getElementById('btn-live')
  btnLive?.addEventListener('change', () => { live = btnLive.checked })
  startTicker(() => {
    if (!live) return
    renderOverview()
    renderTable(onVehicleClick)
    renderAlerts()
    renderAnalytics()
    renderSensorPanel(getSelectedVehicle())
    renderVehiclesPanel(onVehicleClick)
    renderPredictiveTop5()
    renderGeofence()
    renderLeaderboard()
    renderCalendar()
    renderParts()
  })

  document.getElementById('fab')?.addEventListener('click', () => {
    alert('Quick actions: Send maintenance request / Contact driver / Export report')
  })

  const modal = document.getElementById('fw-modal')
  document.getElementById('btn-cmd')?.addEventListener('click', () => modal?.classList.remove('hidden'))
  document.getElementById('cmd-close')?.addEventListener('click', () => modal?.classList.add('hidden'))
  document.getElementById('cmd-coach')?.addEventListener('click', () => alert('Coaching tip sent to drivers with low scores.'))
  document.getElementById('btn-assign-tip')?.addEventListener('click', assignCoachingTip)
  document.getElementById('btn-export-pdf')?.addEventListener('click', exportPdf)
  document.getElementById('btn-weekly-report')?.addEventListener('click', scheduleWeeklyReport)

  wireVehiclesTools()
  wireSettings()
  wireCalendar()
  const yearEl = document.getElementById('fw-year'); if (yearEl) yearEl.textContent = new Date().getFullYear()
  initFirestoreSync()

  // Chatbot wiring
  wireChatbot()
})()

function onVehicleClick(vehicle) {
  setSelectedVehicle(vehicle?.id)
  highlightVehicleOnMap(vehicle)
  // switch to Map panel to show sensors
  showPanel('map')
  renderSensorPanel(vehicle)
}

function onViewChange(view) {
  if (view === 'map') renderSensorPanel(getSelectedVehicle())
}

function showPanel(name) {
  document.querySelectorAll('.vw-panel').forEach((p) => p.classList.add('hidden'))
  const el = document.querySelector(`[data-panel="${name}"]`)
  if (el) el.classList.remove('hidden')
  document.querySelectorAll('.vw-tab').forEach((t) => t.classList.remove('bg-slate-100', 'dark:bg-slate-700'))
  const tab = document.querySelector(`.vw-tab[data-view="${name}"]`)
  tab?.classList.add('bg-slate-100', 'dark:bg-slate-700')
}

function wireChatbot() {
  const panel = document.getElementById('fw-chat-panel')
  const toggle = document.getElementById('chat-toggle')
  const closeBtn = document.getElementById('chat-close')
  const input = document.getElementById('chat-input')
  const send = document.getElementById('chat-send')
  const msgs = document.getElementById('chat-messages')
  if (!panel || !toggle || !closeBtn || !input || !send || !msgs) return

  // Load history
  const history = loadChatHistory()
  for (const m of history) appendMsg(msgs, m.role, m.text)

  toggle.addEventListener('click', () => panel.classList.toggle('hidden'))
  closeBtn.addEventListener('click', () => panel.classList.add('hidden'))
  send.addEventListener('click', () => handleChat(input, msgs))
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleChat(input, msgs) })
  // Preload domain facts for local replies
  doTrain(msgs)
}

function handleChat(input, msgs) {
  const text = (input.value || '').trim(); if (!text) return
  input.value = ''
  appendMsg(msgs, 'user', text)
  saveChat({ role: 'user', text })
  // Always use local reply (OpenAI integration removed)
  const reply = generateReply(text)
  appendMsg(msgs, 'assistant', reply)
  saveChat({ role: 'assistant', text: reply })
}

function appendMsg(container, role, text) {
  const b = document.createElement('div')
  b.className = `p-2 rounded ${role === 'user' ? 'bg-emerald-900/30' : 'bg-slate-800'}`
  b.textContent = text
  container.appendChild(b)
  container.scrollTop = container.scrollHeight
}

function loadChatHistory() {
  try { return JSON.parse(localStorage.getItem('fw-chat') || '[]') } catch { return [] }
}
function saveChat(entry) {
  const arr = loadChatHistory(); arr.push(entry); localStorage.setItem('fw-chat', JSON.stringify(arr.slice(-100)))
}

function doTrain(msgs) {
  // Minimal training: store domain facts for retrieval
  const facts = [
    'PoF is a 0-100 probability-of-failure score derived from telemetry and maintenance intervals.',
    'Driver Score is graded A+, A, B, C and impacts coaching recommendations.',
    'Geofence violations include Entry, Exit, and Violation events saved in timeline.',
    'Use the Vehicles panel to export CSV or schedule reports.',
    'Toggle Cluster/Heat on the Map to visualize fleet density and risk.'
  ]
  localStorage.setItem('fw-facts', JSON.stringify(facts))
  // silently preload facts
}

function generateReply(q) {
  const lc = q.toLowerCase()
  const facts = (() => { try { return JSON.parse(localStorage.getItem('fw-facts') || '[]') } catch { return [] } })()
  if (lc.includes('pof') || lc.includes('risk')) return 'PoF is a 0–100 failure probability computed from engine temp, oil pressure, tire pressure, errors, health, and time since service.'
  if (lc.includes('driver')) return 'Driver scores are graded A+ to C; low scores receive coaching tips via the leaderboard Assign Coaching Tip action.'
  if (lc.includes('geofence')) return 'Geofence timeline shows Enter, Exit, and Violation events. You can draw and save fences on the Map.'
  if (lc.includes('report')) return 'Use Export Dashboard as PDF or Schedule Weekly Report in Vehicles → Simulation & Tools.'
  if (lc.includes('schedule') || lc.includes('calendar')) return 'The Maintenance Calendar shows days; drag to a date to reschedule (mock).'
  if (facts.length) return facts[Math.floor(Math.random() * facts.length)]
  return 'I can help with PoF risk, driver coaching, geofence events, reports, and scheduling. Ask me anything about the dashboard.'
}

// removed OpenAI call


