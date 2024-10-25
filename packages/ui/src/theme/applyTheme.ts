import type { ThemeBuilded, PaletteBuilded, Color } from './Theme';

function setColor(name: string, color: Color) {
    document.documentElement.style.setProperty(`--${name}`, color.main);
    document.documentElement.style.setProperty(`--${name}-light`, color.light);
    document.documentElement.style.setProperty(`--${name}-dark`, color.dark);
    document.documentElement.style.setProperty(`--${name}-contrast`, color.contrastText);
}

export default function applyTheme(theme: ThemeBuilded) {
    const palette = theme.palette as PaletteBuilded;

    // COLORS
    setColor('info', palette.info);
    setColor('error', palette.error);
    setColor('warning', palette.warning);
    setColor('success', palette.success);
    setColor('primary', palette.primary);
    setColor('secondary', palette.secondary);

    // TEXT
    document.documentElement.style.setProperty('--text-primary', palette.text?.primary);
    document.documentElement.style.setProperty('--text-secondary', palette.text?.secondary);
    document.documentElement.style.setProperty('--text-disabled', palette.text?.disabled);

    // BACKGROUND
    document.documentElement.style.setProperty('--background-paper', palette.background?.paper);
    document.documentElement.style.setProperty('--background-default', palette.background?.default);

    // DIVIDER
    document.documentElement.style.setProperty('--divider', palette.divider);
}