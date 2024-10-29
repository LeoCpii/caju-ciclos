import Chip from '@caju/ui/components/Chip';
import Stack from '@caju/ui/components/Stack';
import Avatar from '@caju/ui/components/Avatar';
import Typography from '@caju/ui/components/Typography';
import { Grid, GridItem } from '@caju/ui/components/Grid';
import { Drawer, DrawerContent } from '@caju/ui/components/Drawer';

import { maskCpf, maskDate } from '@caju/toolkit/mask';

import type { CandidateData } from '@caju/services/candidates';

interface CandiateDetailProps extends CandidateData {
    open: boolean;
    onClose: () => void;
}
export default function CandiateDetail({ open, onClose, ...candidate }: CandiateDetailProps) {
    return (
        <Drawer open={open} onClose={onClose}>
            <DrawerContent>
                <Stack data-cy="candidate-details">
                    <Stack orientation="row" justify="flex-start" align="flex-start">
                        <Avatar
                            src={candidate.picture}
                            alt={candidate.name}
                            name={candidate.name}
                        />
                        <div>
                            <Typography variant="body1" weight="bold" noMargin>{candidate.name}</Typography>
                            <Typography variant="body2" noMargin>{candidate.position}</Typography>
                        </div>
                    </Stack>

                    <Grid sm={12} md={12} lg={12}>
                        <GridItem>
                            <Typography variant="body2" weight="bold" noMargin>Contato</Typography>
                            <Typography variant="body2" noMargin>{candidate.email}</Typography>
                        </GridItem>
                        <GridItem>
                            <Typography variant="body2" weight="bold" noMargin>CPF</Typography>
                            <Typography variant="body2" noMargin>{maskCpf(candidate.cpf)}</Typography>
                        </GridItem>
                        <GridItem>
                            <Typography variant="body2" weight="bold" noMargin>Data de Admissão</Typography>
                            <Typography variant="body2" noMargin>{maskDate(candidate.admissionDate)}</Typography>
                        </GridItem>
                    </Grid>

                    <Stack>
                        <Typography variant="body2" weight="bold" noMargin>Habilidades</Typography>
                        <Stack orientation="row" spacing="small">
                            {
                                candidate.skills.map((skill) => (
                                    <Chip variant="outlined" key={skill} label={skill} />
                                ))
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </DrawerContent>
        </Drawer>
    );
}