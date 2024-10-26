import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import applyTheme from './applyTheme';
import createTheme from './createTheme';
import type { Mode, ThemeBuilded } from './Theme';
import { themeDefaultLight } from './themeDefault';

export interface ThemeContextConfig {
    theme: ThemeBuilded;
    updateMode: (mode: Mode) => void;
    updateTheme: (theme: ThemeBuilded) => void;
}

export const ThemeContext = createContext<ThemeContextConfig>({
    theme: createTheme(themeDefaultLight),
    updateMode: () => { },
    updateTheme: () => { },
});

type ThemeProviderProps = PropsWithChildren<{ theme: ThemeBuilded; }>
export default function ThemeProvider({ theme, children }: ThemeProviderProps) {
    const [_theme, setTheme] = useState<ThemeBuilded>(theme);

    const context = useMemo<ThemeContextConfig>(() => ({
        theme: _theme,
        updateMode: (mode: Mode) => updateMode(mode),
        updateTheme: (newTheme: ThemeBuilded) => updateTheme(newTheme),
    }), [theme]);

    useEffect(() => { applyTheme(_theme); }, [_theme]);

    const updateMode = (mode: Mode) => {
        console.log('updateMode', mode);
        setTheme(prevTheme => ({ ...prevTheme, palette: { ...prevTheme.palette, mode } }));
    };

    const updateTheme = (newTheme: Partial<ThemeBuilded>) => {
        setTheme(prev => ({ ...prev, ...newTheme }));
    };

    return (
        <ThemeContext.Provider value={context}>
            {children}
        </ThemeContext.Provider>
    );
}

