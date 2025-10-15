export function initMapAdvancedControls() {
  const clusterToggle = document.getElementById('map-cluster')
  const heatToggle = document.getElementById('map-heat')
  clusterToggle?.addEventListener('change', () => window.dispatchEvent(new CustomEvent('fw-map-cluster', { detail: clusterToggle.checked })))
  heatToggle?.addEventListener('change', () => window.dispatchEvent(new CustomEvent('fw-map-heat', { detail: heatToggle.checked })))
}


