import React from 'react';
import { css } from 'emotion';
import { TrackInfo } from './TrackInfo';
import Button from './Button';
import Spinner from './Spinner';

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
            {props.onClickCache &&
                !props.isCached && (
                    <Button onClick={() => props.onClickCache(props.index)}>
                        cache! {props.isLoading && <Spinner />}
                    </Button>
                )}
            {props.onClickUnCache &&
                props.isCached && (
                    <Button onClick={() => props.onClickUnCache(props.index)}>
                        uncache! {props.isLoading && <Spinner />}
                    </Button>
                )}
        </div>
    </div>
);
