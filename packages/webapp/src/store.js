import { initStore } from 'react-waterfall';
import firebase from 'firebase/app';
import 'firebase/firestore';

import config from './config';

firebase.initializeApp(config);

const firestore = firebase.firestore();

typeof window !== 'undefined' &&
    firestore.settings({ timestampsInSnapshots: true });
typeof window !== 'undefined' && firestore.enablePersistence();

const store = {
    initialState: {
        userId: null,
        playIndex: 0,
        playListItems: [],
        isPlaying: false,
    },
    actions: {
        signIn: (store, userId) => ({
            ...store,
            userId,
        }),
        signOut: (store) => ({ ...store, userId: null }),
        setPlayListItems: (store, playListItems) => ({
            ...store,
            playListItems,
        }),
        setPlayIndex: (store, playIndex) => ({
            ...store,
            playIndex,
            isPlaying: true,
        }),
    },
};

export const { Provider, Consumer, connect, subscribe, actions } = initStore(
    store
);

typeof window !== 'undefined' &&
    firestore
        .collection(`users/${window.localStorage.getItem('userId')}/videos`)
        .orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
            const acc = [];
            querySnapshot.forEach((doc) => acc.push(doc.data()));
            actions.setPlayListItems(acc);
        });
