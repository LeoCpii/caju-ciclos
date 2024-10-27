import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';
import Stack from '@/components/Stack';
import Button from '@/components/Button';

import Alert from './Alert';
import useAlert from './useAlert';
import AlertProvider from './AlertProvider';

const meta: Meta<typeof AlertProvider> = {
    title: 'components/Alert',
    component: AlertProvider,
};

const Child = () => {
    const { addAlert } = useAlert();
    const [count, setCount] = useState(0);

    const handleAddAlert = () => {
        setCount(count + 1);
        addAlert({ color: 'success', message: `${count + 1}`, delay: 80000 });
    };

    return (
        <Button type="button" onClick={handleAddAlert}>Adicionar alert</Button>
    );
};

export const Variants: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <Stack>
                <Alert color="primary">ola!</Alert>
                <Alert color="secondary">ola!</Alert>
                <Alert color="success">ola!</Alert>
                <Alert color="error">ola!</Alert>
                <Alert color="warning">ola!</Alert>
                <Alert color="info">ola!</Alert>
            </Stack>
        );
    }
};

export const WithClose: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <Stack>
                <Alert onClose={() => ''}>ola!</Alert>
            </Stack>
        );
    }
};

export const WithIcon: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <Stack>
                <Alert
                    color="success"
                    icon={<Icon name="check" />}
                    onClose={() => ''}
                >
                    Uma mensagem aleatória
                </Alert>
            </Stack>
        );
    }
};

export const Functional: StoryObj<typeof AlertProvider> = {
    render: () => {
        return (
            <AlertProvider>
                <Child />
            </AlertProvider>
        );
    }
};

export default meta;
