import {
    Panel,
    PanelHeader,
    Placeholder,
    PanelHeaderBack,
    Button
} from '@gmelum/vkui';
import { HTMLAttributes, FC } from 'react';

interface TestPanelProps extends HTMLAttributes<HTMLDivElement> {
    text: string;
    title: string;
}

const TestPanel: FC<TestPanelProps> = (props) => {
    const { text, title, id, children } = props;
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack />}>{title}</PanelHeader>
            <Placeholder action={children}>
                {text}
            </Placeholder>
        </Panel>
    )
}

export default TestPanel;
