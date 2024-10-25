import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/Input';
import Button from '@/components/Button';

import Form from './Form';
import Control from './Control';
import useForm from './useForm';
import FormControl from './formControl';

const meta: Meta<typeof Form> = {
    title: 'Form',
    component: Form,
};

interface IFormTeste {
    // tel: string;
    name: string;
    // email: string;
    // password: string;
    // confirmPassword: string;
}

export const Template: StoryObj<typeof Form> = {
    render: () => {
        const [formGroup] = useForm<IFormTeste>({
            form: {
                name: new FormControl({ value: 'Goku', required: true }),
                // email: new FormControl({ value: 'goku@dragonball.com', type: 'email' }),
                // password: new FormControl({ value: '', type: 'password', required: true }),
                // tel: new FormControl({ value: '21999999999', type: 'tel', required: true }),
                // confirmPassword: new FormControl({ value: '', type: 'password', required: true }),
            },
            handle: {
                submit(form) {
                    console.info('submit', form.values);
                },
                change(form) {
                    console.info(form);
                }
            },
            validator: {
                // password: (form) => {
                //     const { password, confirmPassword } = form.values;

                //     if (confirmPassword && (confirmPassword !== password)) {
                //         return `confirmPassword ${confirmPassword} !== password ${password}`;
                //     }

                //     return '';
                // }
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                {/* <Control controlName="tel" action="onInput">
                    <Input
                        placeholder="tel"
                        value={formGroup.controls.tel.masked}
                    />
                </Control> */}
                <Control controlName="name">
                    <Input
                        placeholder="name"
                        value={formGroup.controls.name.value}
                    />
                </Control>
                {/* <Control controlName="email">
                    <Input
                        placeholder="email"
                        value={formGroup.controls.email.value}
                    />
                </Control>
                <Control controlName="password">
                    <Input
                        placeholder="password"
                        value={formGroup.controls.password.value}
                    />
                </Control>
                <Control controlName="confirmPassword">
                    <Input
                        placeholder="confirmPassword"
                        value={formGroup.controls.confirmPassword.value}
                    />
                </Control> */}
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
};

export default meta;