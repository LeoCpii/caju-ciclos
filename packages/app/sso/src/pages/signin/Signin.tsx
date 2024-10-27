import { useState } from 'react';

import Icon from '@caju/ui/components/Icon';
import Slide from '@caju/ui/animations/Slide';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Loading from '@caju/ui/components/Loading';
import { useAlert } from '@caju/ui/components/Alert';
import Container from '@caju/ui/components/Container';
import Typography from '@caju/ui/components/Typography';
import { Card, CardContent } from '@caju/ui/components/Card';

import logger from '@caju/toolkit/logger';

import { authServices, userServices, url, admissionServices } from '@/services/core';

export default function Signin() {
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    const redirect = () => {
        const managerUrl = `${url.manager}?token=${authServices.access_token}`;
        logger.info('Redirecting to manager page:', managerUrl);
        window.open(managerUrl, '_self');
    };

    const signinWithGoogle = () => {
        setLoading(true);

        authServices.login()
            .then(() => { verifyUser(); })
            .catch((e) => {
                logger.info('Error on login:', e);
                addAlert({
                    color: 'error',
                    message: 'Erro ao tentar fazer login.',
                    icon: <Icon name="error" />,
                    delay: 800000
                });
            })
            .finally(() => setTimeout(() => { setLoading(false); }, 500));

    };

    const verifyUser = () => {
        const { email, user_id } = userServices.currentByToken;

        userServices.getUserByEmail(email)
            .then(current => {
                if (current) {
                    setTimeout(() => { redirect(); }, 500);
                    return;
                }

                userServices.createUser()
                    .then(() => admissionServices.createAdmission(user_id))
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