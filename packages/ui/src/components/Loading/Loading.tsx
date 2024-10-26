import { HTMLAttributes } from 'react';

import type { Path } from '@caju/toolkit/interface';

import joinClass from '@/utils/joinClass';
import { convertPathToColor, useTheme, type PaletteBuilded } from '@/theme';

import './Loading.scss';

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
    color?: Path<PaletteBuilded>;
    size?: number | string;
}
export default function Loading({ color = 'primary.main', size = '1.5rem', ...props }: LoadingProps) {
    const { theme: { palette } } = useTheme();

    const c = convertPathToColor(color, palette);

    const className = joinClass(['cj-loading', props.className]);

    return (
        <span {...props} className={className} style={{ ...props, color: c, width: size, height: size }}>
            <svg className="cj-loading__svg" viewBox="22 22 44 44">
                <circle className="cj-loading__circle" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6">
                </circle>
            </svg>
        </span>
    );
}