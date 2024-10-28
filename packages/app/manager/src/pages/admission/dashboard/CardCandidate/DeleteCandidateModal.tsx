import { useState } from 'react';

import Button from '@caju/ui/components/Button';
import Loading from '@caju/ui/components/Loading';
import Typography from '@caju/ui/components/Typography';
import { Modal, ModalFooter } from '@caju/ui/components/Modal';

import { Status } from '@caju/services/admission';
import { CandidateData } from '@caju/services/candidates';

import useAdmission from '../../useAdmission';

export interface DeleteCandidateModalProps extends CandidateData {
    open: boolean;
    cardId: string;
    status: Status;
    onClose: () => void;
}
export default function DeleteCandidateModal({
    open,
    onClose,
    cardId,
    status,
    ...candidate
}: DeleteCandidateModalProps) {
    const [loading, setLoading] = useState(false);

    const { deleteCard } = useAdmission();

    const handleDelete = () => {
        setLoading(true);
        deleteCard(cardId, status)
            .finally(() => {
                setTimeout(() => { setLoading(false); }, 500);
            });
    };

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={<Typography variant="h6" noMargin>Deletar candidato</Typography>}
            subtitle={
                <Typography variant="subtitle2" noMargin weight="normal">
                    Ao deletar o candidato, você não poderá mais recuperar os dados.
                </Typography>
            }
        >
            <Typography>
                Tem certeza que deseja deletar o candidato: {candidate.name}?
            </Typography>
            <ModalFooter>
                <Button variant="text" color="primary" onClick={onClose}>
                    Voltar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    disabled={loading}
                    loading={loading && <Loading />}
                >
                    Deletar
                </Button>
            </ModalFooter>
        </Modal>
    );
}