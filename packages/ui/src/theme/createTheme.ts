import type { ThemeBuilded, ThemeOptions } from './Theme';
import generateSupportColors from './generateSupportColors';
import { themeDefaultDark, themeDefaultLight } from './themeDefault';

export default function createTheme(theme?: ThemeOptions): ThemeBuilded {
    const mode = theme?.palette?.mode || 'light';
    const refColor = mode === 'dark' ? themeDefaultDark.palette : themeDefaultLight.palette;

    const primary = generateSupportColors(theme?.palette?.primary || refColor.primary);
    const secondary = generateSupportColors(theme?.palette?.secondary || refColor.secondary);
    const error = generateSupportColors(theme?.palette?.error || refColor.error);
    const warning = generateSupportColors(theme?.palette?.warning || refColor.warning);
    const success = generateSupportColors(theme?.palette?.success || refColor.success);
    const info = generateSupportColors(theme?.palette?.info || refColor.info);

    const colors = { primary, secondary, error, warning, success, info };

    return {
        palette: {
            mode,
            text: theme?.palette.text || refColor.text,
            background: theme?.palette.background || refColor.background,
            divider: theme?.palette.divider || refColor.divider,
            ...colors
        }
    };
}