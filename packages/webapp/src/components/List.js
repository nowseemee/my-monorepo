import React from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ListItem from './ListItem';

export default (props) => (
    <AutoSizer>
        {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
            <List
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                width={width}
                rowHeight={180}
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
                            index={index}
                            style={style}
                            title={props.getTitle(item)}
                            thumbnail={props.getThumbnail(item)}
                            mainButtonLabel={props.mainButtonLabel}
                            onClick={props.onClick}
                            onClickCache={props.onClickCache}
                            onClickUnCache={props.onClickUnCache}
                            isDisabled={props.getIsDisabled(item)}
                            isCached={item.isCached}
                            isLoading={item.isLoading}
                        />
                    );
                }}
            />
        )}
    </AutoSizer>
);
