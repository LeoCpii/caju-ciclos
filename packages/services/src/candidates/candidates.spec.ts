import { uuid } from '@caju/toolkit/uuid';

import generateSkills from './generateSkills';
import CandidatesServices from './candidates';
import type { BasicCandidateData, Position, Skills } from './interface';

jest.mock('@caju/toolkit/uuid');
jest.mock('./generateSkills');

describe('CandidatesServices', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
    const mockSkills: Skills[] = ['javascript', 'typescript', 'react'];

    beforeEach(() => {
        (uuid as jest.Mock).mockReturnValue(mockUuid);
        (generateSkills as jest.Mock).mockReturnValue(mockSkills);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const basicCandidateData: BasicCandidateData = {
        cpf: '12345678910',
        name: 'John Doe',
        email: 'johndoe@example.com',
        admissionDate: '2024-01-01',
        position: 'frontend' as Position,
    };

    it('should generate a unique UUID for each instance', () => {
        const candidate = new CandidatesServices(basicCandidateData);

        expect(candidate.id).toBe(mockUuid);
    });

    it('should initialize picture with the correct URL based on name', () => {
        const candidate = new CandidatesServices(basicCandidateData);

        expect(candidate.picture).toBe(`https://robohash.org/${basicCandidateData.name}`);
    });

    it('should call generateSkills to initialize skills array', () => {
        const candidate = new CandidatesServices(basicCandidateData);

        expect(generateSkills).toHaveBeenCalled();
        expect(candidate.skills).toEqual(mockSkills);
    });

    it('should initialize candidate data correctly', () => {
        const candidate = new CandidatesServices(basicCandidateData);

        expect(candidate.cpf).toBe(basicCandidateData.cpf);
        expect(candidate.name).toBe(basicCandidateData.name);
        expect(candidate.email).toBe(basicCandidateData.email);
        expect(candidate.admissionDate).toBe(basicCandidateData.admissionDate);
        expect(candidate.position).toBe(basicCandidateData.position);
    });
});