import { useState } from 'react';

import Icon from '@caju/ui/components/Icon';
import Slide from '@caju/ui/animations/Slide';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Loading from '@caju/ui/components/Loading';
import Container from '@caju/ui/components/Container';
import Typography from '@caju/ui/components/Typography';
import { Card, CardContent } from '@caju/ui/components/Card';

import { authServices, userServices } from '@/services/core';

export default function Signin() {
    const [loading, setLoading] = useState(false);

    const redirect = () => {
        console.log('redirect', userServices.current.name);
    };

    const signinWithGoogle = () => {
        setLoading(true);
        authServices.login()
            .then(() => { verifyUser(); })
            .finally(() => setTimeout(() => { setLoading(false); }, 500));
    };

    const verifyUser = () => {
        const { email } = userServices.currentByToken;

        userServices.getUserByEmail(email)
            .then(current => {
                if (current) {
                    setTimeout(() => { redirect(); }, 500);
                    return;
                }

                userServices.createUser()
                    .then(() => setTimeout(() => { redirect(); }, 500));
            });
    };

    return (
        <Slide enter direction="top">
            <Stack justify="center" sx={(theme) => ({
                height: '100vh',
                backgroundColor: theme.palette.background.paper,
            })}>
                <Container sm="100%" md={500} lg={500}>
                    <Typography variant="h4" style={{ textAlign: 'center' }} noMargin gutterBottom>
                        Desafio Caju!
                    </Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" noMargin gutterBottom>Login</Typography>
                            <Typography variant="body2" noMargin gutterBottom>
                                Use sua conta do Google para acessar o desafio Caju.
                            </Typography>
                            <Button
                                fullWidth
                                size="large"
                                startIcon={<Icon name="google" />}
                                style={{ marginTop: 16 }}
                                loading={loading && <Loading />}
                                onClick={signinWithGoogle}
                            >
                                Entrar com o Google
                            </Button>
                        </CardContent>
                    </Card>
                    <Typography
                        variant="body2"
                        style={{ textAlign: 'center' }}
                    >
                        Copyright © 2024, Leozinho
                    </Typography>
                </Container>
            </Stack>
        </Slide>
    );
}