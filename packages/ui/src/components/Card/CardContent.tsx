import { HTMLAttributes, PropsWithChildren } from 'react';

import joinClass from '@/utils/joinClass';

import './Card.scss';

type CardContentProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
export default function CardContent({ children, ...props }: CardContentProps) {

    const cls = joinClass(['cj-card__content', props.className]);

    return (
        <div {...props} className={cls}>
            {children}
        </div>
    );
}
