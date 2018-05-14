import FilePlayer from 'react-player/lib/players/FilePlayer';
import { connect, actions } from '../store';

export default connect((store) => {
    return {
        playing: store.isPlaying,
        index: store.playIndex,
        url: (store.playListItems[store.playIndex] || {}).url,
        controls: true,
        config: {
            file: {
                forceAudio: true,
            },
        },
        height: '28px',
        width: '100%',
        onEnded: () => actions.setPlayIndex(store.playIndex + 1),
    };
})(FilePlayer);
