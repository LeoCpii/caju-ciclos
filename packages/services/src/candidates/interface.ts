import { SKILLS } from './skills';

export type Position = 'frontend' | 'backend';
export type Skills = typeof SKILLS[number];

export interface CandidateData {
    id: string;
    cpf: string;
    name: string;
    email: string;
    admissionDate: string;
    picture: string;
    skills: Skills[];
    position: Position;
}

export type BasicCandidateData = Pick<CandidateData,
    | 'cpf'
    | 'name'
    | 'email'
    | 'admissionDate'
    | 'position'
>;