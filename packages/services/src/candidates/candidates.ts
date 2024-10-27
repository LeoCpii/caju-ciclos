import { uuid } from '@caju/toolkit/uuid';

import generateSkills from './generateSkills';
import type { CandidateData, BasicCandidateData, Position } from './interface';

export default class CandidatesServices implements CandidateData {
    public id: string;
    public cpf: string;
    public name: string;
    public email: string;
    public picture: string;
    public skills: string[];
    public admissionDate: string;
    public position: Position;

    constructor(basic: BasicCandidateData) {
        this.id = uuid();
        this.cpf = basic.cpf;
        this.name = basic.name;
        this.email = basic.email;
        this.picture = `https://robohash.org/${basic.name}`;
        this.skills = generateSkills();
        this.admissionDate = basic.admissionDate;
        this.position = basic.position;
    }
}
