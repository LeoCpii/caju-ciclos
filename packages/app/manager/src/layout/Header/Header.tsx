import Icon from '@caju/ui/components/Icon';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Avatar from '@caju/ui/components/Avatar';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import { useTheme, createTheme, themeDefaultLight, themeDefaultDark } from '@caju/ui/theme';

import { useUser } from '@/providers/user';
import { useGlobal } from '@/providers/global';

export default function Header() {
    const { currentUser } = useUser();
    const { startGuide } = useGlobal();
    const { theme, updateTheme } = useTheme();

    const modeIcon = theme.palette.mode === 'dark' ? 'moon' : 'sun';

    const updateMode = () => {
        const newTheme = theme.palette.mode === 'dark' ? themeDefaultLight : themeDefaultDark;
        updateTheme(createTheme(newTheme));
    };

    return (
        <div className="layout__header">
            <div className="layout__header__logo">
                <button>
                    {/* eslint-disable-next-line max-len  */}
                    <img src="https://cdn.prod.website-files.com/620135165cdb9f1d60b5d1e3/6244d22a2b78fe6d97518ce9_logo-rodape.svg" alt="" />
                </button>
            </div>

            <Stack orientation="row" justify="flex-end" align="center">
                <Button
                    size="small"
                    variant="text"
                    startIcon={<Icon name="question-circle" />}
                    onClick={startGuide}
                >
                    Ajuda
                </Button>
                <ButtonIcon onClick={updateMode}>
                    <Icon name={modeIcon} />
                </ButtonIcon>
                <div title={currentUser.email}>
                    <Avatar
                        name={currentUser.name}
                        alt={currentUser.name}
                        src={currentUser.picture}
                        sx={({ palette }) => ({ backgroundColor: palette.secondary.main })}
                    />
                </div>
            </Stack>
        </div>
    );
}