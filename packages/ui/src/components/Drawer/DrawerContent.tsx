import { HtmlHTMLAttributes } from 'react';
import './Drawer.scss';

interface DrawerContentProps extends HtmlHTMLAttributes<HTMLDivElement> { children: React.ReactNode; }
export default function DrawerContent({ children, ...props }: DrawerContentProps) {
    return (
        <div className="box" {...props}>
            {children}
        </div>
    );
}