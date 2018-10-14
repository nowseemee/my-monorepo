import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withRouter } from 'react-router-dom';
import { connect } from './store';
import { matchSession } from './matchers';

const styles = {
  root: {
    width: '100%',
  },
};

class LabelBottomNavigation extends React.Component {
  render() {
    const { classes, session, history, match } = this.props;

    return (
      <BottomNavigation
        value={match.params.section}
        onChange={this.handleChange}
        className={classes.root}
      >
        {((session || {}).sections || []).map(section => (
          <BottomNavigationAction
            key={section.name}
            label={section.name}
            value={section.name}
            icon={<FavoriteIcon />}
            onClick={() => history.push(`/${session.name}/${section.name}`)}
          />
        ))}
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(router =>
  connect(props =>
    // console.log(props, router.match.day),
    ({
      session: matchSession(props.workoutPlan, router.match.params.session),
    })
  )(withStyles(styles)(LabelBottomNavigation))(router)
);
