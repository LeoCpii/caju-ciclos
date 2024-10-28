
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@caju/ui/components/Box';
import Icon from '@caju/ui/components/Icon';
import Input from '@caju/ui/components/Input';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Loading from '@caju/ui/components/Loading';
import { useAlert } from '@caju/ui/components/Alert';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import { Select, Option } from '@caju/ui/components/Select';
import Form, { Control, useForm, FormControl } from '@caju/ui/components/Form';

import logger from '@caju/toolkit/logger';

import { BasicCandidateData } from '@caju/services/candidates';

import { BasePage } from '@/layout';
import { admissionServices } from '@/services/core';
import { useGlobal } from '@/providers/global';

interface RegisterForm extends Omit<BasicCandidateData, 'ownerId' | 'position'> {
    position: BasicCandidateData['position'] | string;
}

export default function Register() {
    const navigate = useNavigate();
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    const { admission, updateAdmission } = useGlobal();

    const goTo = () => { navigate('/admissao'); };

    const [formGroup] = useForm<RegisterForm>({
        form: {
            cpf: new FormControl({ value: '11111111111', type: 'cpf', required: true }),
            name: new FormControl({ value: 'leozin', type: 'text', required: true }),
            email: new FormControl({ value: 'teste@teste.com', type: 'email', required: true }),
            admissionDate: new FormControl({ value: '2024-10-03', required: true }),
            position: new FormControl({ value: '', required: true })
        },
        handle: {
            submit: (form) => {
                const values = form.values;

                setLoading(true);

                admissionServices.addCandidate(admission.id, 'pending', {
                    ...values,
                    position: values.position as BasicCandidateData['position'],
                }).then((candidate) => {
                    updateAdmission((prev) => ({
                        ...prev,
                        columns: {
                            ...prev.columns,
                            pending: [...prev.columns.pending, candidate]
                        }
                    }));

                    addAlert({
                        delay: 5000,
                        color: 'success',
                        message: 'Candidato cadastrado com sucesso!',
                        icon: <Icon name="check" />
                    });

                    setTimeout(() => { goTo(); }, 500);
                }).catch((e) => {
                    logger.error('Error to create candidate', e);
                    addAlert({
                        delay: 5000,
                        color: 'error',
                        message: 'Erro ao cadastrar candidato!',
                        icon: <Icon name="times" />
                    });
                }).finally(() => setLoading(false));
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
                        <Control
                            controlName="position"
                            action="onChange"
                            field={(control) => (
                                <Select
                                    fullWidth
                                    label="Cargo"
                                    placeholder="Selecione um cargo"
                                    value={control.value}
                                    error={control.isInvalid}
                                    helperText={control.messageError}
                                >
                                    <Option value="frontend">Frontend</Option>
                                    <Option value="backend">Backend</Option>
                                </Select>
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