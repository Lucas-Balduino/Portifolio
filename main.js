// Minimal scaffold for future interactivity
// You can add components, themes, or fetch data here later.

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('topo');
  if (nav) {
    nav.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        (e.target).blur?.();
      }
    });
  }
});


