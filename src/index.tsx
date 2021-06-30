import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import bridge from '@vkontakte/vk-bridge';
import App from 'App';
import './style.css';

bridge.subscribe(async (e: any) => {
    switch (e.detail.type) {
        case "VKWebAppUpdateConfig": bridge.send("VKWebAppResizeWindow", { "width": 907, "height": e.detail.data.viewport_height - 145 });
    }
});

ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    document.getElementById('root')
);

bridge.send('VKWebAppInit');
