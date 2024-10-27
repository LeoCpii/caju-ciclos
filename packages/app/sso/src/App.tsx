import { Outlet } from 'react-router-dom';

import AlertProvider from '@caju/ui/components/Alert';
import { ThemeProvider, createTheme } from '@caju/ui/theme';

import '@caju/ui/styles';

export default function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <AlertProvider>
                <Outlet />
            </AlertProvider>
        </ThemeProvider>
    );
};