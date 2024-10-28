import { createContext, useEffect, useMemo, useState } from 'react';

import type { AdmissionData } from '@caju/services/admission';

import { admissionServices } from '@/services/core';

import { useUser } from '../user';

interface GlobalContextConfig {
    loading: boolean;
    admission: AdmissionData;
    updateAdmission: (callback: (admission: AdmissionData) => AdmissionData) => void;
}

export const GlobalContext = createContext<GlobalContextConfig>({
    loading: false,
    admission: { id: '', ownerId: '', columns: { pending: [], approved: [], rejected: [] } },
    updateAdmission: () => { }
});

interface GlobalProviderProps { children: React.JSX.Element; }
export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [loading, setLoading] = useState(true);
    const [admission, setAdmission] = useState<AdmissionData>({
        id: '',
        ownerId: '',
        columns: { pending: [], approved: [], rejected: [] }
    });

    const { currentUser } = useUser();

    const context = useMemo<GlobalContextConfig>(() => ({
        loading,
        admission,
        updateAdmission: (callback) => setAdmission((prev) => callback(prev))
    }), [admission, loading]);

    useEffect(() => { getCandidates(); }, []);

    const getCandidates = () => {
        admissionServices.getAdmissions(currentUser.user_id)
            .then(res => {
                setAdmission(res);
                setTimeout(() => { setLoading(false); }, 1000);
            });
    };

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    );
}