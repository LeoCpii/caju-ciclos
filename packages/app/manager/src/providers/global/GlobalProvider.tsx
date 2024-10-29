import { createContext, useEffect, useMemo, useState } from 'react';

import { getPage } from '@caju/toolkit/url';

import type { AdmissionData } from '@caju/services/admission';

import { admissionServices } from '@/services/core';

import { useUser } from '../user';

type PageToGuide = 'admissao' | 'cadastro' | 'pagina-inicial';

interface GlobalContextConfig {
    loading: boolean;
    admission: AdmissionData;
    pageToGuide?: PageToGuide;
    startGuide: () => void;
    resetGuide: () => void;
    updateAdmission: (callback: (admission: AdmissionData) => AdmissionData) => void;
}

export const GlobalContext = createContext<GlobalContextConfig>({
    loading: false,
    pageToGuide: undefined,
    admission: { id: '', ownerId: '', columns: { pending: [], approved: [], rejected: [] } },
    startGuide: () => { },
    resetGuide: () => { },
    updateAdmission: () => { }
});

interface GlobalProviderProps { children: React.JSX.Element; }
export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [loading, setLoading] = useState(true);
    const [pageToGuide, setPageToGuide] = useState<PageToGuide>();
    const [admission, setAdmission] = useState<AdmissionData>({
        id: '',
        ownerId: '',
        columns: { pending: [], approved: [], rejected: [] }
    });

    const { currentUser } = useUser();

    const context = useMemo<GlobalContextConfig>(() => ({
        loading,
        admission,
        pageToGuide,
        resetGuide: () => { setPageToGuide(undefined); },
        startGuide: () => { setPageToGuide(getPage<PageToGuide>()); },
        updateAdmission: (callback) => setAdmission((prev) => callback(prev)),
    }), [admission, loading, pageToGuide]);

    useEffect(() => { getCandidates(); }, []);

    const getCandidates = () => {
        admissionServices.getAdmissions(currentUser.user_id)
            .then(res => {
                if (res) { setAdmission(res); };
                setTimeout(() => { setLoading(false); }, 1000);
            });
    };

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    );
}