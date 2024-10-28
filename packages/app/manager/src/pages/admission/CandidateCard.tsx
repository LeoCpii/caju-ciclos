import { Draggable } from '@hello-pangea/dnd';

import Icon from '@caju/ui/components/Icon';
import type { Colors } from '@caju/ui/theme';
import Stack from '@caju/ui/components/Stack';
import Typography from '@caju/ui/components/Typography';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import { Card, CardContent } from '@caju/ui/components/Card';
import { Menu, MenuButton, useMenu } from '@caju/ui/components/Menu';

import { Status } from '@caju/services/admission';
import type { CandidateData } from '@caju/services/candidates';

import useAdmission from './useAdmission';

export interface CandidateCardProps extends CandidateData {
    cardId?: string;
    index?: number;
    status?: Status;
    color?: Colors;
}
export default function CandidateCard({
    cardId = '',
    color = 'primary',
    status = 'pending',
    index = 0,
    ...candidate
}: CandidateCardProps) {
    const [open, el, ref, toggle] = useMenu();

    const { deleteCard } = useAdmission();

    const { name, position, admissionDate } = candidate;

    const handleDelete = () => { deleteCard(cardId, status); };

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
                                <Stack orientation="row" justify="space-between" align="center">
                                    <div>
                                        <Typography noMargin>{name}</Typography>
                                        <Typography variant="body2" noMargin>{position}</Typography>
                                    </div>
                                    <div>
                                        <div ref={ref}>
                                            <ButtonIcon
                                                color="primary"
                                                style={{ padding: 0, width: 35, height: 35 }}
                                                onClick={toggle}
                                            >
                                                <Icon name="ellipsis-v" color="text.secondary" />
                                            </ButtonIcon>
                                        </div>
                                        <Menu
                                            direction="right"
                                            width="fit-content"
                                            open={open}
                                            anchorEl={el}
                                            onClose={toggle}
                                        >
                                            <MenuButton label="Detalhes" />
                                            <MenuButton label="Excluir" onClick={handleDelete} />
                                        </Menu>
                                    </div>
                                </Stack>

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