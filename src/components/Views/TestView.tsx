import { FC, HTMLAttributes, MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';

import {
    ACTIVE_PANEL
} from 'engine/state';

import {
    Button,
    View,
} from '@gmelum/vkui';

import { TestPanel } from 'components';
import { useNavigation } from 'engine';

interface TestViewProps extends HTMLAttributes<HTMLDivElement> { }

const TestView: FC<TestViewProps> = (props) => {
    const history = useNavigation();
    const activePanel = useRecoilValue(ACTIVE_PANEL);
    const { id } = props;

    const handleNextPage = (event: MouseEvent<HTMLButtonElement>) =>
        history.nextPage({ activePanel: event.currentTarget.name })

    return (
        <View id={id} activePanel={activePanel}>
            <TestPanel id="main" title="Основная" text="ОСНОВНАЯ ПАНЕЛЬ"><Button name="first" onClick={handleNextPage}>На первую панель</Button></TestPanel>
            <TestPanel id="first" title="Первая" text="ПЕРВАЯ ПАНЕЛЬ"><Button name="seconds" onClick={handleNextPage}>На вторую панель</Button></TestPanel>
            <TestPanel id="seconds" title="Вторая" text="ВТОРАЯ ПАНЕЛЬ"><Button name="third" onClick={handleNextPage}>На третью панель</Button></TestPanel>
            <TestPanel id="third" title="Третья" text="ТРЕТЬЯ ПАНЕЛЬ"><Button name="fourth" onClick={handleNextPage}>На четвертую панель</Button></TestPanel>
            <TestPanel id="fourth" title="Четвертая" text="ЧЕТВЕРТАЯ ПАНЕЛЬ"><Button name="main" onClick={handleNextPage}>На основную панель</Button></TestPanel>
        </View>
    )
}

export default TestView;