import { Outlet } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@caju/ui/theme';

import { Layout } from './layout';
import UserProvider from './providers/user';
import { userServices } from './services/core';

import '@caju/ui/styles';

export default function App() {
    const user = userServices.currentByToken;

    return (
        <ThemeProvider theme={createTheme()}>
            <UserProvider user={user}>
                <Layout>
                    <Outlet />
                </Layout>
            </UserProvider>
        </ThemeProvider>
    );
};