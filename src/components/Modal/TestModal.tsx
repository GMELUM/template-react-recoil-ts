import { FC } from 'react';
import {
    ModalRoot,
    ModalCard
} from '@gmelum/vkui';

import {
    Icon56MoneyTransferOutline,
    Icon56NotificationOutline
} from '@vkontakte/icons';

import { useNavigation } from 'engine';
import { ACTIVE_MODAL } from 'engine/state';
import { useRecoilValue } from 'recoil';
import { TestPopout } from 'components';

const TestModal: FC = () => {
    const history = useNavigation();
    const activeModal = useRecoilValue(ACTIVE_MODAL);
    return (
        <ModalRoot
            activeModal={activeModal || null}
            onClose={() => history.backPage()}
        >
            <ModalCard
                id={"money_send"}
                onClose={() => history.backPage()}
                icon={<Icon56MoneyTransferOutline />}
                header="Отправляйте деньги друзьям, используя банковскую карту"
                caption="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
                actions={[{
                    title: 'Попробовать',
                    mode: 'primary',
                    action: () => history.nextPage({ activeModal: "notification" })
                }]}
            >
            </ModalCard>

            <ModalCard
                id={"notification"}
                onClose={() => history.backPage(false, true)}
                icon={<Icon56NotificationOutline />}
                header="Приложение запрашивает разрешение на отправку Вам уведомлений"
                actions={[{
                    title: 'Запретить',
                    mode: 'secondary',
                    action: () => history.backPage()
                }, {
                    title: 'Разрешить',
                    mode: 'primary',
                    action: () => history.nextPage({ activePopout: <TestPopout /> }, true)
                }]}
            />
        </ModalRoot>
    )
}

export default TestModal;