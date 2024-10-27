import { HTMLAttributes, CSSProperties } from 'react';

import joinClass from '@/utils/joinClass';
import { ThemeBuilded, useTheme } from '@/theme';

import './Stack.scss';

type Orientation = 'row' | 'column';
type Spacing = 'small' | 'medium' | 'large';

interface StackProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    tag?: React.ElementType;
    nogap?: boolean;
    spacing?: Spacing;
    orientation?: Orientation;

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
    nogap = false,
    spacing = 'medium',
    orientation = 'column',
    ...props
}: Readonly<StackProps>) {
    const { theme } = useTheme();

    const CustomTag = tag;
    const cls = joinClass([
        'cj-stack',
        nogap && 'cj-stack__nogap',
        `cj-stack__${spacing}`,
        `cj-stack__${orientation}`,
        props.className
    ]);

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
