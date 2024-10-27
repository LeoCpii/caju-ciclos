import Typography from '@caju/ui/components/Typography';

import BasePage from '@/layout/BasePage';

export default function Vacancies() {
    return (
        <BasePage>
            <Typography variant="h5" noMargin>Admissão</Typography>
            <Typography noMargin>
                Detalhes sobre a admissão de novos funcionários.
            </Typography>
        </BasePage>
    );
}