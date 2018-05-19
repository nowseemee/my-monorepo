import FilePlayer from 'react-player/lib/players/FilePlayer';
import { connect, actions } from '../store';
import { getPlaying } from '../store/utils';

const isEnabled =
    typeof window !== 'undefined' &&
    'mediaSession' in navigator &&
    typeof MediaMetadata !== 'undefined';

isEnabled &&
    navigator.mediaSession.setActionHandler(
        'previoustrack',
        actions.playPrevious
    );
isEnabled &&
    navigator.mediaSession.setActionHandler('nexttrack', actions.playNext);

export default connect((store) => {
    const track = getPlaying(store);
    if (isEnabled && track.thumbnail) {
        // eslint-disable-next-line
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: 'TheSoundGarden',
            // album: 'foo',
            artwork: [
                {
                    src: track.thumbnail,
                    sizes: '120x90',
                    type: 'image/png',
                },
                // { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
                // { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
                // { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
                // { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
                // { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
                // { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
            ],
        });

        // navigator.mediaSession.setActionHandler('play', actions.);
        // navigator.mediaSession.setActionHandler('pause', function() {});
        // navigator.mediaSession.setActionHandler('seekbackward', function() {});
        // navigator.mediaSession.setActionHandler('seekforward', function() {});
        // navigator.mediaSession.setActionHandler('previoustrack', function() {});
        // navigator.mediaSession.setActionHandler('nexttrack', actions.playNext);
    }
    return null;
})(FilePlayer);
