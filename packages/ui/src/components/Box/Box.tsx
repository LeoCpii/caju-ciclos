import { HTMLAttributes, CSSProperties } from 'react';

import { type ThemeBuilded, useTheme } from '@/theme';
import joinClass from '@/utils/joinClass';

interface BoxProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    sx?: (theme: ThemeBuilded) => CSSProperties;
}
export default function Box({ children, sx, ...props }: BoxProps) {
    const { theme } = useTheme();

    const style = sx ? sx(theme) : {};

    const className = joinClass(['cj-box', props.className]);

    return (
        <div {...props} style={{ ...style, ...props.style }} className={className}>
            {children}
        </div>
    );
}