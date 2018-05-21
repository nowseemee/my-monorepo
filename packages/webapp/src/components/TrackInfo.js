import React from 'react';
import { css } from 'emotion';
import { connect } from '../store';
import { getPlaying } from '../store/utils';

export const TrackInfo = (props) => (
    <div
        className={css`
            height: ${props.height}px;
        `}
    >
        <span
            className={css`
                position: absolute;
                color: white;
                padding: 14px 8px;
                background: black;
                width: 100%;
                background: linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.65) 0%,
                    rgba(0, 0, 0, 0) 100%
                );
            `}
        >
            {props.title}
        </span>

        <img
            className={css`
                height: ${props.height}px;
            `}
            src={props.thumbnail}
            alt={props.title}
        />
    </div>
);

export default connect(getPlaying)(TrackInfo);
