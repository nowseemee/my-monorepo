import {
    find,
    propEq,
    compose,
    prop,
    findIndex,
    inc,
    nth,
    __,
    merge,
    head,
    when,
    always,
    isNil,
    dec,
} from 'ramda';

export const initialState = {
    playId: '',
    playListItems: [],
    isPlaying: false,
    toast: {},
};
export const setPlayListItems = (store, playListItems) => ({
    ...store,
    playListItems,
});

export const playById = (store, playId) => ({
    ...store,
    playId,
    isPlaying: true,
});

const getPlayListItems = prop('playListItems');
const matchByVideoId = propEq('videoId');

export const getPlaying = (store) =>
    compose(
        when(isNil, always({})),
        find(matchByVideoId(store.playId)),
        getPlayListItems
    )(store);

const getFirstVideoId = (store) =>
    compose(prop('videoId'), head, getPlayListItems)(store);

const makeStep = (direction) => (store) =>
    compose(
        (playId = getFirstVideoId(store)) => merge(store, { playId }),
        prop('videoId'),
        nth(__, getPlayListItems(store)),
        direction,
        (videoId) =>
            findIndex(matchByVideoId(videoId))(getPlayListItems(store)),
        prop('videoId'),
        getPlaying
    )(store);

export const playNext = makeStep(inc);
export const playPrevious = makeStep(dec);
