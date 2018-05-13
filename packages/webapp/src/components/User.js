import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { CLIENT_ID } from '../config';
import Profile from './Profile';

const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

export default class User extends React.Component {
    state = {
        isLoaded: false,
    };

    componentDidMount() {
        this.load();
    }

    handleLoad = () =>
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                discoveryDocs: DISCOVERY_DOCS,
                clientId: CLIENT_ID,
                scope: SCOPES,
            });

            auth2.currentUser.listen((user) => {
                this.setState({ isLoaded: true });
                user.Zi &&
                    firebase
                        .auth()
                        .signInAndRetrieveDataWithCredential(
                            firebase.auth.GoogleAuthProvider.credential(
                                user.Zi.id_token,
                                user.Zi.access_token
                            )
                        );
            });
        });

    load() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.id = 'gapi';
        document.body.appendChild(script);
        script.onload = this.handleLoad;
    }

    getProfile() {
        return window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getBasicProfile();
    }

    signOut() {
        window.gapi.auth2.getAuthInstance().signOut();
        firebase.auth().signOut();
    }

    signIn() {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    render() {
        return !this.state.isLoaded ? (
            <h1>loading</h1>
        ) : (
            <div>
                {window.gapi.auth2.getAuthInstance().isSignedIn.get() ? (
                    <div>
                        <Profile profile={this.getProfile()} />
                        <button onClick={() => this.signOut()}>logout</button>
                    </div>
                ) : (
                    <button onClick={() => this.signIn()}>login</button>
                )}
            </div>
        );
    }
}
