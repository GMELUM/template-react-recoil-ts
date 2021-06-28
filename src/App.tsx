import { useCallbackState } from 'engine';
import * as state from 'engine/state';
import { FunctionComponent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const App: FunctionComponent = () => {
    const [getCount, setCount] = useCallbackState(state.COUNT);
    const count = useRecoilValue(state.COUNT);

    useEffect(() => {
        const timer = window.setInterval(async () => {
            let i = await getCount()
            setCount(i + 1);
        }, 1000);
        return () => {
            window.clearInterval(timer);
        }
    }, [])

    return (
        <h1>{count}</h1>
    )
}

export default App;
