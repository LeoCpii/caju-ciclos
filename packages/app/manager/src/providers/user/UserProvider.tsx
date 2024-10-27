import { useEffect, useState, createContext } from 'react';

import type { UserData } from '@caju/services/user';

interface IUserContext {
    currentUser: UserData;
    update: (user: UserData) => void;
}

export const UserContext = createContext({} as IUserContext);

interface IProps {
    user: UserData;
    children: React.ReactNode;
}
export default function UserProvider({ children, user }: IProps) {
    const [_user, _setUser] = useState<UserData>(user);

    useEffect(() => { _setUser(user); }, []);

    const update = (user: UserData) => { _setUser(user); };

    return (
        <UserContext.Provider value={{ currentUser: _user, update }}>
            {children}
        </UserContext.Provider>
    );
}
