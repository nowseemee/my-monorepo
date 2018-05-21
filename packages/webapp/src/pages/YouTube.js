import React from 'react';
import { find, propEq, pathOr } from 'ramda';
import { CLIENT_ID } from '../config';
import { connect } from '../store';
import List from '../components/List';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

class YouTube extends React.Component {
    state = {
        youTubePlayLists: {},
        youTubeItems: [],
    };

    fetchYouTubeItems = (playlistId) => {
        return window.gapi.client.youtube.playlistItems
            .list({
                playlistId,
                part: 'snippet',
                maxResults: 50,
            })
            .then((response) => response.result.items);
    };

    fetchYouTubePlayLists = () =>
        window.gapi.client.youtube.channels
            .list({
                part: 'contentDetails',
                mine: true,
            })
            .then((response) => {
                this.setState({
                    youTubePlayLists:
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
                .then(this.fetchYouTubePlayLists)
                .then(this.fetchYouTubeItems)
                .then((youTubeItems) => this.setState({ youTubeItems }));
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
            <List
                mainButtonLabel="obtain"
                getThumbnail={pathOr('', [
                    'snippet',
                    'thumbnails',
                    'high',
                    'url',
                ])}
                getTitle={(item) => item.snippet.title}
                items={this.state.youTubeItems}
                onClick={(index) =>
                    fetch(
                        `/yt?v=${
                            this.state.youTubeItems[index].snippet.resourceId
                                .videoId
                        }&u=${window.localStorage.getItem('userId')}`
                    )
                }
                getId={(item) => item.snippet.resourceId.videoId}
                getIsDisabled={(item) =>
                    find(propEq('videoId', item.snippet.resourceId.videoId))(
                        this.props.playListItems
                    )
                }
            />
        );
    }
}

export default connect(({ playListItems }) => ({
    playListItems,
}))(YouTube);
