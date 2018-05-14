import React from 'react';
import { connect } from '../store';

export default connect((store) => {
    return {
        track: store.playListItems[store.playIndex] || {},
    };
})(({ track }) => (
    <div>
        <img src={track.thumbnail} alt={track.title} />
        {track.title}
    </div>
));
