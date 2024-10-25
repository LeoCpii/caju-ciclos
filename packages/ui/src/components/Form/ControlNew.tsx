import React, {
    // Children,
    // useEffect,
    useContext,
    ReactElement,
    cloneElement,
    FormHTMLAttributes,
    InputHTMLAttributes,
    // JSXElementConstructor,
} from 'react';

import useControl from './useControl';
import FormContext from './FormContext';

// type ChildrenElem = ReactElement<any, string | JSXElementConstructor<any>>[];

type ActionParams = {
    text: React.FormEvent<HTMLDivElement>;
    number: React.FormEvent<HTMLDivElement>;
    radio: React.ChangeEvent<HTMLInputElement>;
    checkbox: React.ChangeEvent<HTMLInputElement>;
}

// const validateChildren = (arrayChildren: ChildrenElem) => {
//     if (!arrayChildren.length || arrayChildren.length > 1) {
//         throw new Error('Control must have only one child');
//     }
// };

interface ControlProps<Form, Key extends keyof Form = keyof Form> extends FormHTMLAttributes<InputHTMLAttributes<any>> {
    controlName: Key;
    // children: React.ReactNode;
    action?: 'onBlur' | 'onChange' | 'onInput';
    type?: 'text' | 'checkbox' | 'radio' | 'number';
    field: (control: Form[Key]) => React.JSX.Element;
}
export default function Control<Form>({
    field,
    // children,
    controlName,
    type = 'text',
    action = 'onInput',
}: ControlProps<Form>) {
    const { formGroup } = useContext(FormContext);
    const { update } = useControl<Form>(controlName);
    // const arrayChildren = Children.toArray(children) as ChildrenElem;

    // useEffect(() => { validateChildren(arrayChildren); }, []);

    const renderChildren = (child: ReactElement<ControlProps<Form>>) => {
        return cloneElement(child, {
            [action]: (e: ActionParams[typeof type]) => update(
                ['radio', 'checkbox'].includes(type)
                    ? e.target['checked']
                    : e.target['value']
            ),
        });
    };

    return (
        renderChildren(field(formGroup[controlName]))
    );
}

