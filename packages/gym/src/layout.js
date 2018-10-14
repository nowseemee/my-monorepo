import React from 'react';
import Tabs from './tabs';
import Navigation from './navigation';
import { withStyles } from '@material-ui/core';

const styles = (
  theme,
  root = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    height: '100%',
  }
) => ({
  root: root,
  tabs: {
    flex: '0',
  },
  navigation: {
    flex: '0',
  },
  content: {
    flex: '1',
    flexGrow: '1',

    overflow: 'auto',
  },
});

const Layout = ({ classes, children }) => (
  <div className={classes.root}>
    <div className={classes.tabs}>
      <Tabs />
    </div>
    <div className={classes.content}>{children}</div>
    <div className={classes.navigation}>
      <Navigation />
    </div>
  </div>
);

export default withStyles(styles)(Layout);
