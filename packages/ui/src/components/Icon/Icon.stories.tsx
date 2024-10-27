import { Meta, StoryObj } from '@storybook/react';

import Icon from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'components/Icon',
    component: Icon,
};

const icon = 'rocket';

export const size: StoryObj<typeof Icon> = {
    render: () => {
        return (
            <>
                <Icon name={icon} size="small" />
                <Icon name={icon} />
                <Icon name={icon} size="large" />
            </>
        );
    }
};

export const colors: StoryObj<typeof Icon> = {
    render: () => {
        return (
            <>
                <Icon name={icon} color="primary" />
                <Icon name={icon} color="secondary" />
                <Icon name={icon} color="success" />
                <Icon name={icon} color="warning" />
                <Icon name={icon} color="error" />
                <Icon name={icon} color="info" />
            </>
        );
    }
};

export default meta;