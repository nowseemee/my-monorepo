import React from 'react';
import List from '../components/List';
import { sendMessageToSw } from '../components/ServiceWorker';
import { connect, actions } from '../store';

const MyMedia = (props) => (
    <List
        mainButtonLabel="play"
        onClick={(index) => {
            props.actions.playById(props.playListItems[index].videoId);
        }}
        onClickCache={(index) => {
            const { url, thumbnail } = props.playListItems[index];
            sendMessageToSw('cacheAll', {urls : [url, thumbnail]});
            actions.setPlayListItemPropertiesByUrl({
                url,
                property: { isLoading: true },
            });
        }}
        onClickUnCache={(index) => {
            const { url, thumbnail } = props.playListItems[index];

            sendMessageToSw('uncacheAll', {urls: [url, thumbnail]});
            actions.setPlayListItemPropertiesByUrl({
                url,
                property: { isLoading: true },
            });
        }}
        items={props.playListItems}
        getThumbnail={(item) => item.thumbnail}
        getTitle={(item) => item.title}
        getId={(item) => item.url}
        getIsDisabled={() => false}
    />
);

export default connect(({ userId, playListItems }) => ({
    playListItems,
}))(MyMedia);
