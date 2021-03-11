import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import { MeasurementData } from '../Features/Measurements/reducer';

type MetricsProps = {
  measurement: MeasurementData;
  metricName: string;
};

export default ({ measurement, metricName }: MetricsProps) => {
  return (
    <Grid columns="equal" divided>
        <Grid.Column key={measurement.value} style={{ margin: '20px' }}>
          <Segment>
            {metricName} <h2>{measurement.value}</h2><p>{measurement.unit}</p>
          </Segment>
        </Grid.Column>
    </Grid>
  );
};
