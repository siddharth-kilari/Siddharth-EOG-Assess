import React from 'react';
import Grid from '@material-ui/core/Grid';
import Metrics from '../Features/Metrics/Metrics';
import Measurements from '../Features/Measurements/Measurements';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: '20px',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={8}>
      <Grid item xs>
        <Metrics />
      </Grid>
      <Grid item xs>
        <Measurements />
      </Grid>
    </Grid>
  );
};
