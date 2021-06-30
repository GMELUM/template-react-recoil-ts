import { throttle } from 'throttle-debounce';
import bridge from "@vkontakte/vk-bridge";

import {
    APP_HISTORY,
    ACTIVE_VIEW,
    ACTIVE_PANEL,
    ACTIVE_PAGE,
    ACTIVE_MODAL,
    ACTIVE_POPOUT,
} from 'engine/state';

import { useCallbackState, useCallbackValue } from 'engine';

const useBackPage = () => {
    const getHistory = useCallbackValue(APP_HISTORY);
    const [getView, setView] = useCallbackState(ACTIVE_VIEW);
    const [getPanel, setPanel] = useCallbackState(ACTIVE_PANEL);
    const [getPage, setPage] = useCallbackState(ACTIVE_PAGE);
    const [getModal, setModal] = useCallbackState(ACTIVE_MODAL);
    const [getPopout, setPopout] = useCallbackState(ACTIVE_POPOUT);

    const backPage = async () => {
        const activeHistory = await getHistory();
        const activeView = await getView();
        const activePanel = await getPanel();
        const activePage = await getPage();
        const activeModal = await getModal();
        const activePopout = await getPopout();

        const activeSection = activeHistory.get(activeView)!;

        if (activeSection.length === 1) {
            bridge.send("VKWebAppClose", { "status": "success" });
        } else if (activeSection.length > 1) {
            const newSection = activeSection.slice(0, -1);
            let newStory = (newSection[newSection.length - 1]);

            activeHistory.set(activeView, newSection);
            newStory.activePanel && setPanel(newStory.activePanel);
            newStory.activePage && setPage(newStory.activePage);
            newStory.activeModal && setModal(newStory.activeModal);
            newStory.activePopout && setPopout(newStory.activePopout);
        }
    }
    return backPage;
}

export default useBackPage;