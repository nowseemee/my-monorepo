import React from 'react';
import { css } from 'emotion';

const styles = {
    container: () => css`
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
        display: inline-block;
        min-width: 33px;
        &:active {
            box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px,
                rgba(0, 0, 0, 0.23) 0px 3px 10px;
        }
    `,
    button: (isSnack) => css`
        ${isSnack
            ? `
                background-color: transparent;
                color: rgb(255, 64, 129);
              `
            : `
                color: rgba(0, 0, 0, 0.87);
                background-color: rgb(255, 255, 255);
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px,
                    rgba(0, 0, 0, 0.12) 0px 1px 4px;
                border-radius: 2px;
            `};

        border: 10px;
        box-sizing: border-box;
        display: inline-block;
        cursor: pointer;
        text-decoration: none;
        margin: 0px;
        padding: 0px;
        outline: none;
        font-size: inherit;
        font-weight: inherit;
        position: relative;
        height: 36px;
        line-height: 36px;
        width: 100%;
        border-radius: 2px;
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
        text-align: center;
    `,
    span: () =>
        css`
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `,

    div: () =>
        css`
            height: 36px;
            border-radius: 2px;
            transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
            top: 0px;

            &:hover {
                background-color: rgba(0, 0, 0, 0.08);
            }
        `,
    body: () => css`
        position: relative;
        opacity: 1;
        font-size: 14px;
        letter-spacing: 0px;
        text-transform: uppercase;
        font-weight: 500;
        margin: 0px;
        user-select: none;
        padding-left: 16px;
        padding-right: 16px;
    `,
};

export default ({ isVisible, children, isSnack, onClick }) => (
    <div className={styles.container()}>
        <button
            tabIndex="0"
            type="button"
            className={styles.button(isSnack)}
            onClick={onClick}
        >
            <div>
                <span className={styles.span()} />
                <div className={styles.div()}>
                    <span className={styles.body()}>{children}</span>
                </div>
            </div>
        </button>
    </div>
);
