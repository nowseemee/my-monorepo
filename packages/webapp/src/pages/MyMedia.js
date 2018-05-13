import React from 'react';
import ReactPlayer from 'react-player';
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
            <div>
                {this.state.items.map((item) => {
                    return (
                        item.url && (
                            <ReactPlayer
                                key={item.url}
                                url={item.url}
                                controls
                            />
                        )
                    );
                })}
            </div>
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
