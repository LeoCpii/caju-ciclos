import { Draggable } from '@hello-pangea/dnd';

import Icon from '@caju/ui/components/Icon';
import type { Colors } from '@caju/ui/theme';
import Stack from '@caju/ui/components/Stack';
import Typography from '@caju/ui/components/Typography';
import { Card, CardContent } from '@caju/ui/components/Card';

import type { CandidateData } from '@caju/services/candidates';

export interface CandidateCardProps extends CandidateData {
    cardId?: string;
    index?: number;
    color?: Colors;
}
export default function CandidateCard({ color = 'primary', cardId = '', index = 0, ...candidate }: CandidateCardProps) {
    const { name, position, admissionDate } = candidate;

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
                                    <Typography noMargin>{name}</Typography>
                                    <Typography variant="body2" noMargin>{position}</Typography>
                                </div>

                                <Stack orientation="row" spacing="small">
                                    <Icon name="schedule" color="text.secondary" size="small" />
                                    <Typography variant="body2" noMargin>
                                        {admissionDate}
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