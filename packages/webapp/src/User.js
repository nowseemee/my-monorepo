import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class User extends React.Component {
    state = {
        playLists: {},
        playlistItems: [],
        user: null,
    };
    componentDidMount() {
        return !window.localStorage.getItem('ytToken')
            ? null
            : (() => {
                  window.gapi.client.setToken({
                      access_token: window.localStorage.getItem('ytToken'),
                  });

                  window.gapi.client.youtube.channels
                      .list({
                          part: 'contentDetails',
                          mine: true,
                      })
                      .then(
                          (r) =>
                              r.result.items[0].contentDetails.relatedPlaylists
                                  .likes
                      )
                      .then(this.fetchPlaylistItems)
                      .then((playlistItems) =>
                          this.setState({ playlistItems })
                      );
              })();
    }

    fetchPlaylistItems = (playlistId) => {
        return window.gapi.client.youtube.playlistItems
            .list({
                playlistId,
                part: 'snippet',
                maxResults: 10,
            })
            .then((response) => response.result.items);
    };
    setToken = (result) => {
        const token = result.credential.accessToken;
        window.localStorage.setItem('ytToken', token);
        window.gapi.client.setToken({ access_token: token });
        return token;
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
    createProvider = () =>
        new firebase.auth.GoogleAuthProvider().addScope(
            'https://www.googleapis.com/auth/youtube.readonly'
        );

    signInWithPopUp = (provider) => firebase.auth().signInWithPopup(provider);

    setPersistence = () =>
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    handleLogin = () => {
        this.setPersistence()
            .then(this.createProvider)
            .then(this.signInWithPopUp)
            .then(this.setToken)
            .then(this.fetchPlayLists)
            .then(this.fetchPlaylistItems)
            .then((playlistItems) => this.setState({ playlistItems }));
    };

    handleLogout = () => {
        this.setState({ playlistItems: [] });
        window.localStorage.removeItem('ytToken');
        firebase.auth().signOut();
    };
    render() {
        return (
            <div>
                <ul>
                    {this.state.playlistItems.map((i) => (
                        <li key={i.snippet.resourceId.videoId}>
                            <img src={i.snippet.thumbnails.high.url} alt="" />
                            <div>
                                {i.snippet.title} -{' '}
                                {i.snippet.resourceId.videoId}
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={this.handleLogout}>logout</button>
                <button onClick={this.handleLogin}>login</button>
            </div>
        );
    }
}
