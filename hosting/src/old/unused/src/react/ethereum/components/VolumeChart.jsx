import React from 'react';
import { Card } from '@salesforce/design-system-react';
import { 
  BarChart, 
  Bar, 
  ComposedChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const VolumeChart = (props) => {
  const data = [
    {
      name: 'Placeholder A',
      volume24hr: 4000,
      volume6hr: 2400,
    },
    {
      name: 'Placeholder B',
      volume24hr: 3000,
      volume6hr: 1398,
    },
    {
      name: 'Placeholder C',
      volume24hr: 2000,
      volume6hr: 9800,
    },
    {
      name: 'Placeholder D',
      volume24hr: 2780,
      volume6hr: 3908,
    },
    {
      name: 'Placeholder E',
      volume24hr: 1890,
      volume6hr: 4800,
    },
    {
      name: 'Placeholder F',
      volume24hr: 2390,
      volume6hr: 3800,
    },
    {
      name: 'Placeholder G',
      volume24hr: 3490,
      volume6hr: 4300,
    },
  ];

  
  return (
    <Card hasNoHeader className="slds-size_1-of-2" style={{ minWidth: '100%'}}>
      <ComposedChart
        layout="vertical"
        key={'data_' + props.pairs.length}
        width={750}
        height={400}
        data={props.pairs.length > 0 ? props.pairs : data}
        margin={{
          top: 5,
          right: 30,
          left: 170,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number"  />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="volume24hr" fill="#8884d8" />
        <Bar dataKey="volume6hr" fill="#82ca9d" />
      </ComposedChart>
    </Card>
  );
}

export default VolumeChart;