import { createBrowserRouter, Navigate } from 'react-router-dom';

import logger from '@caju/toolkit/logger';
import { getParams } from '@caju/toolkit/url';

import App from '@/App';
import Error from '@/pages/error';
import Signin from '@/pages/home';
import { url } from '@/services/core';
import Profile from '@/pages/profile/Profile';
import Register from '@/pages/admission/register';
import Admission, { AdmissionProvider } from '@/pages/admission';
import { authServices, userServices } from '@/services/core';

import { UserLoggedOutGuard } from './LoggedGuard';

async function getUser() {
    const params = getParams<{ email: string }>();

    if (window.location.href.includes('error')) { return; }

    const email = params.email || userServices.currentByToken.email;

    console.log('email', email);

    return userServices.getUserByEmail(email)
        .catch(() => {
            authServices.logout(() => window.open(url.sso, '_self'));
            logger.info('Usuário não encontrado');
        });
};

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <UserLoggedOutGuard>
                <App />
            </UserLoggedOutGuard>
        ),
        errorElement: <Error />,
        loader: () => getUser(),
        children: [
            {
                path: '/',
                element: <Navigate to='/pagina-inicial' />,
            },
            {
                path: '/pagina-inicial',
                loader: () => document.title = 'Caju - Página inicial',
                element: <Signin />,
            },
            {
                path: '/admissao',
                loader: () => document.title = 'Caju - Admissão',
                element: (
                    <AdmissionProvider>
                        <Admission />
                    </AdmissionProvider>
                ),
            },
            {
                path: '/admissao/cadastro',
                loader: () => document.title = 'Caju - Cadastro de candidato',
                element: <Register />,
            },
            {
                path: '/meu-perfil',
                loader: () => document.title = 'Caju - Meu perfil',
                element: <Profile />,
            },
            {
                path: '*',
                element: <Error status={'404'} />,
            }
        ],
    },
]);
