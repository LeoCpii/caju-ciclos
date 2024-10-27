import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import Icon from '@caju/ui/components/Icon';
import Stack from '@caju/ui/components/Stack';
import Input from '@caju/ui/components/Input';
import Button from '@caju/ui/components/Button';
import useResize from '@caju/ui/hooks/useResize';
import Loading from '@caju/ui/components/Loading';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import Form, { Control, FormControl, useForm } from '@caju/ui/components/Form';

import BasePage from '@/layout/BasePage';

import Columns from './Columns';

interface FilterForm {
    sort: string;
    cpf: string;
}

export default function Admission() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [fullWidth, setfullWidth] = useState(false);

    const [formGroup] = useForm<FilterForm>({
        form: {
            cpf: new FormControl({ value: '', type: 'cpf' }),
            sort: new FormControl({ value: 'asc' }),
        },
        handle: {
            change: (form) => {
                // TODO: verificar regra de lastupdate
                const { cpf } = form.values;

                console.log('cpf', cpf);

                if (cpf.length === 11) {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 2000);
                }
            }
        }
    }, []);

    useResize({
        onMobile: () => setfullWidth(true),
        onTablet: () => setfullWidth(false),
        onDesktop: () => setfullWidth(false),
        onWidescreen: () => setfullWidth(false),
        onFullHD: () => setfullWidth(false),
    }, []);

    const goTo = () => { navigate('/admissao/cadastro'); };

    const onDragEnd = (result: DropResult) => {
        console.log(result);
    };

    return (
        <BasePage
            title="Admissão"
            subtitle="Detalhes sobre a admissão de novos funcionários."
            action={
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    fullWidth={fullWidth}
                    startIcon={<Icon name="plus" />}
                    onClick={goTo}
                >
                    Nova admissão
                </Button>
            }
        >
            <Stack>
                <Form formGroup={formGroup}>
                    <Control
                        controlName="cpf"
                        field={(control) => (
                            <Input
                                style={{ width: 'fit-content' }}
                                label="Buscar por CPF"
                                placeholder="Digite um CPF válido"
                                maxLength={14}
                                value={control.masked}
                                error={control.isInvalid}
                                helperText={control.messageError}
                                startIcon={
                                    <ButtonIcon>
                                        <Icon name="search" />
                                    </ButtonIcon>
                                }
                                endIcon={
                                    isLoading && <Loading
                                        size={15}
                                        color="text.secondary"
                                        style={{ marginRight: 40 }}
                                    />
                                }
                            />
                        )}
                    />
                </Form>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Columns />
                </DragDropContext>
            </Stack>
        </BasePage>
    );
}