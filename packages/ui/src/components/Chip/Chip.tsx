import { HTMLAttributes } from 'react';

import { Colors } from '@/theme';
import Ripple from '@/components/Ripple';
import joinClass from '@/utils/joinClass';

import './Chip.scss';

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    label: string;
    color?: Colors | 'default';
    variant?: 'contained' | 'outlined';
};
export default function Chip({ label, color = 'default', variant, ...props }: ChipProps) {

    const clss = joinClass([
        'cj-chip',
        `cj-chip--${color}`,
        `cj-chip--${color}--${variant}`,
        props.onClick && 'cj-chip--clickable',
        props.className
    ]);

    return (
        <div {...props} className={clss} style={{ ...props.style }}>
            <span>{label}</span>
            {props.onClick && <Ripple />}
        </div>
    );
}
