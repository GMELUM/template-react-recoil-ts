import {
    Panel,
    PanelHeader,
    Placeholder,
    PanelHeaderBack
} from '@gmelum/vkui';
import { useNavigation } from 'engine';
import { HTMLAttributes, FC } from 'react';

interface TestPanelProps extends HTMLAttributes<HTMLDivElement> {
    text: string;
    title: string;
}

const TestPanel: FC<TestPanelProps> = (props) => {
    const history = useNavigation();
    const { text, title, id, children } = props;
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => history.backPage()} />}>{title}</PanelHeader>
            <Placeholder action={children}>
                {text}
            </Placeholder>
        </Panel>
    )
}

export default TestPanel;
