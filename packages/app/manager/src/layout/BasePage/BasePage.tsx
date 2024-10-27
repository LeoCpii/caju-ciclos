import { cloneElement, PropsWithChildren, useState } from 'react';

import Slide from '@caju/ui/animations/Slide';
import useResize from '@caju/ui/hooks/useResize';
import Typography from '@caju/ui/components/Typography';
import Stack, { Orientation, StackProps } from '@caju/ui/components/Stack';
import Loading from '@caju/ui/components/Loading';

import { useGlobal } from '@/providers/global';
interface BasePageProps extends PropsWithChildren {
    title: string;
    subtitle?: string;
    action?: React.JSX.Element;
    backAction?: React.JSX.Element;
};
export default function BasePage({ title, subtitle, action, backAction, children }: BasePageProps) {
    const { loading } = useGlobal();

    const [{ orientation, align }, setPreferences] = useState<{
        orientation: Orientation; align: StackProps['align']
    }>({
        orientation: 'row',
        align: 'center',
    });

    useResize({
        onMobile: () => setPreferences({ orientation: 'column', align: 'baseline' }),
        onTablet: () => setPreferences({ orientation: 'row', align: 'center' }),
        onDesktop: () => setPreferences({ orientation: 'row', align: 'center' }),
        onWidescreen: () => setPreferences({ orientation: 'row', align: 'center' }),
        onFullHD: () => setPreferences({ orientation: 'row', align: 'center' }),
    }, []);

    const renderAction = (actionButton: React.JSX.Element) => {
        return cloneElement(actionButton, {
            disabled: loading,
        });
    };

    return (
        <Slide enter direction="top">
            <Stack
                orientation={orientation}
                justify="space-between"
                align={align}
                style={{ marginBottom: 32 }}
            >
                <Stack orientation="row" align="center" style={{ width: 'auto' }}>
                    {backAction}
                    <div>
                        <Typography variant="h5" noMargin>{title}</Typography>
                        {
                            subtitle && (
                                <Typography noMargin> {subtitle}</Typography>
                            )
                        }
                    </div>
                </Stack>
                {action && renderAction(action as React.JSX.Element)}
            </Stack>

            {
                loading ? (
                    <Stack justify="center" align="center" style={{ height: 300 }}>
                        <Loading size={70} />
                    </Stack>
                ) : children
            }
        </Slide>
    );
}