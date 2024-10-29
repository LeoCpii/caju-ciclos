import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Icon from '@caju/ui/components/Icon';
import Stack from '@caju/ui/components/Stack';
import Button from '@caju/ui/components/Button';
import Divider from '@caju/ui/components/Divider';
import Typography from '@caju/ui/components/Typography';
import ButtonIcon from '@caju/ui/components/ButtonIcon';
import Slide from '@caju/ui/animations/Slide';
import { Step } from '@caju/ui/components/Guide';

import BasePage from '@/layout/BasePage';
import { useGlobal } from '@/providers/global';

import useGuideHome from './useGuideHome';

const SOCIAL_MEDIA = [
    {
        icon: 'github', callback: () => { window.open('https://github.com/leoCpii/'); }
    },
    {
        icon: 'linkedin', callback: () => {
            window.open('https://www.linkedin.com/in/leonardo-goncalves-melo/', '_blank');
        }
    },
    {
        icon: 'envelope', callback: () => {
            const mailTo = 'leogoncalves.contato@gmail.com';
            const subject = 'Desafio Caju';
            const message = 'Olá, Leozinho! Gostaria de saber mais sobre o desafio da Caju. Poderia me ajudar?';

            window.location.href = `mailto:${mailTo}?subject=${subject}&body=${message}`;
        }
    }
];

export default function Home() {
    const navigate = useNavigate();
    const { start } = useGuideHome();
    const { pageToGuide } = useGlobal();

    const goToAdmissions = () => { navigate('/admissao'); };

    useEffect(() => { if (pageToGuide === 'pagina-inicial') { start(); } }, [pageToGuide]);

    return (
        <BasePage
            title="Olá!"
            subtitle="Seja bem-vindo(a) ao meu desafio da Caju!"
        >
            <Divider />
            <Stack spacing="small">
                <Slide enter direction="left">
                    <div>
                        <Typography>
                            Me chamo Leonardo, mas pode me chamar de <strong>Leozinho</strong>.
                        </Typography>
                        <Typography>
                            {/* eslint-disable-next-line max-len */}
                            Sou desenvolvedor front-end e estou <strong>muito feliz</strong> em participar deste desafio!
                        </Typography>
                        <Typography>
                            Este é um projeto de exemplo que desenvolvi para mostrar um pouco do meu trabalho.
                        </Typography>
                        <Typography>
                            Espero que gostem!
                        </Typography>
                    </div>
                </Slide>

                <Slide enter direction="bottom">
                    <Step name="step-social_media">
                        <Stack orientation="row">
                            {
                                SOCIAL_MEDIA.map(({ icon, callback }, i) => (
                                    <Slide
                                        enter
                                        key={icon}
                                        direction="top"
                                        delay={(i + 1) * 100}
                                    >
                                        <ButtonIcon onClick={callback}>
                                            <Icon name={icon} />
                                        </ButtonIcon>
                                    </Slide>
                                ))
                            }
                        </Stack>
                    </Step>
                </Slide>

                <Divider />

                <Slide enter direction="right">
                    <Stack orientation="row" justify="center">
                        <Step name="step-admission_button">
                            <Button onClick={goToAdmissions}>
                                Ir para admissões
                            </Button>
                        </Step>
                    </Stack>
                </Slide>
            </Stack>
        </BasePage >
    );
}