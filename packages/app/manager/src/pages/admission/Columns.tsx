import { Children, ReactElement, cloneElement } from 'react';

import { Droppable } from '@hello-pangea/dnd';

import Icon from '@caju/ui/components/Icon';
import type { Colors } from '@caju/ui/theme';
import Stack from '@caju/ui/components/Stack';
import Typography from '@caju/ui/components/Typography';
import { Grid, GridItem } from '@caju/ui/components/Grid';
import { Card, CardContent } from '@caju/ui/components/Card';

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
                cardId: `${columnId}-${i}`,
                index: i
            });
        });
    };

    return (
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Card>
                        <CardContent>
                            <Stack
                                spacing="small"
                                orientation="row"
                                align="center"
                                sx={({ palette }) => ({
                                    padding: '6px 12px',
                                    marginBottom: 16,
                                    borderRadius: 8,
                                    backgroundColor: palette.background.paper,
                                })}>
                                {icon}
                                {title}
                            </Stack>
                            <Stack spacing="medium">
                                {renderChildren()}
                            </Stack>
                        </CardContent>
                        {provided.placeholder}
                    </Card>
                </div>
            )}
        </Droppable>
    );
}

export default function Columns() {
    return (
        <Grid>
            <GridItem lg={4} md={4} sm={12}>
                <CardColumn
                    columnId="to-review"
                    color="primary"
                    icon={<Icon name="file-search-alt" color="text.secondary" />}
                    title={<Typography variant="body2" noMargin>Pronto para revisar</Typography>}
                >
                    <CandidateCard />
                    <CandidateCard />
                    <CandidateCard />
                </CardColumn>
            </GridItem>
            <GridItem lg={4} md={4} sm={12}>
                <CardColumn
                    columnId="approved"
                    color="success"
                    icon={<Icon name="user-check" color="text.secondary" />}
                    title={<Typography variant="body2" noMargin>Aprovado</Typography>}
                >
                    <CandidateCard />
                    <CandidateCard />
                    <CandidateCard />
                </CardColumn>
            </GridItem>
            <GridItem lg={4} md={4} sm={12}>
                <CardColumn
                    columnId="rejected"
                    color="error"
                    icon={<Icon name="user-times" color="text.secondary" />}
                    title={<Typography variant="body2" noMargin>Reprovado</Typography>}
                >
                    <CandidateCard />
                    <CandidateCard />
                    <CandidateCard />
                </CardColumn>
            </GridItem>
        </Grid>
    );
}