import React from 'react';
import PropTypes from 'prop-types';

const Html = ({ children, assets, helmetContext }) => (
    <html lang="en">
        <head>
            {helmetContext.helmet.meta.toComponent()}
            {helmetContext.helmet.link.toComponent()}
            {helmetContext.helmet.title.toComponent()}
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
