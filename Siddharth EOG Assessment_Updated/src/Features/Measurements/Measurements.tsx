import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useSubscription, useQuery } from 'urql';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import Charts from '../../components/Charts';
import ListContainer from '../../components/ListContainer';

const newMeasurement = `
subscription {
  newMeasurement {
    metric,
    at,
    value,
    unit
  }
}
`;

const getMultipleMeasurements = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      unit
    }
  }
}
`;

const getMeasurements = (state: IState) => {
  return state.measurements;
};
const getSelectedMetrics = (state: IState) => {
  return state.metrics.chosen;
};

const halfAnHourAgo = Date.now() - 30 * 60 * 1000;

export default () => {
  const dispatch = useDispatch();
  const measurements = useSelector(getMeasurements);
  const selectedMetrics = useSelector(getSelectedMetrics);
  const [isSubscriptionPaused, setIsSubscriptionPaused] = useState(false);

  const [{ fetching, data, error }] = useSubscription({ query: newMeasurement, pause: isSubscriptionPaused });
  const [multipleMeasurementsResult] = useQuery({
    query: getMultipleMeasurements,
    variables: {
      input: selectedMetrics.map(metricName => {
        return { metricName, after: halfAnHourAgo };
      }),
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.measurementReceived(data.newMeasurement));
  }, [dispatch, data, error]);

  useEffect(() => {
    const { data } = multipleMeasurementsResult;
    if (!data) return;
    dispatch(actions.multipleMeasurementsReceived(data.getMultipleMeasurements));
  }, [dispatch, multipleMeasurementsResult]);

  if (!data && fetching) return <LinearProgress />;

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
	 <Grid container direction="row" alignItems="center" spacing={2} item xs>
        {selectedMetrics.map(metric => {
          return (
            <Grid item xs={2} key={metric}>
              <ListContainer measurement={measurements[metric][measurements[metric].length - 1]} metricName={metric} />
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs>
        <Charts
          measurements={measurements}
          selectedMetrics={selectedMetrics}
        />
      </Grid>
     
    </Grid>
  );
};
