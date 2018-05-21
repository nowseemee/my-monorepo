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
            height={180}
        />
        <div
            className={css`
                display: flex;
                flex-flow: column;
                align-self: flex-end;
                width: 100%;
            `}
        >
            <Button
                onClick={() => props.onClick(props.index)}
                disabled={props.isDisabled}
            >
                {props.mainButtonLabel}
            </Button>
            {props.onClickCache && (
                <Button onClick={() => props.onClickCache(props.index)}>
                    cache!
                </Button>
            )}
            {props.onClickUnCache && (
                <Button onClick={() => props.onClickUnCache(props.index)}>
                    uncache!
                </Button>
            )}
            {props.onClickMatch && (
                <Button onClick={() => props.onClickMatch(props.index)}>
                    match!
                </Button>
            )}
        </div>
    </div>
);
