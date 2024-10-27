import { HTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';
import { convertPathToColor, useTheme, type MappedColors, type Size } from '@/theme';

import './Icons.scss';

export interface IconProps extends HTMLAttributes<HTMLElement> { name: string; size?: Size; color?: MappedColors; }
export default function Icon({ name, size = 'medium', color = 'primary.main', ...props }: IconProps) {
    const { theme: { palette } } = useTheme();

    const clss = joinClass(['cj-icon', 'uil', `uil-${name}`, size, props.className]);

    const c = convertPathToColor(color, palette);

    return (
        <i {...props} className={clss} style={{ ...props.style, color: c }}></i>
    );
}
