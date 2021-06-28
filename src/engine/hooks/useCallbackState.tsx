import { useRecoilCallback, RecoilState, SetterOrUpdater, useSetRecoilState } from 'recoil';

const useCallbackState = <T extends any>(state: RecoilState<T>): [() => Promise<T>, SetterOrUpdater<T>] =>
    [useRecoilCallback(({ snapshot }) => () => snapshot.getPromise(state)), useSetRecoilState(state)]

export default useCallbackState;
