import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ routes }) =>
    routes.map(({ path }) => (
        <h1 key={path}>
            <Link to={path}>{path}</Link>
        </h1>
    ));
Navigation.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({ path: PropTypes.string }))
        .isRequired,
};
export default Navigation;
