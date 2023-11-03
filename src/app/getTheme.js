const code = function () {
    if (
        localStorage.getItem('isDarkMode') === 'true' ||
        (localStorage.getItem('isDarkMode') == null &&
            window.matchMedia('(prefers-color-scheme:dark)').matches)
    ) {
        document.documentElement.classList.add('dark')
    }
}

export const getTheme = `(${code})();`
