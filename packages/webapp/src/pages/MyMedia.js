import React from 'react';
import FilePlayer from 'react-player/lib/players/FilePlayer';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { Consumer } from '../store.js';

const firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });
firestore.enablePersistence();

class MyMedia extends React.Component {
    state = {
        items: [],
    };

    componentDidMount() {
        firestore
            .collection(`users/${this.props.userId}/videos`)
            .orderBy('timestamp')
            .onSnapshot((querySnapshot) => {
                const acc = [];
                querySnapshot.forEach((doc) => acc.push(doc.data()));
                this.setState({ items: acc });
            });
    }

    render() {
        return (
            <ul>
                {this.state.items.map((item) => {
                    return (
                        item.url && (
                            <li key={item.url}>
                                <h3>{item.title}</h3>
                                <img src={item.thumbnail} alt={item.title} />

                                <FilePlayer
                                    url={item.url}
                                    controls
                                    config={{
                                        file: {
                                            forceAudio: true,
                                        },
                                    }}
                                    height={'28px'}
                                    width={'80vw'}
                                />
                            </li>
                        )
                    );
                })}
            </ul>
        );
    }
}

export default (props) => {
    return global.isServer ? (
        <h1>loading</h1>
    ) : (
        <Consumer
            mapStateToProps={({ userId }) => ({
                userId,
            })}
        >
            {({ userId }) => (
                <MyMedia
                    {...props}
                    userId={userId || window.localStorage.getItem('userId')}
                />
            )}
        </Consumer>
    );
};
