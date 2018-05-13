import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ profile }) => (
    <div>
        <img src={profile.getImageUrl()} alt={profile.getName()} />
        <h1>{profile.getName()}</h1>
        <h2>{profile.getEmail()}</h2>
    </div>
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
