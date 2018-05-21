import React from 'react';
import { css } from 'emotion';
import { TrackInfo } from './TrackInfo';
import Button from './Button';

export default (props) => (
    <div
        style={{
            ...props.style,
            width: '100%',
            display: 'flex',
        }}
    >
        <TrackInfo
            title={props.title}
            thumbnail={props.thumbnail}
            height={120}
        />
        <div
            className={css`
                display: flex;
                flex-flow: column;
                align-self: flex-end;
                width: 100%;
            `}
        >
            <Button onClick={props.onClick} disabled={props.isDisabled}>
                play
            </Button>
            {props.onClickCache && (
                <Button onClick={props.onClickCache}>cache!</Button>
            )}
        </div>
    </div>
);
