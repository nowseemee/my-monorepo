import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
firestore.enablePersistence();

export default class MyMedia extends React.Component {
    state = {
        items: [],
    };

    componentDidMount() {
        firestore
            .collection('users/hYf8jBANrZa5Iqx3zhBssQwK36t2/videos')
            .orderBy('timestamp')
            .onSnapshot((querySnapshot) => {
                const acc = [];

                querySnapshot.forEach((doc) => acc.push(doc.data()));
                this.setState({ items: acc });
            }, console.log);
    }

    render() {
        return (
            <div>
                {this.state.items.map((item) => {
                    console.log(item);
                    return item.url;
                })}
            </div>
        );
    }
}
