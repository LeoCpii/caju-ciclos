import type { Meta, StoryObj } from '@storybook/react';

import useListenerResize from './useListenerResized';

const meta: Meta<typeof useListenerResize> = {
    title: 'useListenerResize'
};

export const Template: StoryObj<typeof useListenerResize> = {
    render: () => {
        useListenerResize(() => console.log('resize', window.innerWidth, window.innerHeight), []);

        return (
            <div>

            </div>
        );
    }
};

export default meta;
