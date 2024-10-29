import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import Signin from '@/pages/signin';
import Signup from '@/pages/signup';

export const router = createBrowserRouter([
    {
        path: '',
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: <Navigate to='/signin' />,
            },
            {
                path: '/signin',
                loader: () => document.title = 'Caju - Login',
                element: <Signin />,
            },
            {
                path: '/signup',
                loader: () => document.title = 'Caju - Criar conta',
                element: <Signup />,
            },
            {
                path: '*',
                element: <Navigate to='/signin' />,
            }
        ]
    },
]);
