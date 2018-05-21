import React from 'react';
import { css, keyframes } from 'emotion';

const stretchdelay = keyframes`
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
`;

const styles = {
    container: css`
        width: 20px;
        text-align: center;
        font-size: 10px;
    `,
    base: css`
        background-color: #333;
        height: 10px;
        width: 4px;
        display: inline-block;
        animation: ${stretchdelay} 1.2s infinite ease-in-out;
        margin: 0 1px 0 0;
    `,

    one: css`
        animation-delay: -1.1s;
    `,
    two: css`
        animation-delay: -1s;
    `,
    three: css`
        animation-delay: -0.9s;
    `,
};

export default (props) => (
    <span className={styles.container}>
        <div className={`${styles.base}`} />
        <div className={`${styles.base} ${styles.one}`} />
        <div className={`${styles.base} ${styles.two}`} />
        <div className={`${styles.base} ${styles.three}`} />
    </span>
);
