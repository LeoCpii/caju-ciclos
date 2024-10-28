import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import Error from '@/pages/error';
import Signin from '@/pages/home';
import Vacancies from '@/pages/vacancies';
import Profile from '@/pages/profile/Profile';
import Register from '@/pages/admission/register';
import Admission, { AdmissionProvider } from '@/pages/admission';

import { UserLoggedOutGuard } from './LoggedGuard';

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <UserLoggedOutGuard>
                <App />
            </UserLoggedOutGuard>
        ),
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
                path: '/vagas',
                loader: () => document.title = 'Caju - Vagas',
                element: <Vacancies />,
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
