import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

const xTicks = 10;

interface BChartProps {
  graphData: { x: number; y: number }[];
}

const BChart = (props: BChartProps): JSX.Element => (
  <VictoryChart theme={VictoryTheme.material} width={800} height={200}>
    <VictoryAxis
      label="Chance of failure"
      tickValues={Array(xTicks + 1)
        .fill(0)
        .map((_v, i) => i / xTicks)}
      style={{
        tickLabels: { fontSize: '8px', padding: 1 },
        axisLabel: { padding: 15 },
      }}
    ></VictoryAxis>
    <VictoryAxis
      label="Probability of this scenario"
      dependentAxis
      style={{
        tickLabels: { fontSize: '8px', padding: 1 },
        axisLabel: { padding: 30 },
      }}
    ></VictoryAxis>
    <VictoryBar data={props.graphData}></VictoryBar>
  </VictoryChart>
);

export default BChart;
