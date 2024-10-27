import { uuid } from '@caju/toolkit/uuid';

import DB from '@/db';

import generateSkills from './generateSkills';
import type { CandidateData, BasicCandidateData } from './interface';

export default class CandidatesServices {
    private static PATH = 'candidates';

    constructor(private db: DB) { }

    async createAdmission(data: BasicCandidateData) {
        const id = uuid();

        return this.db.setItem<CandidateData>({
            path: CandidatesServices.PATH,
            data: {
                ...data,
                status: 'pending',
                picture: `https://robohash.org/${data.name}`,
                skills: generateSkills()
            },
            pathSegments: [id],
        });
    }
}
