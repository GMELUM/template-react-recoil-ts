import { FC, HTMLAttributes, MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';

import {
    ACTIVE_PANEL, ACTIVE_POPOUT
} from 'engine/state';

import {
    Button,
    View,
    Div
} from '@gmelum/vkui';

import { TestModal, TestPanel } from 'components';
import { useRoute } from 'engine';

interface TestViewProps extends HTMLAttributes<HTMLDivElement> { }

const TestView: FC<TestViewProps> = (props) => {
    const history = useRoute();
    const activePanel = useRecoilValue(ACTIVE_PANEL);
    const activePopout = useRecoilValue(ACTIVE_POPOUT);

    const { id } = props;

    const handleNextPage = (event: MouseEvent<HTMLButtonElement>) =>
        history.nextPage({ activePanel: event.currentTarget.name })

    return (
        <View id={id}
            activePanel={activePanel}
            popout={activePopout}
            modal={<TestModal />}>
            <TestPanel id="main" title="Основная" text="ОСНОВНАЯ ПАНЕЛЬ">
                <Div style={{display: 'flex'}}>
                    <Button
                        stretched
                        size="l"
                        name="first"
                        onClick={handleNextPage}
                        style={{ marginRight: 8 }}>
                        На первую панель
                    </Button>

                    <Button
                        stretched
                        size="l"
                        mode="secondary"
                        onClick={() =>
                            history.nextPage({ activeModal: "firstModal" })}>
                        Открыть модалку
                    </Button>
                </Div>
            </TestPanel>
            <TestPanel id="first" title="Первая" text="ПЕРВАЯ ПАНЕЛЬ"><Button size="l" name="seconds" onClick={handleNextPage}>На вторую панель</Button></TestPanel>
            <TestPanel id="seconds" title="Вторая" text="ВТОРАЯ ПАНЕЛЬ"><Button size="l" name="third" onClick={handleNextPage}>На третью панель</Button></TestPanel>
            <TestPanel id="third" title="Третья" text="ТРЕТЬЯ ПАНЕЛЬ"><Button size="l" name="fourth" onClick={handleNextPage}>На четвертую панель</Button></TestPanel>
            <TestPanel id="fourth" title="Четвертая" text="ЧЕТВЕРТАЯ ПАНЕЛЬ"><Button size="l" name="main" onClick={handleNextPage}>На основную панель</Button></TestPanel>
        </View>
    )
}

export default TestView;