try {
  if (sessionStorage.getItem('hasSeenSplash')) {
    document.documentElement.classList.add('hide-splash');
  }
} catch (e) {}
