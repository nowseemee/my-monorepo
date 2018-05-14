import React from 'react';
import PropTypes from 'prop-types';

const Html = ({ children, assets }) => (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="theme-color" content="hotpink" />
            <meta
                name="google-signin-client_id"
                content="652763555524-h18hb7g4puoba49bqk12fgbui1h1lcfk.apps.googleusercontent.com"
            />

            <link rel="manifest" href="manifest.json" />
            <link rel="shortcut icon" href="Icon-192.png" />
            <link
                rel="apple-touch-icon-precomposed"
                href="Icon-196.png"
                sizes="196x196"
            />

            <title>Sound Garden</title>
        </head>
        <body>
            <div id="root">{children}</div>
            <script type="text/javascript" src={`${assets['main.js']}`} />
        </body>
    </html>
);

Html.propTypes = {
    children: PropTypes.node.isRequired,
    assets: PropTypes.object.isRequired,
};

export default Html;
