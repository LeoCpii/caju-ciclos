import { uuid } from '@caju/toolkit/uuid';

import DB from '@/db';
import CandidatesServices, { type BasicCandidateData, type CandidateData } from '@/candidates';

import type { AdmissionData, Status } from './interface';

export default class AdmissionServices {
    private static PATH = 'admissions';

    constructor(private db: DB) { }

    async getAdmissions(ownerId: string) {
        return this.db.getItem<AdmissionData>({
            path: AdmissionServices.PATH,
            pathSegments: [],
            filters: [
                { field: 'ownerId', operator: '==', value: ownerId },
            ],
        });
    }

    async createAdmission(ownerId: string) {
        const id = uuid();

        return this.db.setItem<AdmissionData>({
            path: AdmissionServices.PATH,
            pathSegments: [id],
            data: {
                id,
                ownerId,
                columns: { pending: [], approved: [], rejected: [] },
            },
        });
    }

    async addCandidate(admissionId: string, status: Status, data: BasicCandidateData) {
        const candidate = new CandidatesServices(data);

        return this.db.insert<AdmissionData, CandidateData>({
            path: AdmissionServices.PATH,
            pathSegments: [admissionId],
            dataSegment: { ...candidate },
            pathToSegment: `columns.${status}`
        });
    }
}