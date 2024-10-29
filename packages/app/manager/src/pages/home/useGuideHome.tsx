import { useGuide } from '@caju/ui/components/Guide';
import Typography from '@caju/ui/components/Typography';

import { useGlobal } from '@/providers/global';

export default function useGuideHome() {
    const { resetGuide } = useGlobal();

    return useGuide([
        {
            name: 'step-social_media',
            content: (
                <>
                    <Typography variant="body1" noMargin>
                        Você pode me encontrar nas redes sociais:
                    </Typography>
                    <Typography variant="body1" noMargin>
                        <strong>GitHub</strong>, <strong>LinkedIn</strong> e <strong>E-mail</strong>.
                    </Typography>
                </>
            ),
            orientation: { horizontal: 'center', vertical: 'top' },
        },
        {
            name: 'step-admission_button',
            content: (
                <Typography variant="body1" noMargin>
                    Aqui você pode visualizar todas as admissões.
                </Typography>
            ),
            orientation: { horizontal: 'center', vertical: 'top' },
            callback: {
                finish: () => { resetGuide(); },
            }
        }
    ]);
};