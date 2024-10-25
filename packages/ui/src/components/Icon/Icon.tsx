import { HTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';
import type { Colors, Size } from '@/theme';

import './Icons.scss';

interface IconsProps extends HTMLAttributes<HTMLElement> { icon: string; size?: Size; color?: Colors; }
export default function Icons({ icon, size = 'medium', color = 'primary', ...props }: IconsProps) {

    const clss = joinClass(['cj-icon', 'uil', `uil-${icon}`, size, color, props.className]);

    return (
        <i {...props} className={clss} ></i>
    );
}
