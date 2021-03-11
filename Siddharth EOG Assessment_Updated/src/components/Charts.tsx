import React, { useRef, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dygraph from 'dygraphs';
import { makeStyles } from '@material-ui/core/styles';
import { MeasurementData } from '../Features/Measurements/reducer';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    minWidth: '1100px',
    width: '1100px',
  },
}));

type ChartProps = {
  measurements: { [metricName: string]: Array<MeasurementData> };
  selectedMetrics: Array<string>;
};

const getData = (measurements: { [metricName: string]: Array<MeasurementData> }, metrics: Array<string>) => {
  const activeData = Object.keys(measurements)
    .filter(metricName => metrics.includes(metricName))
    .sort();

  const updatedData: any[] = [];
  activeData.forEach((metric, id) => {
    let source = measurements[metric];

    source.forEach((graphPoint, idx) => {
      if (id === 0) {
        updatedData.push([new Date(graphPoint.at), graphPoint.value]);
      } else {
        if (idx < updatedData.length) {
          updatedData[idx].push(graphPoint.value);
        }
      }
    });
  });

  return updatedData;
};

export default ({ measurements, selectedMetrics }: ChartProps) => {
  const classes = useStyles();
  const [graph, setGraph] = useState<any>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const displayGraph = () => {
      if (null !== graphRef.current) {
        const data = getData(measurements, selectedMetrics);

        if (null === graph) {
          // create
          if (data.length > 0) {
            const g = new Dygraph(graphRef.current, data, {
              labels: ['Date', ...selectedMetrics],
            });
            setGraph(g);
          }
        } else {
          //update
          graph.updateOptions({
            file: data,
            labels: ['Date', ...selectedMetrics],
          });
          setGraph(graph);
        }
      }
    };
    if (graphRef.current) {
      displayGraph();
    }
  }, [graphRef, measurements, selectedMetrics, graph]);

  if (selectedMetrics.length === 0 && graph) {
    graph.destroy();
    setGraph(null);
  }
  return (
    <div>
      {selectedMetrics.length === 0 ? (
        <LinearProgress />
      ) : (
        <>
           <div className={classes.graphContainer} ref={graphRef} />
        </>
      )}
    </div>
  );
};
