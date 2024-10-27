import { CandidateData } from '@/candidates';

export type Status = 'pending' | 'approved' | 'rejected';

export interface AdmissionData {
    id: string;
    ownerId: string;
    columns: { [x in Status]: CandidateData[]; };
}