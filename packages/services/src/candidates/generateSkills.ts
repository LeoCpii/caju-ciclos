import { chooseNumber, getRandom } from '@caju/toolkit/array';

import { SKILLS } from './skills';

export default function generateSkills() {
    const numberOfSkills = chooseNumber(1, 5);

    return Array.from({ length: numberOfSkills }, () => getRandom(SKILLS));
}