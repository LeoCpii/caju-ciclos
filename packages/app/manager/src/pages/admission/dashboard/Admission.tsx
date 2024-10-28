import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import Icon from '@caju/ui/components/Icon';
import Stack from '@caju/ui/components/Stack';
import Input from '@caju/ui/components/Input';
import Slide from '@caju/ui/animations/Slide';
import Button from '@caju/ui/components/Button';
import useResize from '@caju/ui/hooks/useResize';
import useFilter from '@caju/ui/hooks/useFilter';
import Loading from '@caju/ui/components/Loading';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import Form, { Control, FormControl, useForm } from '@caju/ui/components/Form';

import type { Status } from '@caju/services/admission';
import type { CandidateData } from '@caju/services/candidates';

import BasePage from '@/layout/BasePage';
import { useGlobal } from '@/providers/global';

import Columns from './Columns';
import useAdmission from '../useAdmission';

interface FilterForm { sort: string; cpf: string; }

export default function Admission() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [fullWidth, setfullWidth] = useState(false);

    const { admission } = useGlobal();
    const { reorderCard, changeCardColumn } = useAdmission();

    const { filter, filtered, reset } = useFilter(admission);

    const [formGroup] = useForm<FilterForm>({
        form: {
            cpf: new FormControl({ value: '', type: 'cpf' }),
            sort: new FormControl({ value: 'asc' }),
        },
        handle: {
            change: (form) => {
                const { cpf } = form.values;

                if (cpf.length === 11) {
                    setIsLoading(true);

                    filter((admissao) => {
                        const columns = Object.keys(admissao.columns) as Status[];
                        const newColumns = columns.reduce((acc, column) => {
                            const filtered = admissao.columns[column].filter((candidate) => candidate.cpf === cpf);

                            return { ...acc, [column]: filtered };
                        }, {} as { [x in Status]: CandidateData[] });

                        return { ...admissao, columns: newColumns };
                    });

                    setTimeout(() => setIsLoading(false), 500);
                } else {
                    reset();
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
        const { droppableId: originColumn } = result.source;
        const draggedCandidateId = result.draggableId;
        const targetColumn = result.destination?.droppableId as string;

        const mainColumnCandidates = admission.columns[originColumn as Status];

        const origin = mainColumnCandidates.find(c => c.id === draggedCandidateId) as CandidateData;

        // Dropping outside the list
        if (!result.destination) { return; }

        // Dropping in the same position
        if (result.destination.index === result.source.index && originColumn === targetColumn) {
            console.log('mesma posição');
            return;
        }

        // Dropping in the same column
        if (originColumn === targetColumn) { reorderCard(originColumn as Status, origin, result.destination.index); }

        // // Dropping in the other column
        if (originColumn !== targetColumn) {
            changeCardColumn(
                originColumn as Status,
                targetColumn as Status,
                origin,
                result.destination.index
            );
        }
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
                <Slide enter direction="left">
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
                                        <Icon name="search" color="text.secondary" />
                                    }
                                    endIcon={
                                        control.value && (
                                            <ButtonIcon onClick={() => formGroup.setValues({ cpf: '' })}>
                                                <Icon name="times" />
                                            </ButtonIcon>
                                        )
                                    }
                                />
                            )}
                        />
                    </Form>
                </Slide>
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        isLoading
                            ? (
                                <Stack justify="center" align="center">
                                    <Loading />
                                </Stack>
                            )
                            : <Columns admission={filtered} />
                    }
                </DragDropContext>
            </Stack>
        </BasePage>
    );
}