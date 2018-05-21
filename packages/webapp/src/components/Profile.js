import React from 'react';
import { css } from 'emotion';

const Profile = ({ profile }) => (
    <img
        className={css`
            height: 104px;
        `}
        src={profile.getImageUrl()}
        alt={profile.getName()}
    />
);

export default Profile;
