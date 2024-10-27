import { HTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';
import type { Colors, Size } from '@/theme';

import './Icons.scss';

export interface IconProps extends HTMLAttributes<HTMLElement> { name: string; size?: Size; color?: Colors; }
export default function Icon({ name, size = 'medium', color = 'primary', ...props }: IconProps) {

    const clss = joinClass(['cj-icon', 'uil', `uil-${name}`, size, color, props.className]);

    return (
        <i {...props} className={clss} ></i>
    );
}
