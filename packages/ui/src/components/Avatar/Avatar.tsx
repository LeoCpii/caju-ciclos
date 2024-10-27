import { HTMLAttributes, CSSProperties } from 'react';

import { getInitials } from '@caju/toolkit/string';

import Icon from '@/components/Icon';
import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';
import { type ThemeBuilded, useTheme } from '@/theme';

import './Avatar.scss';

interface BoxProps extends HTMLAttributes<HTMLElement> {
    alt?: string;
    src?: string;
    name?: string;
    sx?: (theme: ThemeBuilded) => CSSProperties;
}
export default function Avatar({ sx, src, alt, name, ...props }: BoxProps) {
    const { theme } = useTheme();

    const style = sx ? sx(theme) : {};

    const className = joinClass([
        'cj-avatar',
        src && 'cj-avatar--image',
        name && 'cj-avatar--name',
        !src && !name && 'cj-avatar--icon',
        props.onClick && 'cj-avatar--clickable',
        props.className
    ]);

    const content = () => {
        if (src) { return <img style={{ width: '100%' }} src={src} alt={alt} />; }
        if (name) { return <span>{getInitials(name)}</span>; }

        return (
            <Icon name="user" className="cj-avatar__icon" />
        );
    };

    return (
        <div {...props} style={{ ...style, ...props.style }} className={className}>
            {content()}
            {props.onClick && <Ripple />}
        </div>
    );
}