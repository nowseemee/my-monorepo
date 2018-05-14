import React from 'react';
import List from 'react-virtualized/dist/commonjs/List';
export default (props) => (
    <List
        height={1000}
        style={{ width: '100%', height: '76vh' }}
        rowHeight={200}
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
                <button
                    key={props.getId(item)}
                    style={{
                        ...style,
                        width: '100%',
                    }}
                    onClick={() => props.onClick(index)}
                    disabled={props.getIsDisabled(item)}
                >
                    <h3>{props.getTitle(item)}</h3>
                    <img
                        height={90}
                        src={props.getThumbnail(item)}
                        alt={props.getTitle(item)}
                    />
                </button>
            );
        }}
        width={10000}
    />
);
