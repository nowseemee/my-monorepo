import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

const Navigation = ({ routes }) =>
    routes.map(({ path }) => (
        <Link key={path} to={path}>
            <Button>{path}</Button>
        </Link>
    ));

Navigation.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({ path: PropTypes.string }))
        .isRequired,
};
export default Navigation;
