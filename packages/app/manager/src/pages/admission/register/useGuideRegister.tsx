import { useGuide } from '@caju/ui/components/Guide';
import Typography from '@caju/ui/components/Typography';

import { useGlobal } from '@/providers/global';

export default function useGuideRegister() {
    const { resetGuide } = useGlobal();

    return useGuide([
        {
            name: 'step-register_form',
            content: (
                <Typography variant="body1" noMargin>
                    Aqui você pode visualizar todas as candidaturas.
                </Typography>
            ),
            orientation: { horizontal: 'center', vertical: 'center' },
            callback: {
                finish: () => { resetGuide(); },
            }
        }
    ]);
};