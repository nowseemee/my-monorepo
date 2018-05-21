import React from 'react';
import List from '../components/List';
import { connect } from '../store';

function send_message_to_sw(url) {
    'serviceWorker' in navigator &&
        navigator.serviceWorker.controller !== null &&
        navigator.serviceWorker.controller.postMessage(url);
}

const MyMedia = (props) => (
    <List
        onClick={(index) => {
            props.actions.playById(props.playListItems[index].videoId);
        }}
        onClickCache={(index) => {
            send_message_to_sw(props.playListItems[index].url);
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
