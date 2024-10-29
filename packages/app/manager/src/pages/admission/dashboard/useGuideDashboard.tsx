import { useGuide } from '@caju/ui/components/Guide';
import Typography from '@caju/ui/components/Typography';

import { useGlobal } from '@/providers/global';

export default function useGuideDashboard() {
    const { resetGuide } = useGlobal();

    return useGuide([
        {
            name: 'step-admission_list',
            content: (
                <Typography variant="body1" noMargin>
                    Aqui você pode visualizar todas as candidaturas.
                </Typography>
            ),
            orientation: { horizontal: 'center', vertical: 'top' },
            callback: {
                finish: () => { resetGuide(); },
            }
        },
        {
            name: 'step-register_button',
            content: (
                <Typography variant="body1" noMargin>
                    Crie novas candidaturas clicando aqui.
                </Typography>
            ),
            orientation: { horizontal: 'left', vertical: 'top' },
            callback: {
                finish: () => { resetGuide(); },
            }
        }
    ]);
};