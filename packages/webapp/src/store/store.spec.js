import {
    initialState,
    setPlayListItems,
    playById,
    getPlaying,
    playNext,
    playPrevious,
    setPlayListItemPropertiesByUrl,
} from './utils';

describe('store', () => {
    test('initialState', () => {
        expect(initialState).toMatchSnapshot();
    });
    test('setPlayListItems', () => {
        expect(
            setPlayListItems(initialState, [
                { title: 'Here we go', url: 'baz' },
            ])
        ).toMatchSnapshot();
    });
    test('playById', () => {
        expect(playById(initialState, 'videoId')).toMatchSnapshot();
    });

    test('getPlaying snapshot', () => {
        const madeUpState = {
            ...initialState,
            playListItems: [
                { videoId: 'foo' },
                { videoId: 'bar' },
                { videoId: 'baz' },
            ],
            playId: 'bar',
        };
        expect(getPlaying(madeUpState)).toMatchSnapshot();
    });

    test('getPlaying', () => {
        const madeUpState = {
            ...initialState,
            playListItems: [
                { videoId: 'foo' },
                { videoId: 'bar' },
                { videoId: 'baz' },
            ],
            playId: 'bar',
        };
        expect(getPlaying(madeUpState)).toEqual({ videoId: 'bar' });
    });

    test('getPlaying by default returns an empty object', () => {
        expect(getPlaying(initialState)).toEqual({});
    });

    test('playNext', () => {
        const madeUpState = {
            ...initialState,
            playListItems: [
                { videoId: 'foo' },
                { videoId: 'bar' },
                { videoId: 'baz' },
            ],
            playId: 'bar',
        };
        expect(playNext(madeUpState)).toEqual({
            ...madeUpState,
            playId: 'baz',
        });
    });
    test('playNext starts over after last item', () => {
        const madeUpState = {
            ...initialState,
            playListItems: [
                { videoId: 'foo' },
                { videoId: 'bar' },
                { videoId: 'baz' },
            ],
            playId: 'baz',
        };
        expect(playNext(madeUpState)).toEqual({
            ...madeUpState,
            playId: 'foo',
        });
    });

    test('playPrevious', () => {
        const madeUpState = {
            ...initialState,
            playListItems: [
                { videoId: 'foo' },
                { videoId: 'bar' },
                { videoId: 'baz' },
            ],
            playId: 'bar',
        };
        expect(playPrevious(madeUpState)).toEqual({
            ...madeUpState,
            playId: 'foo',
        });
    });
    test('playPrevious starts over after first item', () => {
        const madeUpState = {
            ...initialState,
            playListItems: [
                { videoId: 'foo' },
                { videoId: 'bar' },
                { videoId: 'baz' },
            ],
            playId: 'foo',
        };
        expect(playPrevious(madeUpState)).toEqual({
            ...madeUpState,
            playId: 'baz',
        });
    });

    test('setPlayListItemPropertiesByUrl', () => {
        const url = 'foo';
        const madeUpInitialState = {
            ...initialState,
            playListItems: [{ url: 'foo' }, { url: 'bar' }, { url: 'baz' }],
            playId: '',
        };

        const expectedState = {
            ...initialState,
            playListItems: [
                { url: 'foo', isCached: true },
                { url: 'bar' },
                { url: 'baz' },
            ],
            playId: '',
        };

        expect(
            setPlayListItemPropertiesByUrl(madeUpInitialState, {
                url,
                property: { isCached: true },
            })
        ).toEqual(expectedState);
    });
});
