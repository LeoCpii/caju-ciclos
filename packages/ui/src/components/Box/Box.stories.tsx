import { Meta, StoryObj } from '@storybook/react';

import Box from './Box';

const meta: Meta<typeof Box> = {
    title: 'Box',
    component: Box,
};

export const Default: StoryObj<typeof Box> = {
    render: () => {
        return (
            <Box>
                Box
            </Box>
        );
    }
};

export default meta;