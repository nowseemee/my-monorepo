import React from 'react';
import { CLIENT_ID } from '../config';
import { Consumer } from '../store.js';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

class YouTube extends React.Component {
    state = {
        playLists: {},
        playlistItems: [],
    };

    fetchPlaylistItems = (playlistId) => {
        return window.gapi.client.youtube.playlistItems
            .list({
                playlistId,
                part: 'snippet',
                maxResults: 10,
            })
            .then((response) => response.result.items);
    };

    fetchPlayLists = () =>
        window.gapi.client.youtube.channels
            .list({
                part: 'contentDetails',
                mine: true,
            })
            .then((response) => {
                this.setState({
                    playLists:
                        response.result.items[0].contentDetails
                            .relatedPlaylists,
                });

                return response.result.items[0].contentDetails.relatedPlaylists
                    .likes;
            });

    componentDidMount() {
        this.load();
    }

    handleLoad = () =>
        window.gapi.load('client,auth2', () => {
            window.gapi.client
                .init({
                    discoveryDocs: DISCOVERY_DOCS,
                    clientId: CLIENT_ID,
                    scope: SCOPES,
                })
                .then(() =>
                    this.fetchPlayLists()
                        .then(this.fetchPlaylistItems)
                        .then((playlistItems) =>
                            this.setState({ playlistItems })
                        )
                );
        });

    load = () => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/client.js';
        script.id = 'googleClient';
        script.onload = this.handleLoad;

        document.getElementById('googleClient')
            ? this.handleLoad()
            : document.body.appendChild(script);
    };

    render() {
        return (
            <div>
                <ul>
                    {this.state.playlistItems.map((i) => (
                        <li key={i.snippet.resourceId.videoId}>
                            {i.snippet.thumbnails && (
                                <img
                                    src={i.snippet.thumbnails.high.url}
                                    alt=""
                                />
                            )}
                            <div>
                                {i.snippet.title} -{' '}
                                <button
                                    onClick={() =>
                                        fetch(
                                            `/yt?v=${
                                                i.snippet.resourceId.videoId
                                            }&u=${this.props.userId}`
                                        )
                                    }
                                >
                                    {i.snippet.resourceId.videoId}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default (props) => (
    <Consumer
        mapStateToProps={({ userId }) => ({
            userId,
        })}
    >
        {({ userId }) => userId && <YouTube {...props} userId={userId} />}
    </Consumer>
);
