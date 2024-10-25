import { HTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';

import './Stack.scss';

type Orientation = 'row' | 'column';
type Spacing = 'small' | 'medium' | 'large';

interface StackProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    orientation?: Orientation;
    spacing?: Spacing;
    tag?: React.ElementType;
}

export default function Stack({
    children,
    tag = 'div',
    spacing = 'medium',
    orientation = 'column',
    ...props
}: Readonly<StackProps>) {
    const CustomTag = tag;
    const cls = joinClass(['cj-stack', `cj-stack__${spacing}`, `cj-stack__${orientation}`, props.className]);

    return (
        <CustomTag {...props} className={cls}>
            {children}
        </CustomTag>
    );
}
