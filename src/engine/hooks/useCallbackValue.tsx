import { useRecoilCallback, RecoilState } from 'recoil';

const useCallbackValue = <T extends any>(state: RecoilState<T>): () => Promise<T> =>
    useRecoilCallback(({ snapshot }) => () => snapshot.getPromise(state));

export default useCallbackValue;
