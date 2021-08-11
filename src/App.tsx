import *  as state from 'engine/state';
import { FunctionComponent, MouseEvent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import {
    Icon28NewsfeedOutline,
    Icon28ServicesOutline,
    Icon28MessageOutline,
    Icon28ClipOutline,
    Icon28UserCircleOutline
} from '@vkontakte/icons';

import {
    Epic,
    Tabbar,
    TabbarItem
} from '@gmelum/vkui';
import { useRoute } from 'engine';
import { TestView } from 'components';

const App: FunctionComponent = () => {
    const history = useRoute();
    const activeView = useRecoilValue(state.ACTIVE_VIEW);

    useEffect(() => {
        window.addEventListener('popstate', () => history.backPage());
        window.history.pushState(undefined, "");
    }, [])

    const onStoryChange = (event: MouseEvent<HTMLDivElement>) =>
        history.nextPage({ activeView: event.currentTarget.dataset.story });

    return (
        <Epic activeStory={activeView} tabbar={
            <Tabbar>
                <TabbarItem
                    onClick={onStoryChange}
                    selected={activeView === 'feed'}
                    data-story="feed"
                ><Icon28NewsfeedOutline /></TabbarItem>
                <TabbarItem
                    onClick={onStoryChange}
                    selected={activeView === 'services'}
                    data-story="services"
                ><Icon28ServicesOutline /></TabbarItem>
                <TabbarItem
                    onClick={onStoryChange}
                    selected={activeView === 'messages'}
                    data-story="messages"
                    label="12"
                ><Icon28MessageOutline /></TabbarItem>
                <TabbarItem
                    onClick={onStoryChange}
                    selected={activeView === 'clips'}
                    data-story="clips"
                ><Icon28ClipOutline /></TabbarItem>
                <TabbarItem
                    onClick={onStoryChange}
                    selected={activeView === 'profile'}
                    data-story="profile"
                ><Icon28UserCircleOutline /></TabbarItem>
            </Tabbar>}>

            <TestView id="feed" />
            <TestView id="services" />
            <TestView id="messages" />
            <TestView id="clips" />
            <TestView id="profile" />

        </Epic>
    )
}

export default App;
