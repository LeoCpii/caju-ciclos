import { cloneElement, PropsWithChildren, useState } from 'react';

import Slide from '@caju/ui/animations/Slide';
import useResize from '@caju/ui/hooks/useResize';
import Typography from '@caju/ui/components/Typography';
import Stack, { Orientation, StackProps } from '@caju/ui/components/Stack';
import Loading from '@caju/ui/components/Loading';

import { release } from '@/services/core';
import { useGlobal } from '@/providers/global';

import './BasePage.scss';

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
    }>({ align: 'center', orientation: 'row' });

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
        <Stack justify="space-between" className="base-page-container" style={{ height: '100%' }}>
            <Slide enter direction="top">
                <div>
                    {backAction}
                    <Stack
                        orientation={orientation}
                        justify="space-between"
                        align={align}
                        style={{ marginBottom: 32 }}
                    >
                        <Stack orientation="row" align="center" style={{ width: 'auto' }}>
                            <div>
                                <Typography variant="h5" noMargin>{title}</Typography>
                                {
                                    subtitle && (
                                        <Typography variant="subtitle1" weight="normal" noMargin>
                                            {subtitle}
                                        </Typography>
                                    )
                                }
                            </div>
                        </Stack>
                        {action && renderAction(action as React.JSX.Element)}
                    </Stack>
                    {
                        loading ? (
                            <Stack justify="center" align="center" className="base-page__loading-container">
                                <Loading size={70} />
                            </Stack>
                        ) : (
                            <div className="">
                                {children}
                            </div>
                        )
                    }
                </div>
            </Slide>

            <Stack
                justify="center"
                align="center"
                sx={({ palette }) => ({ color: palette.text.secondary })}
            >
                <span>Versão: {release}</span>
            </Stack>
        </Stack >
    );
}