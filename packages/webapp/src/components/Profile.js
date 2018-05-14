import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ profile }) => (
    <img
        src={profile.getImageUrl()}
        style={{ height: '90px' }}
        alt={profile.getName()}
    />
);

Profile.propTypes = {
    profile: PropTypes.shape({
        getId: PropTypes.func.isRequired,
        getName: PropTypes.func.isRequired,
        getGivenName: PropTypes.func.isRequired,
        getFamilyName: PropTypes.func.isRequired,
        getImageUrl: PropTypes.func.isRequired,
        getEmail: PropTypes.func.isRequired,
    }).isRequired,
};
export default Profile;
