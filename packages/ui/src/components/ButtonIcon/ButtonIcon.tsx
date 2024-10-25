import type { HTMLAttributes, PropsWithChildren } from 'react';

import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';

import './ButtonIcon.scss';

type ButtonIconProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;
export default function ButtonIcon({ children, ...props }: ButtonIconProps) {
    const cls = joinClass([
        'cj-button-icon',
        props.className
    ]);

    return (
        <button {...props} className={cls}>
            {children}
            <Ripple />
        </button>
    );
}