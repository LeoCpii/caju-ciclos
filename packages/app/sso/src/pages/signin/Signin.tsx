import { useState } from 'react';

import Icon from '@caju/ui/components/Icon';
import Slide from '@caju/ui/animations/Slide';
import Input from '@caju/ui/components/Input';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Loading from '@caju/ui/components/Loading';
import { useAlert } from '@caju/ui/components/Alert';
import Container from '@caju/ui/components/Container';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import Typography from '@caju/ui/components/Typography';
import { Card, CardContent } from '@caju/ui/components/Card';
import Form, { Control, useForm, FormControl } from '@caju/ui/components/Form';

import logger from '@caju/toolkit/logger';

import { authServices, userServices, url, admissionServices, isLocal } from '@/services/core';

const redirect = () => {
    const managerUrl = `${url.manager}?token=${authServices.access_token}`;
    logger.info('Redirecting to manager page:', managerUrl);
    window.open(managerUrl, '_self');
};

function EmailAndPasswordForm() {
    const [type, setType] = useState<'text' | 'password'>('password');

    const { addAlert } = useAlert();

    const [formGroup] = useForm<{ email: string; password: string }>({
        form: {
            email: new FormControl({ value: '', type: 'email', required: true }),
            password: new FormControl({ value: '', type: 'password', required: true }),
        },
        handle: {
            submit: (form) => {
                const { email, password } = form.values;

                logger.info('SSSUUUU');

                authServices.loginWithPassword(email, password)
                    .then(() => {
                        redirect();
                    })
                    .catch((e) => {
                        const { code } = e;

                        if (code === 'auth/user-not-found') {
                            return authServices.createUserWithPassword(email, password)
                                .then((user) => {
                                    logger.info('usuario criado no autenticador!', user);
                                    return user;
                                })
                                .then((user) => userServices.createUser(user))
                                .then(() => logger.info('usuario criado com sucesso!'))
                                .then(() => admissionServices.createAdmission(userServices.currentByToken.user_id))
                                .then(() => logger.info('admissão criada com sucesso!'))
                                .then(() => redirect())
                                .catch((e) => { logger.error('Erro ao criar ususario, ', e); });
                        }

                        addAlert({
                            color: 'error',
                            message: 'Erro ao tentar fazer login.',
                            icon: <Icon name="error" />,
                        });

                        logger.info('Error on login:', e);
                    });
            }
        }
    }, []);

    const toggleType = () => {
        setType(prev => prev === 'text' ? 'password' : 'text');
    };

    return (
        <Form formGroup={formGroup}>
            <Control
                controlName="email"
                field={(control) => <Input
                    fullWidth
                    gutterBottom
                    placeholder="email"
                    value={control.value}
                    error={control.isInvalid}
                    helperText={control.messageError}
                />}
            />
            <Control
                controlName="password"
                field={(control) => <Input
                    fullWidth
                    gutterBottom
                    type={type}
                    placeholder="password"
                    value={control.value}
                    error={control.isInvalid}
                    helperText={control.messageError}
                    endIcon={
                        <ButtonIcon type="button" onClick={toggleType}>
                            <Icon name="eye" />
                        </ButtonIcon>
                    }
                />}
            />
            <Button
                fullWidth
                type="submit"
                size="large"
                variant="outlined"
            >
                Entrar
            </Button>
        </Form>
    );
}

export default function Signin() {
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState(false);

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

                userServices.createUser(current)
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

                            <Stack spacing="small">
                                {isLocal && <EmailAndPasswordForm />}

                                <div>
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
                                </div>
                            </Stack>
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