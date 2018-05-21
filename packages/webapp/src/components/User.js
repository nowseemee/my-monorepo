import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { CLIENT_ID } from '../config';
import { css } from 'emotion';
import Profile from './Profile';
import { connect, initFirestore } from '../store';
import Button from './Button';
import unicorn from '../unicorn.png';

const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const User = (props) =>
    props.isSignedIn
        ? [
              <Profile key={1} profile={props.profile} />,
              <Button key={0} onClick={props.onSignOut}>
                  logout
              </Button>,
          ]
        : [
              <img
                  key={2}
                  src={unicorn}
                  alt={'logged out profile placeholder'}
                  className={css`
                      height: 104px;
                  `}
              />,
              <Button key={3} onClick={props.onSignIn}>
                  login
              </Button>,
          ];

class UserContainer extends React.Component {
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
                !user.Zi ? this.handleSignOut() : this.handleSignIn(user);
            });
        });

    load = () => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.id = 'googlePlatform';
        script.onload = this.handleLoad;

        document.getElementById('googlePlatform')
            ? this.handleLoad()
            : document.body.appendChild(script);
    };

    getProfile() {
        return window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getBasicProfile();
    }

    handleSignOut() {
        window.gapi.auth2.getAuthInstance().signOut();
        firebase.auth().signOut();
        window.localStorage.removeItem('userId');
    }

    handleSignIn(user) {
        firebase
            .auth()
            .signInAndRetrieveDataWithCredential(
                firebase.auth.GoogleAuthProvider.credential(
                    user.Zi.id_token,
                    user.Zi.access_token
                )
            )
            .then(({ user }) => {
                initFirestore(user.uid);
                window.localStorage.setItem('userId', user.uid);
            });
    }

    signIn() {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    render() {
        return !this.state.isLoaded ? (
            <img
                src={unicorn}
                alt={'loading profile placeholder'}
                className={css`
                    height: 104px;
                `}
            />
        ) : (
            <User
                onSignOut={this.handleSignOut}
                onSignIn={this.signIn}
                profile={this.getProfile()}
                isSignedIn={window.gapi.auth2
                    .getAuthInstance()
                    .isSignedIn.get()}
            />
        );
    }
}

export default connect(({ userId }) => ({
    userId,
}))(UserContainer);
