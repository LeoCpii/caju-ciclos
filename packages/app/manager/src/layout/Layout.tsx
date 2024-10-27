import Box from '@caju/ui/components/Box';
import Stack from '@caju/ui/components/Stack';
import Slide from '@caju/ui/animations/Slide';

import Header from './Header';
import Sidebar from './Sidebar';

import './Layout.scss';

interface LayoutProps { children: React.JSX.Element; }
export default function Layout({ children }: LayoutProps) {
    return (
        <Box className="layout" sx={({ palette }) => ({ backgroundColor: palette.background.default })}>
            <Slide enter direction="top" timeout={.3}>
                <Header />
            </Slide>
            <Stack orientation="row" nogap>
                <Slide enter direction="left" timeout={.3}>
                    <Sidebar />
                </Slide>
                <Box
                    className="layout__content"
                    sx={({ palette }) => ({ backgroundColor: palette.background.paper })}
                >
                    {children}
                </Box>
            </Stack>
        </Box>
    );
}