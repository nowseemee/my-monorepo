import React from 'react';
import List from '../components/List';
import { connect } from '../store';

const MyMedia = (props) => (
    <List
        onClick={(index) => {
            props.actions.playById(props.playListItems[index].videoId);
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
