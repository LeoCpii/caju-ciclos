import { HTMLAttributes, CSSProperties, useEffect, useState } from 'react';

import Stack from '@/components/Stack';
import Icon from '@/components/Icon';
import joinClass from '@/utils/joinClass';
import { Card, CardContent } from '@/components/Card';
import { type ThemeBuilded, useTheme } from '@/theme';

import ButtonIcon from '../ButtonIcon';

import './Modal.scss';

type AnimationClass = 'show' | 'hide';
type Config = { animation: AnimationClass, visible: boolean };

export interface ModalProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title?: React.JSX.Element;
    subtitle?: React.JSX.Element;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    sx?: (theme: ThemeBuilded) => CSSProperties;
}
export default function Modal({ children, sx, title, subtitle, isOpen, onClose, ...props }: ModalProps) {
    const [config, setConfig] = useState<Config>({ visible: false, animation: 'hide' });
    const { theme } = useTheme();

    const ANIMATION_DURATION = 300;

    const style = sx ? sx(theme) : {};

    const className = joinClass(['cj-modal', `cj-modal--${config.animation}`]);
    const classNameContent = joinClass(['cj-modal__content', props.className]);
    const backdropClassName = joinClass(['cj-modal__backdrop', `cj-modal__backdrop--${config.animation}`]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    useEffect(() => { isOpen ? handleOpen() : handleClose(); }, [isOpen]);

    const handleOpen = () => {
        setConfig(prev => ({ ...prev, visible: true }));
        setTimeout(() => {
            setConfig(prev => ({ ...prev, animation: 'show' }));
            document.body.style.overflow = 'hidden';
        }, 100);
    };

    const handleClose = () => {
        setConfig(prev => ({ ...prev, animation: 'hide' }));
        setTimeout(() => {
            setConfig(prev => ({ ...prev, visible: false }));
            document.body.style.overflow = '';
        }, ANIMATION_DURATION);
    };

    return (
        config.visible && (
            <div className={backdropClassName} onClick={onClose}>
                <div className="cj-modal__container">
                    <Card className={className} onClick={(e) => e.stopPropagation()}>
                        <CardContent>
                            <Stack
                                orientation="row"
                                justify="space-between"
                                align="flex-start"
                                style={{ flexWrap: 'nowrap' }}
                            >
                                <div>
                                    {title}
                                    {subtitle}
                                </div>
                                <ButtonIcon onClick={onClose}>
                                    <Icon name="times" color="text.secondary" />
                                </ButtonIcon>
                            </Stack>
                            <div
                                {...props}
                                style={{ ...style, ...props.style }}
                                className={classNameContent}
                            >
                                {children}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    );
}