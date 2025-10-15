export async function exportPdf() {
  const root = document.body
  const canvas = await html2canvas(root, { backgroundColor: '#000' })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  pdf.save('fleetwatch-dashboard.pdf')
}

export function scheduleWeeklyReport() {
  alert('Weekly report scheduled (mock). In production, a backend cron/email service would send PDFs.')
}


