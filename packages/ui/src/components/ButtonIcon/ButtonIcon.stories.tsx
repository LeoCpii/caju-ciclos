import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';

import ButtonIcon from './ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
    title: 'components/ButtonIcon',
    component: ButtonIcon,
};

export const Template: StoryObj<typeof ButtonIcon> = {
    render: () => {
        return (
            <ButtonIcon>
                <Icon name="star" />
            </ButtonIcon>
        );
    }
};

export default meta;