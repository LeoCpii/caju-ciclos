import type { Theme } from './Theme';

export const themeDefaultLight: Theme = {
    palette: {
        mode: 'light',
        info: '#2196f3',
        error: '#f44336',
        warning: '#ff9800',
        success: '#2e7d32',
        primary: '#3f51b5',
        secondary: '#f50057',
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)'
        },
        background: {
            paper: '#f9f9f9',
            default: '#f1f1f1',
        },
        divider: 'rgba(0, 0, 0, 0.12)'
    }
};

export const themeDefaultDark: Theme = {
    palette: {
        mode: 'dark',
        info: '#2196f3',
        error: '#f44336',
        warning: '#ff9800',
        success: '#4caf50',
        primary: '#1abc9c',
        secondary: '#f50057',
        text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)'
        },
        background: {
            paper: '#424242',
            default: '#303030',
        },
        divider: 'rgba(0, 0, 0, 0.12)'
    }
};