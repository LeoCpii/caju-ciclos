import { decode } from '@caju/toolkit/jwt';
import { Cookies, local } from '@caju/toolkit/dom';

import db from '@/db';

import type { UserData } from './interface';

export default class User {
    private static PATH = 'users';
    private cookies = new Cookies();

    constructor(private db: db) { }

    get currentByToken() {
        try {
            const data = decode<UserData>(this.cookies.get('access_token'));

            return {
                name: data.name,
                email: data.email,
                picture: data.picture,
                user_id: data.user_id,
            };
        } catch {
            window.location.href = '/auth';
            return { name: '', email: '', picture: '', user_id: '' };
        }
    }

    get current(): UserData {
        const data = local.get<UserData>('user', true);

        return {
            name: data?.name,
            email: data?.email,
            picture: data?.picture,
            user_id: data?.user_id,
        };
    }

    set current(data: UserData) { local.set('user', data); }

    async getUserByEmail(email: string) {
        return this.db.getItem<UserData>({
            path: User.PATH,
            pathSegments: [],
            filters: [{ field: 'email', operator: '==', value: email }],
        });
    }

    async createUser() {
        return this.db.setItem<UserData>({
            path: User.PATH,
            data: this.currentByToken,
            pathSegments: [this.currentByToken.email],
        }).then(() => { this.current = this.currentByToken; });
    }
}