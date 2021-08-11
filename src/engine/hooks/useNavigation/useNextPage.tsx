import { useCallbackState, useCallbackValue } from 'engine';
import { TAppHistoryOptions, TAppSector } from 'engine/types';

import {
    APP_HISTORY,
    ACTIVE_VIEW,
    ACTIVE_PANEL,
    ACTIVE_PAGE,
    ACTIVE_MODAL,
    ACTIVE_POPOUT,
} from 'engine/state';

const useNextPage = () => {
    const getHistory = useCallbackValue(APP_HISTORY);
    const [getView, setView] = useCallbackState(ACTIVE_VIEW);
    const [getPanel, setPanel] = useCallbackState(ACTIVE_PANEL);
    const [getPage, setPage] = useCallbackState(ACTIVE_PAGE);
    const [getModal, setModal] = useCallbackState(ACTIVE_MODAL);
    const [getPopout, setPopout] = useCallbackState(ACTIVE_POPOUT);

    const nextPage = async (options: TAppHistoryOptions, ignoreBack: boolean = false) => {
        const activeHistory = await getHistory();
        const activeView = await getView();
        const activePanel = await getPanel();
        const activePage = await getPage();
        const activeModal = await getModal();
        const activePopout = await getPopout();

        const section = activeHistory.get(options.activeView || activeView)!;
        const endSection = section[section.length - 1];
        const keys = Object.keys(endSection).reverse();

        for (let item of keys) {
            if (!options[item]) {
                switch (item) {
                    case "activePopout": options[item] = undefined; break;
                    case "activeModal": options[item] = undefined; break;
                    case "activePage": options[item] = undefined; break;
                    case "activePanel": options[item] = endSection.activePanel; break;
                    default: ; break;
                }
            } else { break; }
        }

        const newSection: TAppSector = {
            activePanel: options.activePanel || endSection.activePanel,
            activePage: options.activePage || endSection.activePage,
            activeModal: options.activeModal || endSection.activeModal,
            activePopout: options.activePopout || endSection.activePopout,
            ignoreBack: ignoreBack
        };

        !isEqual(newSection, endSection) &&
            historyUpdate(options.activeView || activeView, activeHistory, newSection);

        activeUpdate(options, {
            activeView,
            activePanel,
            activePage,
            activeModal,
            activePopout,
        });
    };

    const activeUpdate = async (state: TAppHistoryOptions, options: TAppHistoryOptions) => {
        state.activeView && state.activeView !== options.activeView && setView(state.activeView);
        state.activePanel && state.activePanel !== options.activePanel && setPanel(state.activePanel);
        state.activePage && state.activePage !== options.activePage && setPage(state.activePage);
        state.activeModal && state.activeModal !== options.activeModal && setModal(state.activeModal);
        state.activePopout && state.activePopout !== options.activePopout && setPopout(state.activePopout);
    }

    const historyUpdate = async (activeView: string, activeHistory: Map<string, TAppSector[]>, newSection: TAppSector) => {
        const section = activeHistory.get(activeView)!;
        activeHistory.set(activeView, section.concat(newSection));
        console.log(activeHistory)
        window.history.pushState(undefined, "");
    }

    const isEqual = (first: TAppHistoryOptions, second: TAppHistoryOptions): boolean => {
        let result: boolean[] = [];
        for (let item of Object.keys(first)) {
            first[item] === second[item] ? result.push(true) : result.push(false);
        }
        return !result.includes(false);
    }

    return nextPage;
}

export default useNextPage;