import { useCallbackState } from 'engine';
import { TAppHistoryOptions, TAppHistory, TAppSector } from 'engine/types';

import update from 'immutability-helper';

import {
    APP_HISTORY,
    ACTIVE_VIEW,
    ACTIVE_PANEL,
    ACTIVE_PAGE,
    ACTIVE_MODAL,
    ACTIVE_POPOUT,
} from 'engine/state';

type THistory = {
    activeHistory: TAppHistory;
    activeView: string;
    activePanel: string;
    activePage: string | number | undefined;
    activeModal: string | undefined;
    activePopout: React.ReactNode;
}

const useNextPage = () => {
    const [getHistory, setHistory] = useCallbackState(APP_HISTORY);
    const [getView, setView] = useCallbackState(ACTIVE_VIEW);
    const [getPanel, setPanel] = useCallbackState(ACTIVE_PANEL);
    const [getPage, setPage] = useCallbackState(ACTIVE_PAGE);
    const [getModal, setModal] = useCallbackState(ACTIVE_MODAL);
    const [getPopout, setPopout] = useCallbackState(ACTIVE_POPOUT);

    const nextPage = async (options: TAppHistoryOptions) => {
        const history = {
            activeHistory: await getHistory(),
            activeView: await getView(),
            activePanel: await getPanel(),
            activePage: await getPage(),
            activeModal: await getModal(),
            activePopout: await getPopout()
        };

        const section = history.activeHistory[options.activeView || history.activeView];
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
            activePanel: options.activePanel!,
            activePage: options.activePage,
            activeModal: options.activeModal,
            activePopout: options.activePopout,
        };

        !isEqual(newSection, endSection) &&
            historyUpdate(options.activeView || history.activeView, history, newSection);

        activeUpdate(options);
    };

    const activeUpdate = (state: TAppHistoryOptions) => {
        state.activeView && setView(state.activeView);
        state.activePanel && setPanel(state.activePanel);
        state.activePage && setPage(state.activePage);
        state.activeModal && setModal(state.activeModal);
        state.activePopout && setPopout(state.activePopout);
    }

    const historyUpdate = (activeView: string, history: THistory, newSection: TAppSector) => {
        setHistory(update(history.activeHistory, { [activeView]: { $push: [newSection] } }));
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