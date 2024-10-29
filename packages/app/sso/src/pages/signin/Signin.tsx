import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@caju/ui/components/Box';
import Icon from '@caju/ui/components/Icon';
import Slide from '@caju/ui/animations/Slide';
import Input from '@caju/ui/components/Input';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Divider from '@caju/ui/components/Divider';
import Loading from '@caju/ui/components/Loading';
import { useAlert } from '@caju/ui/components/Alert';
import Container from '@caju/ui/components/Container';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import Typography from '@caju/ui/components/Typography';
import { Card, CardContent } from '@caju/ui/components/Card';
import Form, { Control, useForm, FormControl } from '@caju/ui/components/Form';

import logger from '@caju/toolkit/logger';

import { authServices, release, url } from '@/services/core';

const FIREBASE = {
    'auth/user-not-found': 'Email ou senha inválidos',
    'auth/wrong-password': 'Email ou senha inválidos',
    // eslint-disable-next-line max-len
    'auth/too-many-requests': 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.',
};

function EmailAndPasswordForm() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'text' | 'password'>('password');

    const { addAlert } = useAlert();

    const [formGroup] = useForm<{ email: string; password: string }>({
        form: {
            email: new FormControl({ value: '', type: 'email', required: true }),
            password: new FormControl({ value: '', type: 'password', required: true }),
        },
        handle: {
            submit: (form) => {
                setLoading(true);
                const { email, password } = form.values;

                authServices.loginWithPassword(email, password)
                    .then(() => { redirect(); })
                    .catch((e) => {
                        const { code } = e;

                        addAlert({
                            color: 'error',
                            message: FIREBASE[code] || 'Erro ao fazer login',
                            icon: <Icon name="error" />,
                        });

                        logger.info('Error on login:', { e });
                    })
                    .finally(() => { setLoading(false); });
            }
        }
    }, []);

    const redirect = () => {
        const managerUrl = `${url.manager}?token=${authServices.access_token}&email=${formGroup.controls.email.value}`;
        logger.info('Redirecting to manager page:', managerUrl);
        window.open(managerUrl, '_self');
    };

    const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

    const goToSignup = () => { navigate('/signup'); };

    return (
        <Form formGroup={formGroup}>
            <Stack spacing="small">
                <Control
                    controlName="email"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        placeholder="Email"
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
                        placeholder="Senha"
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
                    disabled={loading}
                    loading={loading && <Loading />}
                >
                    Entrar
                </Button>
                <Divider />
                <Stack orientation="row" justify="center">
                    <Typography variant="body2" style={{ textAlign: 'center' }}>Não possui conta?</Typography>
                    <Button
                        noHover
                        size="small"
                        type="button"
                        variant="text"
                        onClick={goToSignup}
                    >
                        Criar conta
                    </Button>
                </Stack>
            </Stack>
        </Form>
    );
}

export default function Signin() {
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
                                <EmailAndPasswordForm />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Box>
                        <Typography
                            variant="body2"
                            style={{ textAlign: 'center' }}
                        >
                            Copyright © 2024, Leozinho - Versão: {release}
                        </Typography>
                    </Box>
                </Container>
            </Stack>
        </Slide>
    );
}