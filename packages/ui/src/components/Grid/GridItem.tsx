import { useState } from 'react';

import joinClass from '@/utils/joinClass';
import useResize from '@/hooks/useResize';

import type { GridBaseProps, Size } from './interface';

import './Grid.scss';

export interface GridItemProps extends GridBaseProps { children: React.ReactNode; }
export default function GridItem({ children, lg = 1, md = lg, sm = md, ...props }: Readonly<GridItemProps>) {
    const [size, setSize] = useState<keyof Size>('md');

    const MAP = { sm, lg, md };

    useResize({
        onMobile: () => setSize('sm'),
        onTablet: () => setSize('md'),
        onDesktop: () => setSize('lg'),
        onWidescreen: () => setSize('lg'),
        onFullHD: () => setSize('lg'),
    });

    return (
        <div
            {...props}
            className={joinClass([
                'grid__item',
                `grid__item-${MAP[size]}`,
                props.className,
            ])}
        >
            {children}
        </div>
    );
}