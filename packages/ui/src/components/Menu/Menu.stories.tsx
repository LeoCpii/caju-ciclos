import { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button';

import Menu from './Menu';
import useMenu from './useMenu';

const meta: Meta<typeof Menu> = {
    title: 'components/Menu',
    component: Menu,
};

export const Template: StoryObj<typeof Menu> = {
    render: () => {
        const [open, el, ref, toggle] = useMenu();

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div ref={ref}>
                    <Button onClick={toggle}>Toggle Menu</Button>
                </div>
                <Menu direction="right" anchorEl={el} open={open} onClose={toggle}>
                    <div>Um texto aqui</div>
                    <div>Um texto aqui</div>
                    <div>Um texto aqui</div>
                    <div>Um texto aqui</div>
                    <div>Um texto aqui</div>
                </Menu>
            </div>
        );
    }
};

export default meta;