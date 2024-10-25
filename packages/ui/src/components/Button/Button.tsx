import { type PropsWithChildren, type ButtonHTMLAttributes, cloneElement } from 'react';

import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';
import type { Colors, Size } from '@/theme';

import './Button.scss';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    size?: Size;
    color?: Colors;
    endIcon?: React.JSX.Element;
    startIcon?: React.JSX.Element;
    variant?: 'contained' | 'outlined' | 'text';
};
export default function Button({
    size = 'medium',
    color = 'primary',
    variant = 'contained',
    startIcon,
    endIcon,
    children,
    ...props
}: ButtonProps) {
    const cls = joinClass([
        'cj-button',
        `cj-button--${size}`,
        `cj-button--${color}`,
        `cj-button--${color}--${variant}`,
        props.className
    ]);

    const renderIcon = (icon: React.JSX.Element, direction: 'left' | 'right') => {
        return cloneElement(icon, {
            className: joinClass([icon.props.className, 'cj-button__icon', `cj-button__icon--${direction}`])
        });
    };

    return (
        <button
            className={cls}
            {...props}
        >
            {startIcon && renderIcon(startIcon, 'left')}
            {children}
            {endIcon && renderIcon(endIcon, 'right')}
            <Ripple />
        </button>
    );
}
