import React from 'react';
import Helmet from 'react-helmet-async';

import { connect } from '../store';
import { getPlaying } from '../store/utils';

export default connect(getPlaying)((track) => (
    <Helmet>
        <meta charSet="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta
            name="google-signin-client_id"
            content="652763555524-h18hb7g4puoba49bqk12fgbui1h1lcfk.apps.googleusercontent.com"
        />
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="Icon-192.png" />
        <link href="Icon-196.png" rel="apple-touch-icon-precomposed" sizes="196x196" />

        <title>{`${
            track.title ? `${track.title} - TheSoundGarden` : `TheSoundGarden`
        }`}</title>
    </Helmet>
));
