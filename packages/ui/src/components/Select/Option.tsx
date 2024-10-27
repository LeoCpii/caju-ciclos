import { ButtonHTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';

import './Select.scss';

export interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value: any;
}
export default function Option({ children, ...props }: OptionProps) {

    const className = joinClass(['cj-option', props.className]);

    return (
        <button type="button" {...props} className={className}>
            {children}
        </button>
    );
};