
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Box from '@caju/ui/components/Box';
import Icon from '@caju/ui/components/Icon';
import Input from '@caju/ui/components/Input';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Loading from '@caju/ui/components/Loading';
import { useAlert } from '@caju/ui/components/Alert';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import Form, { Control, useForm, FormControl } from '@caju/ui/components/Form';

import logger from '@caju/toolkit/logger';

import { BasicCandidateData } from '@caju/services/candidates';

import { BasePage } from '@/layout';
import { useUser } from '@/providers/user';
import { candidatesServices } from '@/services/core';

export default function Register() {
    const navigate = useNavigate();
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    const { currentUser } = useUser();

    const [formGroup] = useForm<Omit<BasicCandidateData, 'ownerId'>>({
        form: {
            cpf: new FormControl({ value: '11111111111', type: 'cpf', required: true }),
            name: new FormControl({ value: 'leozin', type: 'text', required: true }),
            email: new FormControl({ value: 'teste@teste.com', type: 'email', required: true }),
            admissionDate: new FormControl({ value: '2024-10-03', required: true }),
            position: new FormControl({ value: 'frontend', required: true })
        },
        handle: {
            submit: (form) => {
                const values = form.values;

                setLoading(true);

                candidatesServices
                    .createAdmission({ ...values, ownerId: currentUser.user_id })
                    .then(() => {
                        addAlert({
                            message: 'Candidato cadastrado com sucesso!',
                            color: 'success',
                            delay: 5000
                        });
                    })
                    .catch((e) => {
                        logger.error('Error to create candidate', e);
                        addAlert({
                            message: 'Erro ao cadastrar candidato!',
                            color: 'error',
                            delay: 5000
                        });
                    })
                    .finally(() => setLoading(false));
            }
        }
    }, [loading]);

    const goBack = () => { navigate('/admissao'); };

    return (
        <BasePage
            title="Cadastro de candidato"
            subtitle="Preencha os campos abaixo para cadastrar um novo candidato."
            backAction={
                <ButtonIcon onClick={goBack}>
                    <Icon name="arrow-left" color="text.secondary" />
                </ButtonIcon>
            }
        >
            <Box style={{ maxWidth: 400 }}>
                <Form formGroup={formGroup}>
                    <Stack>
                        <Control
                            controlName="name"
                            field={(control) => (
                                <Input
                                    fullWidth
                                    label="Nome"
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
                                    label="E-mail"
                                    value={control.value}
                                    error={control.isInvalid}
                                    helperText={control.messageError}
                                />
                            )}
                        />
                        <Control
                            controlName="cpf"
                            field={(control) => (
                                <Input
                                    fullWidth
                                    label="CPF"
                                    value={control.masked}
                                    error={control.isInvalid}
                                    helperText={control.messageError}
                                />
                            )}
                        />
                        <Control
                            controlName="admissionDate"
                            field={(control) => (
                                <Input
                                    fullWidth
                                    type="date"
                                    label="Data de admissão"
                                    value={control.value}
                                    error={control.isInvalid}
                                    helperText={control.messageError}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            size="large"
                            loading={loading && <Loading size={20} color="text.secondary" />}
                        >
                            Salvar
                        </Button>
                    </Stack>
                </Form>
            </Box>
        </BasePage>
    );
}