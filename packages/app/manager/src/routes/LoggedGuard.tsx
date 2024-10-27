import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import logger from '@caju/toolkit/logger';
import { getParams } from '@caju/toolkit/url';

import { authServices, url } from '@/services/core';

export const UserLoggedOutGuard = ({ children }: React.PropsWithChildren<unknown>) => {
    const location = useLocation();
    const params = getParams<{ token: string }>();

    const saveToken = () => {
        logger.info('Saving token');
        authServices.access_token = params.token;
    };

    useEffect(() => {
        if (params.token) { saveToken(); }

        if (!params.token && !authServices.access_token) {
            logger.info('User is not logged in. Redirecting to SSO page.');
            window.open(url.sso, '_self');
            return;
        }
    }, [location]);

    return children;
};