export const setUpPwaTheme = () => {
  function getStoredThemeMode() {
    const storedSettings = localStorage.getItem('themeMode');
    return storedSettings ? storedSettings : 'light'; // Default to light mode if not set
  }

  function updateThemeColor(theme) {
    const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');

    if (theme === 'dark') {
      themeColorMetaTag.setAttribute('content', '#000000'); // Dark mode color
    } else {
      themeColorMetaTag.setAttribute('content', '#ffffff'); // Light mode color
    }
  }

  // Get the stored theme mode and apply it
  const currentThemeMode = getStoredThemeMode();
  updateThemeColor(currentThemeMode);

  // Listen for changes in localStorage (optional)
  window.addEventListener('storage', (event) => {
    if (event.key === 'themeMode') {
      updateThemeColor(event.newValue);
    }
  });
};
