import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import Error from '@/pages/error';
import Signin from '@/pages/home';
import Vacancies from '@/pages/vacancies';
import Admission from '@/pages/admission';
import Register from '@/pages/admission/register';
import Profile from '@/pages/profile/Profile';

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
                element: <Admission />,
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
