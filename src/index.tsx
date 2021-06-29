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

const VKHeader = 100;
const isFrames = bridge.supports("VKWebAppResizeWindow");
const getHeighApp = () => window.outerHeight - VKHeader - ((window.screen as any).availTop || 150);

bridge.send("VKWebAppResizeWindow", { "width": 907, "height": getHeighApp() });

isFrames && setInterval(() => {
    if (window.innerHeight !== getHeighApp() && window.outerHeight >= 800) {
        console.log("tick")
        bridge.send("VKWebAppResizeWindow", { "width": 907, "height": getHeighApp() });
    }
}, 500);

bridge.send('VKWebAppInit');
