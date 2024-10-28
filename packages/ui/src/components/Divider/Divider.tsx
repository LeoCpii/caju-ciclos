import { HTMLAttributes } from 'react';

import joinClass from '@/utils/joinClass';

import './Divider.scss';

export type DividerProps = HTMLAttributes<HTMLElement>;
export default function Divider({ ...props }: DividerProps) {

    const clss = joinClass(['cj-divider', props.className]);

    return (
        <div {...props} className={clss} style={{ ...props.style }}></div>
    );
}
