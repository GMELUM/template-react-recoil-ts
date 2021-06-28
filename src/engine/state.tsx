import { atom } from 'recoil';

export const COUNT = atom<number>({ key: 'count', default: 0 });
