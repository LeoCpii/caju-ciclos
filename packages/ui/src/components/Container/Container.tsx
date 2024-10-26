import { HTMLAttributes, CSSProperties, useState } from 'react';

import useResize from '@/hooks/useResize';
import joinClass from '@/utils/joinClass';
import { type ThemeBuilded, useTheme } from '@/theme';

import './Container.scss';

type Width = string | number;

interface ContainerProps extends HTMLAttributes<HTMLElement> {
    sm?: Width;
    md?: Width;
    lg?: Width;
    children: React.ReactNode;
    sx?: (theme: ThemeBuilded) => CSSProperties;
}
export default function Container({ children, sx, lg = 950, md = 750, sm = '100%', ...props }: ContainerProps) {
    const { theme } = useTheme();
    const [width, setWidth] = useState<Width>(0);

    const MAP = { sm, lg, md };

    const style = sx ? sx(theme) : {};

    const className = joinClass(['cj-container', props.className]);

    useResize({
        onMobile: () => setWidth(MAP['sm']),
        onTablet: () => setWidth(MAP['md']),
        onDesktop: () => setWidth(MAP['md']),
        onWidescreen: () => setWidth(MAP['lg']),
        onFullHD: () => setWidth(MAP['lg']),
    });

    return (
        <div {...props} style={{ width, ...style, ...props.style }} className={className}>
            {children}
        </div>
    );
}