import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';
import { MappedColors, useTheme, convertPathToColor } from '@/theme';

import './ButtonIcon.scss';

interface ButtonIconProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    color?: MappedColors;
};
export default function ButtonIcon({ children, color = 'primary.main', ...props }: ButtonIconProps) {
    const { theme: { palette } } = useTheme();

    const cls = joinClass([
        'cj-button-icon',
        props.className
    ]);

    const c = convertPathToColor(color, palette);

    return (
        <button {...props} className={cls} style={{ ...props.style, color: c }}>
            {children}
            <Ripple />
        </button>
    );
}