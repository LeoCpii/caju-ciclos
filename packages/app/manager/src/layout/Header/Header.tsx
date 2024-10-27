import { useNavigate } from 'react-router-dom';

import Icon from '@caju/ui/components/Icon';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Avatar from '@caju/ui/components/Avatar';

import { useUser } from '@/providers/user';

export default function Header() {
    const navigate = useNavigate();
    const { currentUser } = useUser();

    const goToProfile = () => { navigate('meu-perfil'); };

    console.log(currentUser);

    return (
        <div className="layout__header">
            <div className="layout__header__logo">
                <button>
                    {/* eslint-disable-next-line max-len  */}
                    <img src="https://cdn.prod.website-files.com/620135165cdb9f1d60b5d1e3/6244d22a2b78fe6d97518ce9_logo-rodape.svg" alt="" />
                </button>
            </div>

            <Stack orientation="row" justify="flex-end">
                <Button
                    size="small"
                    variant="text"
                    startIcon={<Icon name="question-circle" />}>
                    Ajuda
                </Button>
                <Avatar
                    name={currentUser.name}
                    alt={currentUser.name}
                    src={currentUser.picture}
                    onClick={goToProfile}
                />
            </Stack>
        </div>
    );
}