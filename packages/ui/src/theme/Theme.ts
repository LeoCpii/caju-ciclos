export type Mode = 'light' | 'dark'

export type Colors = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';

export type Size = 'small' | 'medium' | 'large';

export interface Color {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
}

export interface Palette {
    mode: Mode;
    info: string;
    error: string;
    warning: string;
    success: string;
    primary: string;
    secondary: string;
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
    background: {
        paper: string;
        default: string;
    };
    divider: string;
}

export interface PaletteBuilded extends Pick<Palette, 'mode' | 'text' | 'background' | 'divider'> {
    mode: Mode;
    info: Color;
    error: Color;
    warning: Color;
    success: Color;
    primary: Color;
    secondary: Color;
}

export interface ThemeOptions {
    palette: Partial<Palette>;
}

export interface Theme {
    palette: Palette;
}

export interface ThemeBuilded {
    palette: PaletteBuilded;
}