import React from 'react';
import { css } from 'emotion';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ListItem from './ListItem';
import TrackInfo from './TrackInfo';
import Button from './Button';

export default (props) => (
    <AutoSizer>
        {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
            <List
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                width={width}
                rowHeight={120}
                rowCount={props.items.length}
                rowRenderer={({
                    index, // Index of row
                    isScrolling, // The List is currently being scrolled
                    isVisible, // This row is visible within the List (eg it is not an overscanned row)
                    key, // Unique key within array of rendered rows
                    parent, // Reference to the parent List (instance)
                    style, // Style object to be applied to row (to position it);
                    // This must be passed through to the rendered row element.
                }) => {
                    const item = props.items[index];
                    return (
                        <ListItem
                            key={props.getId(item)}
                            style={style}
                            title={props.getTitle(item)}
                            thumbnail={props.getThumbnail(item)}
                            onClick={() => props.onClick(index)}
                            isDisabled={props.getIsDisabled(item)}
                            onClickCache={() => props.onClickCache(index)}
                        />
                    );
                }}
            />
        )}
    </AutoSizer>
);
