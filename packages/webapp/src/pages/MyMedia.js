import React from 'react';
import List from '../components/List';
import { connect } from '../store.js';

const MyMedia = (props) => (
    <List
        onClick={(index) => {
            props.actions.setPlayIndex(index);
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
