import { cloneElement } from 'react';

import { Colors } from '@/theme';
import { joinClass } from '@/utils';
import Icon, { type IconProps } from '@/components/Icon';
import ButtonIcon from '@/components/ButtonIcon';
import Typography from '@/components/Typography';

import './Alert.scss';

export interface AlertProps {
    color?: Colors;
    icon?: React.JSX.Element;
    children: React.JSX.Element | string;
    onClose?: () => void;
}
export default function Alert({ children, icon, color = 'primary', onClose }: AlertProps) {

    const className = joinClass([
        'cj-alert',
        `cj-alert--${color}`
    ]);

    const message = typeof children === 'string'
        ? <Typography variant="body1" color={`${color}.dark`}>{children}</Typography>
        : children;

    const renderIcon = (icon: React.JSX.Element) => {
        return cloneElement<IconProps>(icon, {
            color
        });
    };

    return (
        <div className={className}>
            {
                icon && (
                    <div className="cj-alert__icon">
                        {renderIcon(icon)}
                    </div>
                )
            }
            {message}
            {
                !!onClose && (
                    <ButtonIcon onClick={onClose}>
                        <Icon name="times" color={color} />
                    </ButtonIcon>
                )
            }
        </div>
    );
}