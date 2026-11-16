window.addEventListener('DOMContentLoaded', () => {
  const interval = setInterval(() => {
    const viewer = document.querySelector('spline-viewer');
    if (viewer && viewer.shadowRoot) {
      const logo = viewer.shadowRoot.querySelector('#logo');
      if (logo) {
        logo.remove();
        clearInterval(interval);
      }
    }
  }, 100);
});