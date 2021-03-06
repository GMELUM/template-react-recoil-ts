import { FC } from 'react';
import {
    Alert
} from '@gmelum/vkui';
import { useRoute } from 'engine';

const TestPopout: FC = () => {
    const history = useRoute();
    return (
        <Alert
            actions={[{
                title: 'Закрыть',
                autoclose: false,
                mode: 'cancel',
                action: () => history.backPage(true)
            }, {
                title: 'Закрыть все',
                autoclose: false,
                mode: 'destructive',
                action: () => history.backPage(true, true)
            }]}
            onClose={() => history.backPage(true)}
        >
            <h2>Внимание</h2>
            <p>Это окно можно закрыть только нажав на кнопку "Закрыть" или тапнуть на область за окном. Свайпы и системные кнопки назад не закроют это окно!</p>
        </Alert>
    );
}

export default TestPopout