import { Meta, StoryObj } from '@storybook/react';

import Icon from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'Icon',
    component: Icon,
};

const icon = 'rocket';

export const size: StoryObj<typeof Icon> = {
    render: () => {
        return (
            <>
                <Icon icon={icon} size="small" />
                <Icon icon={icon} />
                <Icon icon={icon} size="large" />
            </>
        );
    }
};

export const colors: StoryObj<typeof Icon> = {
    render: () => {
        return (
            <>
                <Icon icon={icon} color="primary" />
                <Icon icon={icon} color="secondary" />
                <Icon icon={icon} color="success" />
                <Icon icon={icon} color="warning" />
                <Icon icon={icon} color="error" />
                <Icon icon={icon} color="info" />
            </>
        );
    }
};

export default meta;