import { LiHTMLAttributes } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { joinClass } from '@caju/ui/utils';
import Icon from '@caju/ui/components/Icon';
import Ripple from '@caju/ui/components/Ripple';

import { authServices, url } from '@/services/core';

interface SidebarButtonProps extends LiHTMLAttributes<HTMLElement> {
    icon: string;
    path?: string;
}
function SidebarButton({ icon, path, ...props }: SidebarButtonProps) {
    const location = useLocation();

    const isActive = path && location.pathname.includes(path);

    const className = joinClass([
        'layout__sidebar__button',
        isActive && 'layout__sidebar__button--active',
    ]);

    return (
        <li tabIndex={0} className={className} aria-label="home" {...props}>
            <Icon name={icon} className="layout__sidebar__button__icon" />
            <Ripple />
        </li>
    );
}

export default function Sidebar() {
    const navigate = useNavigate();

    const goTo = (path: string) => { navigate(path); };

    const goToGithub = () => { window.open('https://github.com/leoCpii/caju-ciclos/', '_blank'); };

    const goToLogout = () => { authServices.logout(() => window.open(url.sso, '_self')); };

    return (
        <ul className="layout__sidebar">
            <div>
                <SidebarButton
                    path="pagina-inicial"
                    icon="user-md"
                    aria-label="página inicial"
                    onClick={() => goTo('pagina-inicial')}
                />
                <SidebarButton
                    path="admissao"
                    aria-label="admissão"
                    icon="file-edit-alt"
                    onClick={() => goTo('admissao')}
                />
            </div>

            <div>
                <SidebarButton
                    icon="github"
                    aria-label="github"
                    onClick={goToGithub}
                />
                <SidebarButton
                    icon="signout"
                    aria-label="sair"
                    onClick={goToLogout}
                />
            </div>
        </ul>
    );
}