import React, { useContext, ReactElement, cloneElement, InputHTMLAttributes, } from 'react';

import useControl from './useControl';
import FormContext from './FormContext';
import FormControl from './formControl';

type ActionParams = {
    text: React.FormEvent<HTMLDivElement>;
    number: React.FormEvent<HTMLDivElement>;
    radio: React.ChangeEvent<HTMLInputElement>;
    checkbox: React.ChangeEvent<HTMLInputElement>;
}

interface ControlProps<
    Form, Key extends keyof Form = keyof Form
> extends InputHTMLAttributes<InputHTMLAttributes<any>> {
    controlName: Key;
    // children: React.ReactNode;
    action?: 'onChange' | 'onInput';
    type?: 'text' | 'checkbox' | 'radio' | 'number';
    field: (control: FormControl<any>) => React.JSX.Element;
}
export default function Control<Form>({
    field,
    controlName,
    type = 'text',
    action = 'onInput',
}: ControlProps<Form>) {
    const { formGroup } = useContext(FormContext);
    const { control, update } = useControl<Form>(controlName);

    const renderChildren = (child: ReactElement<ControlProps<Form>>) => {
        return cloneElement(child, {
            onBlur: () => { control.dirty = true; },
            [action]: (e: ActionParams[typeof type]) => update(
                ['radio', 'checkbox'].includes(type)
                    ? e.target['checked']
                    : e.target['value']
            ),
            required: control.required
        });
    };

    return (
        renderChildren(field(formGroup.controls[controlName]))
    );
}

