import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { authServices, url } from '@/services/core';

export const UserLoggedOutGuard = ({ children }: React.PropsWithChildren<unknown>) => {
    const location = useLocation();

    useEffect(() => {
        if (!authServices.access_token) {
            window.open(url.sso, '_self');
            return;
        }
    }, [location]);

    return children;
};