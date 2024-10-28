
import { local } from '@caju/toolkit/dom/local';
import type { Cookies } from '@caju/toolkit/dom/cookies';

import Auth, { AuthMethods } from './auth';

jest.mock('@caju/toolkit/dom/local', () => ({
    local: {
        remove: jest.fn(),
    },
}));

jest.mock('@caju/toolkit/dom/cookies', () => {
    return {
        Cookies: jest.fn().mockImplementation(() => ({
            get: jest.fn(),
            set: jest.fn(),
            remove: jest.fn(),
        })),
    };
});

describe('Auth', () => {
    let auth: Auth;
    let cookiesMock: jest.Mocked<Cookies<any>>;
    const mockAuthMethods: AuthMethods = {
        signout: jest.fn(),
        googleAuth: jest.fn(),
    };

    beforeEach(() => {
        auth = new Auth(mockAuthMethods);
        cookiesMock = auth['cookies'] as jest.Mocked<Cookies<any>>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set access_token in cookies', () => {
        auth.access_token = 'it_token';
        expect(cookiesMock.set).toHaveBeenCalledWith('access_token', 'it_token');
    });

    it('should get access_token from cookies', () => {
        cookiesMock.get.mockReturnValue('it_token');
        expect(auth.access_token).toBe('it_token');
        expect(cookiesMock.get).toHaveBeenCalledWith('access_token');
    });

    it('should call googleAuth and set access_token on login', async () => {
        mockAuthMethods.googleAuth = jest.fn().mockResolvedValue({ user: { accessToken: 'mock_token' } });

        await auth.login();

        expect(mockAuthMethods.googleAuth).toHaveBeenCalled();
        expect(cookiesMock.set).toHaveBeenCalledWith('access_token', 'mock_token');
    });

    it('should call signout, remove access_token, and call redirect on logout', async () => {
        const mockRedirect = jest.fn();
        mockAuthMethods.signout = jest.fn().mockResolvedValue(undefined);

        await auth.logout(mockRedirect);

        expect(mockAuthMethods.signout).toHaveBeenCalled();
        expect(local.remove).toHaveBeenCalledWith('user');
        expect(cookiesMock.remove).toHaveBeenCalledWith('access_token');
        expect(mockRedirect).toHaveBeenCalled();
    });
});