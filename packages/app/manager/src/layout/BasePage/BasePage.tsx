import { PropsWithChildren } from 'react';

import Fade from '@caju/ui/animations/Fade';

type BasePageProps = PropsWithChildren;
export default function BasePage({ children }: BasePageProps) {
    return (
        <Fade enter>
            {children}
        </Fade>
    );
}