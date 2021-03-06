import React from 'react';
import { css } from 'emotion';

import Button from '../components/Button';
import { connect, actions } from '../store';

const styles = {
    container: (isVisible) => css`
        max-width: 568px;
        position: fixed;
        left: 50%;
        overflow: hidden;
        display: flex;
        bottom: 0px;
        z-index: 1;
        transform: translate(-50%, ${isVisible ? '0' : '48px'});
        transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms,
            visibility 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    `,
    wrapper: () => css`
        font-family: Roboto, sans-serif;
        background-color: rgba(0, 0, 0, 0.87);
        padding: 0px 24px;
        height: 48px;
        line-height: 48px;
        border-radius: 0px;
        max-width: inherit;
        min-width: inherit;
        width: calc(100vw - 48px);
        flex-grow: 1;
    `,
    body: (isVisible) => css`
        font-size: 14px;
        color: rgb(255, 255, 255);
        transition: opacity ${isVisible ? '500ms' : '400ms'}
            cubic-bezier(0.23, 1, 0.32, 1) ${isVisible ? '100ms' : '0ms'};
        opacity: ${isVisible ? '1' : '0'};
    `,
};

const SnackBar = (props) => (
    <div className={styles.container(props.isVisible)}>
        <div className={styles.wrapper()}>
            <div className={styles.body(props.isVisible)}>
                {props.body}{' '}
                {props.action && (
                    <Button onClick={props.action} isSnack>
                        {props.actionLabel}
                    </Button>
                )}
                {props.body && <Button onClick={() => actions.setToast()} isSnack>X</Button>}
            </div>
        </div>
    </div>
);

class S extends React.Component {
    state = {
        isVisible: this.props.isVisible,
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.isVisible && nextProps.isVisible) {
            this.setState({ isVisible: false });
            setTimeout(() => this.setState({ isVisible: true }), 100);
            return;
        }

        return this.setState({ isVisible: nextProps.isVisible });
    }

    render() {
        return <SnackBar {...this.props} isVisible={this.state.isVisible} />;
    }
}

export default connect(({ toast }) => ({
    ...toast,
    isVisible: !!toast.body,
}))(S);
