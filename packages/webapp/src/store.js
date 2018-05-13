import { initStore } from 'react-waterfall';

const store = {
    initialState: {
        userId: null,
    },
    actions: {
        signIn: (store, userId) => {
            window.localStorage.setItem('userId', userId);
            return {
                ...store,
                userId,
            };
        },
        signOut: (store) => ({ ...store, userId: null }),
    },
};

export const { Provider, Consumer, connect, subscribe } = initStore(store);
