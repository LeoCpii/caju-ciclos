import { decode } from '@caju/toolkit/jwt';
import { local } from '@caju/toolkit/dom/local';
import { Cookies } from '@caju/toolkit/dom/cookies';

import { UserData } from '@/user';

export interface AuthMethods {
    signOut: () => Promise<any>;
    googleAuth?: () => Promise<any>;
    signInWithPassword?: (email: string, password: string) => Promise<any>;
    createUserWithEmailAndPassword?: (email: string, password: string) => Promise<any>;
}

export default class Auth {
    private cookies = new Cookies();

    constructor(private methods: AuthMethods) { }

    get access_token() { return this.cookies.get('access_token'); }
    set access_token(token: string) { this.cookies.set('access_token', token); }

    public async login() {
        return this.methods.googleAuth()
            .then(r => {
                this.access_token = r.user.accessToken;
            });
    }

    public async logout(redirect: () => void) {
        return this.methods.signOut()
            .then(() => {
                local.remove('user');
                this.cookies.remove('access_token');
                redirect();
            });
    }

    public async loginWithPassword(email: string, password: string) {
        return this.methods.signInWithPassword(email, password)
            .then(r => {
                this.access_token = r.user.accessToken;
            });
    }

    public async createUserWithPassword(email: string, password: string) {
        return this.methods.createUserWithEmailAndPassword(email, password)
            .then(r => {
                this.access_token = r._tokenResponse.idToken;
                return decode<UserData>(r._tokenResponse.idToken);
            });
    }
}