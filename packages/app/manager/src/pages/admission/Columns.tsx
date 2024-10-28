import { Children, ReactElement, cloneElement } from 'react';

import { Droppable } from '@hello-pangea/dnd';

import Icon from '@caju/ui/components/Icon';
import Zoom from '@caju/ui/animations/Zoom';
import type { Colors } from '@caju/ui/theme';
import Stack from '@caju/ui/components/Stack';
import Slide from '@caju/ui/animations/Slide';
import Typography from '@caju/ui/components/Typography';
import { Grid, GridItem } from '@caju/ui/components/Grid';
import { Card, CardContent } from '@caju/ui/components/Card';

import { useGlobal } from '@/providers/global';

import { CANDIDATES_CONFIG } from './candidatesConfig';
import CandidateCard, { type CandidateCardProps } from './CandidateCard';

interface CardColumnProps {
    color: Colors;
    columnId: string;
    icon: React.JSX.Element;
    title: React.JSX.Element;
    children: React.ReactNode;
}
function CardColumn({ title, icon, color, columnId, children }: CardColumnProps) {

    const arrayChildren = Children.toArray(children) as ReactElement<CandidateCardProps>[];

    const renderChildren = () => {
        return arrayChildren.map((child, i) => {
            return cloneElement(child, {
                color,
                cardId: child.props.id,
                index: i
            });
        });
    };

    return (
        <Card>
            <CardContent>
                <Stack
                    spacing="small"
                    orientation="row"
                    align="center"
                    justify="space-between"
                    sx={({ palette }) => ({
                        flexWrap: 'nowrap',
                        padding: '6px 12px',
                        marginBottom: 16,
                        borderRadius: 8,
                        backgroundColor: palette.background.paper,
                    })}>
                    <Stack spacing="small" orientation="row" align="center">
                        {icon}
                        {title}
                    </Stack>
                    <Typography noMargin>{arrayChildren.length || '-'}</Typography>
                </Stack>
                <Droppable droppableId={columnId}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <Stack spacing="medium">
                                {!arrayChildren.length && (
                                    <Zoom enter>
                                        <Typography
                                            noMargin
                                            variant="body2"
                                            color="text.secondary"
                                            style={{ textAlign: 'center' }}
                                        >
                                            Lista vazia
                                        </Typography>
                                    </Zoom>
                                )}
                                {renderChildren()}
                                {provided.placeholder}
                            </Stack>
                        </div>
                    )}
                </Droppable>
            </CardContent>
        </Card>

    );
}

export default function Columns() {
    const { admission } = useGlobal();

    return (
        <Slide enter direction="top">
            <Grid>
                {
                    CANDIDATES_CONFIG.map((config, i) => (
                        <GridItem key={config.columnId} lg={4} md={4} sm={12}>
                            <CardColumn
                                columnId={config.columnId}
                                color={config.color}
                                icon={<Icon name={config.icon} color="text.secondary" />}
                                title={<Typography variant="body2" noMargin>{config.label}</Typography>}
                            >
                                {
                                    admission.columns[config.status].map((candidate) => (
                                        <CandidateCard key={candidate.id} {...candidate} />
                                    ))
                                }
                            </CardColumn>
                        </GridItem>
                    ))
                }
            </Grid>
        </Slide>
    );
}