import FilePlayer from 'react-player/lib/players/FilePlayer';
import { connect, actions } from '../store';
import { getPlaying } from '../store/utils';

export default (typeof window !== 'undefined'
    ? connect((store) => {
          const track = getPlaying(store);
          return {
              playing: store.isPlaying,
              url: track.url,
              controls: true,
              config: {
                  file: {
                      forceAudio: true,
                  },
              },
              height: '32px',
              width: '100%',
              onEnded: () => actions.playNext(),
          };
      })(FilePlayer)
    : () => null);
