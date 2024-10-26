import { HTMLAttributes, CSSProperties } from 'react';

import joinClass from '@/utils/joinClass';

import './Stack.scss';
import { ThemeBuilded, useTheme } from '@/theme';

type Orientation = 'row' | 'column';
type Spacing = 'small' | 'medium' | 'large';

interface StackProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    orientation?: Orientation;
    spacing?: Spacing;
    tag?: React.ElementType;
    justify?: CSSProperties['justifyContent'];
    align?: CSSProperties['alignItems'];
    sx?: (theme: ThemeBuilded) => CSSProperties;
}

export default function Stack({
    sx,
    align,
    justify,
    children,
    tag = 'div',
    spacing = 'medium',
    orientation = 'column',
    ...props
}: Readonly<StackProps>) {
    const { theme } = useTheme();

    const CustomTag = tag;
    const cls = joinClass(['cj-stack', `cj-stack__${spacing}`, `cj-stack__${orientation}`, 'VBVVVV', props.className]);

    const style = sx ? sx(theme) : {};

    return (
        <CustomTag
            {...props}
            className={cls}
            style={{ ...props.style, ...style, justifyContent: justify, alignItems: align }}
        >
            {children}
        </CustomTag>
    );
}
