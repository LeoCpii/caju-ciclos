import type { Colors } from '@caju/ui/theme';

import type { Status } from '@caju/services/admission';

interface CandidatesConfig {
    color: Colors;
    columnId: Status;
    status: Status;
    icon: string;
    label: string;
}

export const CANDIDATES_CONFIG: Array<CandidatesConfig> = [
    {
        columnId: 'pending',
        color: 'warning',
        icon: 'file-search-alt',
        label: 'Pronto para revisar',
        status: 'pending'
    },
    {
        columnId: 'approved',
        color: 'success',
        icon: 'user-check',
        label: 'Aprovado',
        status: 'approved'
    },
    {
        columnId: 'rejected',
        color: 'error',
        icon: 'user-times',
        label: 'Reprovado',
        status: 'rejected'
    }
];