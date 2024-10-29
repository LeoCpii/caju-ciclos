export interface StepData {
    name: string;
    content: JSX.Element;
    orientation: {
        vertical: 'top' | 'bottom' | 'center';
        horizontal: 'left' | 'right' | 'center';
    };
    callback?: {
        open?: () => void;
        start?: () => void;
        finish?: () => void;
    };
}

export interface StepLocalData extends StepData {
    visible: boolean;
}

export interface GuideOptions {
    palette: {
        primary?: string;
        secondary?: string;
    };
    label: {
        back: string;
        next: string;
        finish: string;
    }
}

export type Options = {
    finishCallback?: (index: number) => void;
}