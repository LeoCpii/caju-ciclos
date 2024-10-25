import { Meta, StoryObj } from '@storybook/react';

import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Typography from '@/components/Typography';

import Container from './Container';

const meta: Meta<typeof Container> = {
    title: 'Container',
    component: Container,
};

export const Fluid: StoryObj<typeof Container> = {
    render: () => {
        return (
            <Stack justify="center">
                <Container>
                    <Box sx={(theme) => ({
                        padding: 16,
                        textAlign: 'center',
                        background: theme.palette.primary.main,
                    })}>
                        <Typography color="primary.contrastText">Container</Typography>
                    </Box>
                </Container>
            </Stack>
        );
    }
};

export default meta;