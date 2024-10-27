import { SKILLS } from './skills';

export type CandidateStatus = 'pending' | 'approved' | 'rejected';
export type Position = 'frontend' | 'backend';
export type Skills = typeof SKILLS[number];

export interface CandidateData {
    cpf: string;
    name: string;
    email: string;
    admissionDate: string;
    ownerId: string;
    picture: string;
    status: CandidateStatus;
    position: Position;
    skills: Skills[];
}

export type BasicCandidateData = Pick<CandidateData,
    | 'cpf'
    | 'name'
    | 'email'
    | 'admissionDate'
    | 'ownerId'
    | 'position'
>;
