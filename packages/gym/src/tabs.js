import React from 'react';
import { withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from './store';

const ScrollableTabsButtonAuto = props => (
  <AppBar position="static" color="default">
    <Tabs
      value={props.workoutPlan.findIndex(
        ({ name }) => name === props.match.params.session
      )}
      indicatorColor="primary"
      textColor="primary"
      scrollable
      scrollButtons="auto"
    >
      {props.workoutPlan.map(day => (
        <Tab
          label={day.name}
          key={day.name}
          onClick={() => props.history.push(`/${day.name}/warmUp`)}
        />
      ))}
    </Tabs>
  </AppBar>
);

export default withRouter(
  connect(({ workoutPlan }) => ({ workoutPlan }))(ScrollableTabsButtonAuto)
);
