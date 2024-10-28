import Stack from '@/components/Stack';

interface ModalFooterProps { children: React.ReactNode; }
export default function ModalFooter({ children }: ModalFooterProps) {
    return (
        <Stack orientation="row" justify="flex-end" align="center">
            {children}
        </Stack>
    );
}