import { HTMLAttributes, PropsWithChildren, CSSProperties } from 'react';

import joinClass from '@/utils/joinClass';
import { ThemeBuilded, useTheme } from '@/theme';

import './Card.scss';

interface CardProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    sx?: (theme: ThemeBuilded) => CSSProperties;
}
export default function Card({ children, sx, ...props }: CardProps) {
    const { theme } = useTheme();

    const style = sx ? sx(theme) : {};
    const cls = joinClass(['cj-card', props.className]);

    return (
        <div {...props} className={cls} style={{ ...props.style, ...style }}>
            {children}
        </div >
    );
}
