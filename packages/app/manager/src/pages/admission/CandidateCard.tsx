import { Draggable } from '@hello-pangea/dnd';

import Icon from '@caju/ui/components/Icon';
import type { Colors } from '@caju/ui/theme';
import Stack from '@caju/ui/components/Stack';
import Typography from '@caju/ui/components/Typography';
import { Card, CardContent } from '@caju/ui/components/Card';

export interface CandidateCardProps {
    cardId?: string;
    index?: number;
    color?: Colors;
}
export default function CandidateCard({ color = 'primary', cardId = '', index = 0 }: CandidateCardProps) {
    return (
        <Draggable
            key={cardId}
            index={index}
            draggableId={cardId}
        >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card

                        sx={({ palette }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            borderLeft: `4px solid ${palette[color].main}`,
                        })}>

                        <Icon
                            color="divider"
                            name="draggabledots"
                            style={{ paddingLeft: 8, cursor: 'grab', }}
                        />
                        <CardContent style={{ width: '100%', paddingLeft: 8 }}>
                            <Stack spacing="small" orientation="column">
                                <div>
                                    <Typography noMargin>Isabela Melo Almeida</Typography>
                                    <Typography variant="body2" noMargin>Desenvolvedora</Typography>
                                </div>

                                <Stack orientation="row" spacing="small">
                                    <Icon name="schedule" color="text.secondary" size="small" />
                                    <Typography variant="body2" noMargin>
                                        10/10/2024
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}