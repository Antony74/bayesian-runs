import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { BayesHook } from './useBayes';

const xTicks = 10;

const BChart = ({ hook }: { hook: BayesHook }): JSX.Element => (
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
    <VictoryBar
      data={hook.graphData}
      style={{
        data: {
          stroke: (datum) => {
            return hook.graphData[datum.index].stroke;
          },
          fill: (datum) => {
            return hook.graphData[datum.index].fill;
          },
          strokeWidth: 1,
        },
      }}
    ></VictoryBar>
  </VictoryChart>
);

export default BChart;
