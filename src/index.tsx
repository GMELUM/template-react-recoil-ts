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
// const VKHeader = 48 + 15 + 55;

// const getHeighApp = () => window.outerHeight - VKHeader - ((window.screen as any).availTop || 150);

// console.log(window)

// bridge.send("VKWebAppResizeWindow", { "width": 907, "height": getHeighApp() });
// window.addEventListener("message", (data) => {
//     bridge.send("VKWebAppResizeWindow", { "width": 907, "height": getHeighApp() });

// });

bridge.send('VKWebAppInit');
