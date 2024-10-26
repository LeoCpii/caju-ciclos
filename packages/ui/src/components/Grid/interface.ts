import { HtmlHTMLAttributes } from 'react';

import type { IntRange } from '@caju/toolkit/interface';

export type Size = {
    sm: IntRange<0, 13>;
    md: IntRange<0, 13>;
    lg: IntRange<0, 13>;
}

export type GridBaseProps = HtmlHTMLAttributes<HTMLElement> & Partial<Size>;