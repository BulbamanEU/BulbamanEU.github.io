const themeToggle = document.getElementById('themeToggle');

// Check if the theme is stored in localStorage and apply it on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Set default theme (light mode)
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Save the selected theme to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Apply the new theme
    html.setAttribute('data-theme', newTheme);
});
