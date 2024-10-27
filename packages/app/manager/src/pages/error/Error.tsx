import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Fade from '@caju/ui/animations/Fade';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Typography from '@caju/ui/components/Typography';

import { IProps, TStatus } from './interface';

export default function Error({ status = '404' }: IProps) {
    const [animate, setAnimate] = useState(false);
    const { status: statusParams } = useParams<{ status: TStatus }>();

    const currentStatus = status || statusParams as TStatus;

    useEffect(() => setAnimate(true), []);

    const MAP = {
        404: 'Não conseguimos encontrar a página solicitada.',
        403: 'Você não pode acessar a página solicitada.',
        500: 'Ocorreu um erro inesperado! Por favor, tente novamente mais tarde.'
    };

    return (
        <Fade enter={animate}>
            <Stack>
                <div>
                    <Typography variant="h3">
                        Ooops...
                    </Typography>
                    <Typography variant="h6" noMargin>
                        Algo deu errado
                    </Typography>
                    <Typography variant="body1">
                        ERRO <strong>{currentStatus}</strong> - {MAP[currentStatus]}.
                    </Typography>
                    <Button>Voltar</Button>
                </div>
            </Stack>
        </Fade>
    );
}
