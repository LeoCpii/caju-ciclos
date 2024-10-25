import { InputHTMLAttributes, cloneElement } from 'react';

import joinClass from '@/utils/joinClass';

import './Input.scss';

export type InputType = 'text' | 'password' | 'number';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    type?: InputType;
    startIcon?: React.JSX.Element;
    endIcon?: React.JSX.Element;
}
export default function Input({
    error,
    fullWidth,
    helperText,
    startIcon,
    endIcon,
    type = 'text',
    ...props
}: InputProps) {
    const clss = joinClass([
        'cj-input',
        error && 'cj-input--error',
        fullWidth && 'cj-input--full-width',
        props.className
    ]);

    const spanClss = joinClass([
        'cj-input__helper-text',
        helperText && 'cj-input__helper-text--visible',
        error && 'cj-input__helper-text--error'
    ]);

    const renderIcon = (icon: React.JSX.Element, direction: 'left' | 'right') => {
        return cloneElement(icon, {
            className: joinClass([icon.props.className, 'cj-input__icon', `cj-input__icon--${direction}`])
        });
    };

    return (
        <div className={clss}>
            {startIcon && renderIcon(startIcon, 'right')}
            <input {...props} type={type} />
            {endIcon && renderIcon(endIcon, 'left')}
            <span className={spanClss}>{helperText}</span>
        </div>
    );
}