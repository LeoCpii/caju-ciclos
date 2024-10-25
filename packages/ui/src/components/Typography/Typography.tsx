import type { PropsWithChildren, HTMLAttributes } from 'react';

import { Path } from '@caju/services/interface';

import joinClass from '@/utils/joinClass';
import { useTheme, type PaletteBuilded, convertPathToColor } from '@/theme';

import './Typography.scss';

export type Variant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';

const MAP: { [x: string]: keyof JSX.IntrinsicElements } = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
};

interface TypographyProps extends PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> {
    variant?: Variant;
    color?: Path<PaletteBuilded>;
}
export default function Typography({ children, variant = 'body1', color = 'text.primary', ...props }: TypographyProps) {
    const { theme: { palette } } = useTheme();

    const CustomTag = MAP[variant];

    const cls = joinClass(['cj-typography', `cj-typography--${variant}`]);

    const c = convertPathToColor(color, palette);

    return (
        <CustomTag className={cls} style={{ ...props.style, color: c }}>
            {children}
        </CustomTag>
    );
}