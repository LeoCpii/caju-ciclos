import Typography from '@caju/ui/components/Typography';

import BasePage from '@/layout/BasePage';
import { useUser } from '@/providers/user';

export default function Profile() {
    const { currentUser } = useUser();

    return (
        <BasePage title="Perfil">
            <Typography>{currentUser.name}</Typography>
            <Typography>{currentUser.email}</Typography>
            <Typography>{currentUser.user_id}</Typography>
            <Typography>{currentUser.picture}</Typography>
        </BasePage>
    );
}