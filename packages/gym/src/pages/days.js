import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';
import Exercises from '../exercises';

import { withStyles } from '@material-ui/core/styles';
import { connect } from '../store';
import { withRouter } from 'react-router-dom';
import { matchSession, matchSection } from '../matchers';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    flexDirection: 'column',
  },
  exercise: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $exerciseBackdrop': {
        opacity: 0.15,
      },
      '& $exerciseMarked': {
        opacity: 0,
      },
      '& $exerciseTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  exerciseButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  exerciseSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  exerciseBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  exerciseTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`,
  },
  exerciseMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ButtonBases(props) {
  const { classes, section } = props;
  return (
    <Layout className={classes.root}>
      <Exercises exercises={(section || {}).exercises || []} />
    </Layout>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

const getProps = (props, router) => {
  const session = matchSession(props.workoutPlan, router.match.params.session);
  const section = matchSection(session.sections, router.match.params.section);
  return {
    session,
    section,
  };
};

export default withRouter(router =>
  connect(props => getProps(props, router))(withStyles(styles)(ButtonBases))(
    router
  )
);
