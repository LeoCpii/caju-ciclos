import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import IconComponent from '@/components/Icon';
import ButtonIcon from '@/components/ButtonIcon';

import Input, { type InputType } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export const InputTypes: StoryObj<typeof Input> = {
    render: () => {
        return (
            <Stack>
                <Input placeholder="Text" />
                <Input placeholder="Password" type="password" />
                <Input placeholder="Number" type="number" />
            </Stack>
        );
    }
};

export const Icon: StoryObj<typeof Input> = {
    render: () => {
        const [visible, setVisible] = useState<'show' | 'hide'>('show');

        const MAP = {
            show: { type: 'text', icon: 'eye' },
            hide: { type: 'password', icon: 'eye-slash' },
        };

        const data = MAP[visible];

        return (
            <Stack orientation="column">
                <Input type={data.type as InputType} endIcon={
                    <ButtonIcon onClick={() => setVisible(prev => prev === 'hide' ? 'show' : 'hide')}>
                        <IconComponent icon={data.icon} />
                    </ButtonIcon>
                } />
                <Input type="text" startIcon={
                    <ButtonIcon>
                        <IconComponent icon="search" />
                    </ButtonIcon>
                } />
            </Stack>
        );
    }
};

export const Error: StoryObj<typeof Input> = {
    render: () => {
        return (
            <Input helperText="Email ou senha inválidos" error />
        );
    }
};

export const HelperText: StoryObj<typeof Input> = {
    render: () => {
        return (
            <Input helperText="Uma mensagem aqui" />
        );
    }
};

export default meta;