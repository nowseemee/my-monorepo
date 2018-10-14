import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withRouter } from 'react-router-dom';
import { matchVideoName } from './matchers';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  textField: {
    width: 200,
  },
});

class ControlledExpansionPanels extends React.Component {
  render() {
    const { classes, match, exercises, history } = this.props;

    return (
      <div className={classes.root}>
        {exercises.map(exercise => (
          <ExpansionPanel
            key={exercise.name}
            expanded={match.params.exercise === exercise.name}
            onClick={() =>
              history.push(
                `/${match.params.session}/${match.params.section}/${
                  exercise.name
                }`
              )
            }
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant={'subtitle1'} className={classes.heading}>
                {exercise.name}
              </Typography>
              <Typography
                variant={'subtitle1'}
                className={classes.secondaryHeading}
              >
                {`${exercise.sets} x ${exercise.repetitions} ${
                  exercise.repetitionsUnit
                } @ ${exercise.resistance} ${exercise.resistanceUnit}`}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <video
                src={`https://storage.googleapis.com/workout-63a97.appspot.com/${matchVideoName(
                  match.params.session,
                  match.params.section,
                  exercise.name
                )}.m4v`}
                controls
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ControlledExpansionPanels));
