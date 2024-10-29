import { Outlet, useLoaderData } from 'react-router-dom';

import AlertProvider from '@caju/ui/components/Alert';
import { ThemeProvider, createTheme } from '@caju/ui/theme';

import { UserData } from '@caju/services/user';

import { Layout } from './layout';
import UserProvider from './providers/user';
import GlobalProvider from './providers/global';

import '@caju/ui/styles';

export default function App() {
    const user = useLoaderData() as UserData;

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