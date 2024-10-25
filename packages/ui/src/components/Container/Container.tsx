import { HTMLAttributes, CSSProperties } from 'react';

import joinClass from '@/utils/joinClass';
import { type ThemeBuilded, useTheme } from '@/theme';

import './Container.scss';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    sx?: (theme: ThemeBuilded) => CSSProperties;
}
export default function Container({ children, sx, ...props }: ContainerProps) {
    const { theme } = useTheme();

    const style = sx ? sx(theme) : {};

    const className = joinClass(['cj-container', props.className]);

    return (
        <div {...props} style={{ ...style, ...props.style }} className={className}>
            {children}
        </div>
    );
}