import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/Input';
import Button from '@/components/Button';
import { Card, CardContent } from '@/components/Card';

import Form from './Form';
import Control from './Control';
import useForm from './useForm';
import FormControl from './formControl';
import Stack from '../Stack';
import ButtonIcon from '../ButtonIcon';
import Icon from '../Icon';

const meta: Meta<typeof Form> = {
    title: 'Form',
    component: Form,
};

interface IFormTeste {
    tel: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Template: StoryObj<typeof Form> = {
    render: () => {
        const [formGroup] = useForm<IFormTeste>({
            form: {
                name: new FormControl({ value: 'Goku', required: true }),
                email: new FormControl({ value: 'goku@dragonball.com', required: true, type: 'email' }),
                password: new FormControl({ value: '', type: 'password', required: true }),
                tel: new FormControl({ value: '21999999999', type: 'tel' }),
                confirmPassword: new FormControl({ value: '', type: 'password', required: true }),
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
                password: (form) => {
                    const { password, confirmPassword } = form.values;

                    if (confirmPassword && (confirmPassword !== password)) {
                        return 'Password and confirm password must be the same';
                    }

                    return '';
                }
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Card>
                    <CardContent>
                        <Control
                            controlName="tel"
                            field={(control) => <Input
                                fullWidth
                                gutterBottom
                                label="tel"
                                maxLength={15}
                                placeholder="tel"
                                value={control.masked}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />}
                        />
                        <Control
                            controlName="name"
                            field={(control) => <Input
                                fullWidth
                                gutterBottom
                                label="name"
                                placeholder="name"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />}
                        />
                        <Control
                            controlName="email"
                            field={(control) => <Input
                                fullWidth
                                gutterBottom
                                label="email"
                                placeholder="email"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                            />}
                        />
                        <Control
                            controlName="password"
                            field={(control) => <Input
                                fullWidth
                                gutterBottom
                                label="password"
                                type="password"
                                placeholder="password"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                endIcon={
                                    <ButtonIcon>
                                        <Icon icon="eye" />
                                    </ButtonIcon>
                                }
                            />}
                        />
                        <Control
                            controlName="confirmPassword"
                            field={(control) => <Input
                                required
                                fullWidth
                                gutterBottom
                                label="confirmPassword"
                                type="password"
                                placeholder="confirmPassword"
                                value={control.value}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                endIcon={
                                    <ButtonIcon>
                                        <Icon icon="eye" />
                                    </ButtonIcon>
                                }
                            />}
                        />
                        <Stack orientation="row" justify="flex-end">
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Form>
        );
    }
};

export default meta;