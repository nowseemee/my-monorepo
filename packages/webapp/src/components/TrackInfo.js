import React from 'react';
import { connect } from '../store';
import { getPlaying } from '../store/utils';

const TrackInfo = (track) => (
    <div>
        <img src={track.thumbnail} alt={track.title} />
        {track.title}
    </div>
);

export default connect(getPlaying)(TrackInfo);
