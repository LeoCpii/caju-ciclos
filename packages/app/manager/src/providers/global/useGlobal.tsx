import { useContext } from 'react';

import { GlobalContext } from './GlobalProvider';

export default function useGlobal() {
    return useContext(GlobalContext);
}