import { ReactNode } from "react"

export type TAppHistory = {
    [activeView: string]: TAppSector[];
}

export type TAppSector = {
    activePanel: string;
    activePage?: string | number;
    activeModal?: string;
    activePopout?: ReactNode;
    ignoreBack?: boolean;
}

export type TAppHistoryOptions = {
    [key: string]: any;
} & {
    activeView?: string;
    activePanel?: string;
    activePage?: string | number;
    activeModal?: string;
    activePopout?: ReactNode;
}