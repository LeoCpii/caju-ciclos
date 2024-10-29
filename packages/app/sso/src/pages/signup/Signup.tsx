import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Box from '@caju/ui/components/Box';
import Icon from '@caju/ui/components/Icon';
import Slide from '@caju/ui/animations/Slide';
import Stack from '@caju/ui/components/Stack';
import Input from '@caju/ui/components/Input';
import Button from '@caju/ui/components/Button';
import Divider from '@caju/ui/components/Divider';
import Loading from '@caju/ui/components/Loading';
import { useAlert } from '@caju/ui/components/Alert';
import Container from '@caju/ui/components/Container';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import Typography from '@caju/ui/components/Typography';
import { Card, CardContent } from '@caju/ui/components/Card';
import Form, { Control, FormControl, useForm } from '@caju/ui/components/Form';

import logger from '@caju/toolkit/logger';

import { admissionServices, authServices, release, url, userServices } from '@/services/core';

interface SignupForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const FIREBASE = {
    'auth/email-already-in-use': 'Email já em uso',
};

export default function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'text' | 'password'>('password');

    const { addAlert } = useAlert();

    const iconEye = type === 'text' ? 'eye-slash' : 'eye';

    const [formGroup] = useForm<SignupForm>({
        form: {
            name: new FormControl({ value: '', type: 'text', required: true }),
            email: new FormControl({ value: '', type: 'email', required: true }),
            password: new FormControl({ value: '', type: 'password', required: true }),
            confirmPassword: new FormControl({ value: '', type: 'password', required: true }),
        },
        handle: {
            submit(form) {
                setLoading(true);
                const { email, confirmPassword } = form.values;

                authServices.createUserWithPassword(email, confirmPassword)
                    .then((user) => {
                        logger.info('usuario criado no autenticador!', user);
                        return user;
                    })
                    .then((user) => userServices.createUser({
                        ...user,
                        ...{ picture: `https://robohash.org/${email}` }
                    }))
                    .then(() => logger.info('usuario criado com sucesso!'))
                    .then(() => admissionServices.createAdmission(userServices.currentByToken.user_id))
                    .then(() => logger.info('admissão criada com sucesso!'))
                    .then(() => redirect())
                    .catch((e) => {
                        const { code } = e;

                        addAlert({
                            color: 'error',
                            message: FIREBASE[code] || 'Erro ao criar usuário',
                            icon: <Icon name="error" />,
                        });

                        logger.error('Erro ao criar ususario, ', { e });
                    })
                    .finally(() => setLoading(false));
            },
        },
        validator: {
            password: (form) => {
                const { password } = form.values;

                if (password.length < 6) {
                    return 'A senha deve ter no mínimo 6 caracteres';
                }

                return '';
            },
            confirmPassword: (form) => {
                const { password, confirmPassword } = form.values;

                if (confirmPassword && (confirmPassword !== password)) {
                    return 'As senhas devem ser iguais';
                }

                return '';
            }
        }
    }, []);

    const redirect = () => {
        const managerUrl = `${url.manager}?token=${authServices.access_token}&email=${formGroup.controls.email.value}`;
        logger.info('Redirecting to manager page:', managerUrl);
        window.open(managerUrl, '_self');
    };

    const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

    const goToSignin = () => { navigate('/signin'); };

    return (
        <Slide enter direction="top">
            <Stack justify="center" sx={(theme) => ({
                height: '100vh',
                backgroundColor: theme.palette.secondary.main,
            })}>
                <Container sm="100%" md={500} lg={500}>
                    <Card>
                        <CardContent>
                            <Stack orientation="row">
                                <img
                                    style={{ width: 120, margin: 'auto' }}
                                    src="https://auth.caju.com.br/resources/mx5fr/login/caju/img/caju-logo.svg"
                                />
                            </Stack>
                            <Typography variant="subtitle1" noMargin gutterBottom>Criar conta</Typography>

                            <Stack spacing="small">
                                <Form formGroup={formGroup}>
                                    <Stack spacing="small">
                                        <Control
                                            controlName="name"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Name"
                                                    placeholder="ex: Desafio Caju"
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="email"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Email"
                                                    placeholder="ex: desafio@caju.com"
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="password"
                                            field={(control) => (
                                                <Input
                                                    fullWidth
                                                    gutterBottom
                                                    label="Senha"
                                                    type={type}
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                    endIcon={
                                                        <ButtonIcon onClick={toggleType}>
                                                            <Icon name={iconEye} />
                                                        </ButtonIcon>
                                                    }
                                                />
                                            )}
                                        />
                                        <Control
                                            controlName="confirmPassword"
                                            field={(control) => (
                                                <Input
                                                    required
                                                    fullWidth
                                                    gutterBottom
                                                    label="Confirmar senha"
                                                    type={type}
                                                    value={control.value}
                                                    error={control.isInvalid}
                                                    helperText={control.messageError}
                                                />
                                            )}
                                        />
                                        <Button
                                            fullWidth
                                            type="submit"
                                            size="large"
                                            disabled={loading}
                                            loading={loading && <Loading />}
                                        >
                                            Criar conta
                                        </Button>
                                        <Divider />
                                        <Stack orientation="row" justify="center">
                                            <Typography variant="body2" style={{ textAlign: 'center' }}>
                                                Já possui conta?
                                            </Typography>
                                            <Button
                                                noHover
                                                size="small"
                                                type="button"
                                                variant="text"
                                                onClick={goToSignin}
                                            >
                                                Login
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Form>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Stack>
        </Slide>
    );
}