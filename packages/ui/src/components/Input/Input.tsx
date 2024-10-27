import { InputHTMLAttributes, ButtonHTMLAttributes, ReactElement, cloneElement, MouseEvent } from 'react';

import joinClass from '@/utils/joinClass';

import './Input.scss';

export type InputType = 'text' | 'password' | 'number' | 'date';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: boolean;
    fullWidth?: boolean;
    label?: string;
    helperText?: string;
    gutterBottom?: boolean;
    type?: InputType;
    endIcon?: React.JSX.Element | boolean;
    startIcon?: React.JSX.Element | boolean;
}
export default function Input({
    error,
    label,
    fullWidth,
    helperText,
    gutterBottom,
    endIcon,
    startIcon,
    type = 'text',
    ...props
}: InputProps) {
    const containerClss = joinClass([
        'cj-input-container',
        fullWidth && 'cj-input-container--full-width',
        gutterBottom && 'cj-input-container--gutter-bottom'
    ]);

    const labelClss = joinClass([
        'cj-input-label',
        error && 'cj-input-label--error',
    ]);

    const clss = joinClass([
        'cj-input',
        error && 'cj-input--error',
        props.className
    ]);

    const helperTextClss = joinClass([
        'cj-input__helper-text',
        helperText && 'cj-input__helper-text--visible',
        error && 'cj-input__helper-text--error'
    ]);

    const renderIcon = (icon: ReactElement<ButtonHTMLAttributes<any>>, direction: 'left' | 'right') => {
        return cloneElement(icon, {
            className: joinClass([icon.props.className, 'cj-input__icon', `cj-input__icon--${direction}`]),
            type: 'button',
            onClick: (e: MouseEvent<any, globalThis.MouseEvent>) => {
                e.stopPropagation();
                if (icon.props.onClick) { icon.props.onClick(e); };
            }
        });
    };

    return (
        <div className={containerClss}>
            {label && <label className={labelClss}>{label} {props.required && '*'}</label>}
            <div className={clss}>
                {startIcon && renderIcon(startIcon as React.JSX.Element, 'right')}
                <input {...props} type={type} />
                {endIcon && renderIcon(endIcon as React.JSX.Element, 'left')}
            </div>
            <span className={helperTextClss}>{helperText}</span>
        </div>
    );
}