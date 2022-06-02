import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import bridge from '@vkontakte/vk-bridge';
import App from 'App';
import './style.css';

ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    document.getElementById('root')
);

bridge.send('VKWebAppInit');
