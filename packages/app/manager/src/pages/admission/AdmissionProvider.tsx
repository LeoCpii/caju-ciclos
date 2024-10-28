import { createContext, useMemo } from 'react';

import Icon from '@caju/ui/components/Icon';
import { useAlert } from '@caju/ui/components/Alert';

import { deepCopy } from '@caju/toolkit/object';
import logger from '@caju/toolkit/logger';

import type { Status } from '@caju/services/admission';
import { CandidateData } from '@caju/services/candidates';

import { useGlobal } from '@/providers/global';
import { admissionServices } from '@/services/core';

import { _generateNewOrderedColumn } from './dashboard/admissionUtils';

interface AdmissionContextConfig {
    deleteCard: (cardId: string, status: Status) => Promise<void>;
    reorderCard: (originColumn: Status, candidateCard: CandidateData, targetPosition: number) => Promise<void>;
    changeCardColumn: (
        originColumn: Status,
        targetColumn: Status,
        candidateCard: CandidateData,
        position: number
    ) => Promise<void>;
}

export const AdmissionContext = createContext<AdmissionContextConfig>({
    deleteCard: () => Promise.resolve(),
    reorderCard: () => Promise.resolve(),
    changeCardColumn: () => Promise.resolve()
});

interface AdmissionProviderProps { children: React.JSX.Element; }
export default function AdmissionProvider({ children }: AdmissionProviderProps) {
    const { addAlert } = useAlert();
    const { admission, loading, updateAdmission } = useGlobal();

    const context = useMemo<AdmissionContextConfig>(() => ({
        deleteCard: async (cardId, status) => {
            deleteCard(cardId, status);
        },
        reorderCard: async (originColumn, candidateCard, targetPosition) => {
            reorderCard(originColumn, candidateCard, targetPosition);
        },
        changeCardColumn: async (originColumn, targetColumn, candidateCard, position) => {
            changeCardColumn(originColumn, targetColumn, candidateCard, position);
        }
    }), [admission, loading]);

    const sendSuccessFeedback = () => {
        addAlert({
            delay: 5000,
            color: 'success',
            message: 'Card atualizado!',
            icon: <Icon name="check" />,
        });
    };

    const sendErrorFeedback = () => {
        addAlert({
            delay: 5000,
            color: 'error',
            message: 'Erro ao atualizar card!',
            icon: <Icon name="times" />,
        });
    };

    const deleteCard = async (cardId: string, status: Status) => {
        const updatedCards = admission.columns[status].filter(card => card.id !== cardId);

        const columnUpdated = { ...admission.columns, [status]: updatedCards };

        return admissionServices.updateAdmission({
            ...admission,
            columns: columnUpdated
        }).then(() => {
            sendSuccessFeedback();
            updateAdmission((prev) => ({ ...prev, columns: columnUpdated }));
        }).catch(() => {
            sendErrorFeedback();
        });
    };

    const reorderCard = async (originColumn: Status, originCard: CandidateData, position: number) => {
        const cardsFallback = deepCopy(admission.columns[originColumn]);

        const newColumnCards = _generateNewOrderedColumn(admission.columns[originColumn], originCard, position);

        updateAdmission((prev) => ({ ...prev, columns: { ...prev.columns, [originColumn]: newColumnCards } }));

        admissionServices.updateAdmission({
            ...admission,
            columns: { ...admission.columns, [originColumn]: newColumnCards }
        }).then(() => {
            sendSuccessFeedback();
        }).catch(() => {
            sendErrorFeedback();
            logger.error('Error on reorderCard');
            updateAdmission((prev) => ({ ...prev, columns: { ...prev.columns, [originColumn]: cardsFallback } }));
        });
    };

    const changeCardColumn = async (
        originColumn: Status,
        targetColumn: Status,
        candidateCard: CandidateData,
        position: number
    ) => {
        const originColumnCards = admission.columns[originColumn];
        const targetColumnCards = admission.columns[targetColumn];

        const cardsOriginFallback = deepCopy(originColumnCards);
        const cardsTargetFallback = deepCopy(targetColumnCards);

        const originColumnWithoutOrigin = originColumnCards
            .filter((card: CandidateData) => card.id !== candidateCard.id);

        targetColumnCards.splice(position, 0, candidateCard);

        updateAdmission((prev) => ({
            ...prev,
            columns: {
                ...prev.columns,
                [originColumn]: originColumnWithoutOrigin,
                [targetColumn]: targetColumnCards
            }
        }));

        admissionServices.updateAdmission({
            ...admission,
            columns: {
                ...admission.columns,
                [originColumn]: originColumnWithoutOrigin,
                [targetColumn]: targetColumnCards
            }
        }).then(() => {
            sendSuccessFeedback();
        }).catch((e) => {
            logger.error('Error on reorderCard', e);
            sendErrorFeedback();
            updateAdmission((prev) => ({
                ...prev, columns: {
                    ...admission.columns,
                    [originColumn]: cardsOriginFallback,
                    [targetColumn]: cardsTargetFallback
                }
            }));
        });
    };

    return (
        <AdmissionContext.Provider value={context}>
            {children}
        </AdmissionContext.Provider>
    );
}