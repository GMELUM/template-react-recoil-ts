import * as state from 'engine/state';
import { FunctionComponent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import './style.css';

const App: FunctionComponent = () => {
    const [count, setCount] = useRecoilState(state.COUNT);

    useEffect(() => {
        const timer = window.setTimeout(async () => {
            setCount(count + 1);
        }, 1000);

        return () => {
            window.clearTimeout(timer);
        }
    }, [])

    return (
        <h1>{count}</h1>
    )
}

export default App;
