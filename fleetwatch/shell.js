export function initThemeAndNav(onChange) {
  document.getElementById('btn-dark')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
  })
  document.querySelectorAll('.vw-tab').forEach((b) =>
    b.addEventListener('click', () => {
      const view = b.getAttribute('data-view')
      document.querySelectorAll('.vw-panel').forEach((p) => p.classList.add('hidden'))
      const panel = document.querySelector(`[data-panel="${view}"]`)
      panel?.classList.remove('hidden')
      document.querySelectorAll('.vw-tab').forEach((t) => t.classList.remove('bg-slate-100', 'dark:bg-slate-700'))
      b.classList.add('bg-slate-100', 'dark:bg-slate-700')
      onChange?.(view)
    })
  )
}


