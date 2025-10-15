import { getState } from './data.js'

let map, markers = {}, clusterLayer, heatLayer, drawControl, drawnItems

export function initMap(onVehicleClick) {
  const el = document.getElementById('fw-map')
  if (!el) return
  map = L.map(el).setView([28.6139, 77.2090], 11)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map)
  renderMarkers(onVehicleClick)
  setInterval(() => renderMarkers(onVehicleClick), 4000)
  // Geofence drawing
  drawnItems = new L.FeatureGroup(); map.addLayer(drawnItems)
  drawControl = new L.Control.Draw({ draw: { rectangle: true, polygon: true, circle: false, marker: false, polyline: false }, edit: { featureGroup: drawnItems } })
  map.addControl(drawControl)
  map.on(L.Draw.Event.CREATED, function (e) {
    drawnItems.addLayer(e.layer); saveFences()
  })
  map.on('draw:edited', saveFences)
  map.on('draw:deleted', saveFences)
  loadFences()
  // Cluster/Heat toggles
  window.addEventListener('fw-map-cluster', (e) => { toggleCluster(e.detail) })
  window.addEventListener('fw-map-heat', (e) => { toggleHeat(e.detail) })
}

export function highlightVehicleOnMap(vehicle) {
  if (!map || !vehicle) return
  map.setView([vehicle.lat, vehicle.lng], 13)
}

function renderMarkers(onVehicleClick) {
  const { vehicles } = getState()
  for (const v of vehicles) {
    const color = v.health === 'critical' ? 'red' : v.health === 'warning' ? 'orange' : 'green'
    const icon = L.divIcon({ className: '', html: `<div style="width:12px;height:12px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,.2)"></div>` })
    if (!markers[v.id]) {
      const m = L.marker([v.lat, v.lng], { icon })
      m.addTo(map)
      m.on('click', () => onVehicleClick?.(v))
      m.bindTooltip(`${v.id} · ${v.health}`)
      markers[v.id] = m
    } else {
      markers[v.id].setLatLng([v.lat, v.lng])
      markers[v.id].setIcon(icon)
    }
  }
  if (clusterLayer) { clusterLayer.clearLayers(); Object.values(markers).forEach((m) => clusterLayer.addLayer(m)) }
  if (heatLayer) {
    const points = Object.values(getState().vehicles).map((v) => [v.lat, v.lng, (v.pof || 10) / 100])
    heatLayer.setLatLngs(points)
  }
}

function toggleCluster(on) {
  if (on && !clusterLayer) {
    clusterLayer = L.markerClusterGroup();
    Object.values(markers).forEach((m) => clusterLayer.addLayer(m))
    map.addLayer(clusterLayer)
  }
  if (!on && clusterLayer) { map.removeLayer(clusterLayer); clusterLayer = null }
}

function toggleHeat(on) {
  if (on && !heatLayer) { heatLayer = L.heatLayer([], { radius: 25, blur: 15, maxZoom: 11 }).addTo(map) }
  if (!on && heatLayer) { map.removeLayer(heatLayer); heatLayer = null }
}

function saveFences() {
  const fences = []
  drawnItems.eachLayer((l) => { if (l.toGeoJSON) fences.push(l.toGeoJSON()) })
  localStorage.setItem('fw-fences', JSON.stringify(fences))
}

function loadFences() {
  try {
    const fences = JSON.parse(localStorage.getItem('fw-fences') || '[]')
    for (const f of fences) { const layer = L.geoJSON(f); drawnItems.addLayer(layer) }
  } catch {}
}


