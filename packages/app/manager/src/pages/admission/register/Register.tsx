
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@caju/ui/components/Box';
import Icon from '@caju/ui/components/Icon';
import Input from '@caju/ui/components/Input';
import Slide from '@caju/ui/animations/Slide';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Loading from '@caju/ui/components/Loading';
import { useAlert } from '@caju/ui/components/Alert';
import { Select, Option } from '@caju/ui/components/Select';
import Form, { Control, useForm, FormControl } from '@caju/ui/components/Form';
import { Step } from '@caju/ui/components/Guide';

import logger from '@caju/toolkit/logger';

import { BasicCandidateData } from '@caju/services/candidates';

import { BasePage } from '@/layout';
import { useGlobal } from '@/providers/global';
import { admissionServices } from '@/services/core';

import useGuideRegister from './useGuideRegister';

interface RegisterForm extends Omit<BasicCandidateData, 'ownerId' | 'position'> {
    position: BasicCandidateData['position'] | string;
}

export default function Register() {
    const navigate = useNavigate();
    const { addAlert } = useAlert();
    const { start } = useGuideRegister();
    const [loading, setLoading] = useState(false);

    const { admission, updateAdmission, pageToGuide } = useGlobal();

    const goTo = () => { navigate('/admissao'); };

    const [formGroup] = useForm<RegisterForm>({
        form: {
            cpf: new FormControl({ value: '', type: 'cpf', required: true }),
            name: new FormControl({ value: '', type: 'text', required: true }),
            email: new FormControl({ value: '', type: 'email', required: true }),
            admissionDate: new FormControl({ value: '', required: true }),
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
        },
        validator: {
            name: (form) => {
                const { name } = form.values;

                const [firstName, secondName] = name.split(' ');

                const isValidName = (name: string) => {
                    const numberValidator = !/\d+/g.test(name.charAt(0));
                    const lengthValidator = name.length >= 2;

                    return numberValidator && lengthValidator;
                };

                if (!isValidName(firstName)) { return 'Informe o nome válido'; }

                if (!secondName || !isValidName(secondName)) { return 'Informe o nome completo'; }

                return '';
            },
        },
    }, []);

    useEffect(() => { if (pageToGuide === 'cadastro') { start(); } }, [pageToGuide]);

    const goBack = () => { navigate('/admissao'); };

    return (
        <BasePage
            title="Cadastro de candidato"
            subtitle="Preencha os campos abaixo para cadastrar um novo candidato."
            backAction={
                <Button
                    size="small"
                    variant="text"
                    startIcon={<Icon name="arrow-left" color="text.secondary" />}
                    onClick={goBack}
                    style={{ padding: 0, }}
                >
                    Voltar
                </Button>
            }
        >
            <Step name="step-register_form">
                <Box style={{ maxWidth: 400, paddingRight: 16 }}>
                    <Slide enter direction="left" delay={150}>
                        <Form formGroup={formGroup}>
                            <Stack>
                                <Control
                                    controlName="name"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            label="Nome"
                                            placeholder="ex: João das Meves"
                                            value={control.value}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                            data-cy="name-input"
                                        />
                                    )}
                                />
                                <Control
                                    controlName="email"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            label="E-mail"
                                            placeholder="ex: joao.neves@caju.com.br"
                                            value={control.value}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                            data-cy="email-input"
                                        />
                                    )}
                                />
                                <Control
                                    controlName="cpf"
                                    field={(control) => (
                                        <Input
                                            fullWidth
                                            maxLength={14}
                                            label="CPF"
                                            placeholder="000.000.000-00"
                                            value={control.masked}
                                            error={control.isInvalid}
                                            helperText={control.messageError}
                                            data-cy="cpf-input"
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
                                            data-cy="admission-date-input"
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
                                            data-cy="position-select"
                                        >
                                            <Option
                                                value="frontend"
                                                data-cy="frontend-option"
                                            >
                                                Frontend
                                            </Option>
                                            <Option value="backend">Backend</Option>
                                        </Select>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    size="large"
                                    data-cy="submit-button"
                                    loading={loading && <Loading size={20} color="text.secondary" />}
                                >
                                    Salvar
                                </Button>
                            </Stack>
                        </Form>
                    </Slide>
                </Box>
            </Step>
        </BasePage>
    );
}