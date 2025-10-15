const KEY = 'fleetwatch-settings'

export function wireSettings() {
  const form = document.getElementById('fw-settings')
  if (!form) return
  const s = load()
  setVal('set-ws', s.ws)
  setVal('set-map-token', s.mapToken)
  setVal('set-refresh', s.refresh)
  setVal('set-notifs', s.notifs)
  setVal('set-fb-apikey', s.fbApiKey)
  setVal('set-fb-project', s.fbProject)
  setVal('set-a11y-contrast', s.a11yContrast)
  setVal('set-history', s.historyDays)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const next = {
      ws: getVal('set-ws'),
      mapToken: getVal('set-map-token'),
      refresh: Number(getVal('set-refresh') || 3000),
      notifs: getVal('set-notifs') || 'on',
      fbApiKey: getVal('set-fb-apikey'),
      fbProject: getVal('set-fb-project'),
      a11yContrast: getVal('set-a11y-contrast') || 'off',
      historyDays: Number(getVal('set-history') || 30)
    }
    localStorage.setItem(KEY, JSON.stringify(next))
    const status = document.getElementById('set-status')
    if (status) { status.textContent = 'Saved'; setTimeout(() => status.textContent = '', 1500) }
  })
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { ws: '', mapToken: '', refresh: 3000, notifs: 'on', fbApiKey: '', fbProject: '', a11yContrast: 'off', historyDays: 30 } } catch { return { ws: '', mapToken: '', refresh: 3000, notifs: 'on', fbApiKey: '', fbProject: '', a11yContrast: 'off', historyDays: 30 } }
}
function getVal(id) { return (document.getElementById(id)?.value || '').trim() }
function setVal(id, v) { const el = document.getElementById(id); if (el) el.value = v ?? '' }


