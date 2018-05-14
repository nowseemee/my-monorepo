import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ routes }) => (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
        {routes.map(({ path }) => (
            <li key={path} style={{ display: 'inline' }}>
                <Link style={{ marginRight: 10 }} to={path}>
                    {path}
                </Link>
            </li>
        ))}
    </ul>
);
Navigation.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({ path: PropTypes.string }))
        .isRequired,
};
export default Navigation;
