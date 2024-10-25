import { HTMLAttributes, PropsWithChildren } from 'react';

import joinClass from '@/utils/joinClass';

import './Card.scss';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
export default function Card({ children, ...props }: CardProps) {

    const cls = joinClass(['cj-card', props.className]);

    return (
        <div {...props} className={cls}>
            {children}
        </div>
    );
}
