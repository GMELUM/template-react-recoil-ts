import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import bridge from '@vkontakte/vk-bridge';
import App from 'App';

ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    document.getElementById('root')
);

bridge.send('VKWebAppInit');
