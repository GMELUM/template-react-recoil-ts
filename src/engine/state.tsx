import { ReactNode } from 'react';
import { atom } from 'recoil';
import { TAppSector } from 'engine/types';


/**
 * Global stories atom. Do not change this section
 * for the navigation to work correctly
 */

// export const activeView = "feed";

export const defaultActive: TAppSector = {
    activePanel: "main",
    activePage: undefined,
    activeModal: undefined,
    activePopout: undefined,
}

const mapHistory = new Map<string, TAppSector[]>();
mapHistory
    .set("feed", [defaultActive])
    .set("services", [defaultActive])
    .set("messages", [defaultActive])
    .set("clips", [defaultActive])
    .set("profile", [defaultActive]);

export const ACTIVE_VIEW = atom<string>({ key: "active_view", default: "feed" });
export const ACTIVE_PANEL = atom<string>({ key: "active_panel", default: defaultActive.activePanel });
export const ACTIVE_PAGE = atom<string | number | undefined>({ key: "active_page", default: defaultActive.activePage });
export const ACTIVE_MODAL = atom<string | undefined>({ key: "active_modal", default: defaultActive.activeModal });
export const ACTIVE_POPOUT = atom<ReactNode | undefined>({ key: "active_popout", default: defaultActive.activePopout });

export const APP_HISTORY = atom<Map<string, TAppSector[]>>({ key: "app_history", default: mapHistory });