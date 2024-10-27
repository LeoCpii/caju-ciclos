import { Outlet } from 'react-router-dom';

import AlertProvider from '@caju/ui/components/Alert';
import { ThemeProvider, createTheme } from '@caju/ui/theme';

import { Layout } from './layout';
import UserProvider from './providers/user';
import GlobalProvider from './providers/global';
import { userServices } from './services/core';

import '@caju/ui/styles';

export default function App() {
    const user = userServices.currentByToken;

    return (
        <ThemeProvider theme={createTheme()}>
            <AlertProvider>
                <UserProvider user={user}>
                    <GlobalProvider>
                        <Layout>
                            <Outlet />
                        </Layout>
                    </GlobalProvider>
                </UserProvider>
            </AlertProvider>
        </ThemeProvider>
    );
};