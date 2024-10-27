import { HTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';
import type { Colors, Size } from '@/theme';

import './Icons.scss';

interface IconsProps extends HTMLAttributes<HTMLElement> { name: string; size?: Size; color?: Colors; }
export default function Icon({ name, size = 'medium', color = 'primary', ...props }: IconsProps) {

    const clss = joinClass(['cj-icon', 'uil', `uil-${name}`, size, color, props.className]);

    return (
        <i {...props} className={clss} ></i>
    );
}
