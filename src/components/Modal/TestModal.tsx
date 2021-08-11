import { FC } from 'react';
import {
    ModalRoot,
    ModalCard
} from '@gmelum/vkui';

import {
    Icon28SubtitlesOutline
} from '@vkontakte/icons';

import { useRoute } from 'engine';
import { ACTIVE_MODAL } from 'engine/state';
import { useRecoilValue } from 'recoil';
import { TestPopout } from 'components';

const TestModal: FC = () => {
    const history = useRoute();
    const activeModal = useRecoilValue(ACTIVE_MODAL);
    return (
        <ModalRoot
            activeModal={activeModal || null}
            onClose={() => history.backPage()}
        >
            <ModalCard
                id="firstModal"
                onClose={() => history.backPage()}
                icon={<Icon28SubtitlesOutline width={56} height={56} />}
                header="Первое модальное окно"
                caption="Нажмите 'Далее' для открытия второго модального окна"
                actions={[{
                    title: 'Далее',
                    mode: 'primary',
                    action: () => history.nextPage({ activeModal: "secondsModal" })
                }]}
            >
            </ModalCard>

            <ModalCard
                id="secondsModal"
                onClose={() => history.backPage(false, true)}
                icon={<Icon28SubtitlesOutline width={56} height={56} />}
                header="Второе модальное окно"
                caption="Нажмите 'Далее' для открытия всплывающего окна"
                actions={[{
                    title: 'Назад',
                    mode: 'secondary',
                    action: () => history.backPage()
                }, {
                    title: 'Далее',
                    mode: 'primary',
                    action: () => history.nextPage({ activePopout: <TestPopout /> }, true)
                }]}
            />
        </ModalRoot>
    )
}

export default TestModal;