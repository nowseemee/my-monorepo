import React from 'react';
import List from '../components/List';
import { sendMessageToSw } from '../components/ServiceWorker';
import { connect } from '../store';

const MyMedia = (props) => (
    <List
        mainButtonLabel="play"
        onClick={(index) => {
            props.actions.playById(props.playListItems[index].videoId);
        }}
        onClickCache={(index) => {
            sendMessageToSw('cache', props.playListItems[index].url);
        }}
        onClickUnCache={(index) => {
            sendMessageToSw('uncache', props.playListItems[index].url);
        }}
        onClickMatch={(index) => {
            sendMessageToSw('match', props.playListItems[index].url);
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
