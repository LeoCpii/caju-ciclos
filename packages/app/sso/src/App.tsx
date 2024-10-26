import { Outlet } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@caju/ui/theme';

import '@caju/ui/styles';

export default function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <Outlet />
        </ThemeProvider>
    );
};