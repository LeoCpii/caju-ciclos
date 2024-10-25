import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import Icon from '../Icon';
import Stack from '../Stack';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
};

export const Colors: StoryObj<typeof Button> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
                <Button color="info">Info</Button>
                <Button color="error">Error</Button>
            </Stack>
        );
    }
};

export const Variants: StoryObj<typeof Button> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
            </Stack>
        );
    }
};

export const WithIcon: StoryObj<typeof Button> = {
    render: () => {
        return (
            <Stack orientation="row">
                <Button startIcon={<Icon icon="star" />}>
                    Contained
                </Button>

                <Button endIcon={<Icon icon="star" />}>
                    Contained
                </Button>
            </Stack>
        );
    }
};

export const Size: StoryObj<typeof Button> = {
    render: () => {
        return (
            <>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
            </>
        );
    }
};

export default meta;