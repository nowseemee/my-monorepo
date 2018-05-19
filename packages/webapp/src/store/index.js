import { initStore } from 'react-waterfall';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { initialState, setPlayListItems, playById, playNext } from './utils';
import config from '../config';

firebase.initializeApp(config);

const firestore = firebase.firestore();
typeof window !== 'undefined' &&
    firestore.settings({ timestampsInSnapshots: true });
typeof window !== 'undefined' && firestore.enablePersistence();

const store = {
    initialState,
    actions: {
        setPlayListItems,
        playById,
        playNext,
    },
};

export const { Provider, Consumer, connect, subscribe, actions } = initStore(
    store
);

export const initFirestore = (userId) => {
    firestore
        .collection(`users/${userId}/videos`)
        .orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
            const acc = [];
            querySnapshot.forEach((doc) => acc.push(doc.data()));
            actions.setPlayListItems(acc);
        });
};
