import './chart.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Monday',
    flight: 30,
  },
  {
    name: 'Tuesday',
    flight: 14,
  },
  {
    name: 'Wednesday',
    flight: 40,
  },
  {
    name: 'Thursday',
    flight: 80,
  },
  {
    name: 'Friday',
    flight: 35,
  },
  {
    name: 'Saturday',
    flight: 20,
  },
  {
    name: 'Sunday',
    flight: 100,
  },
];

const chart = () => {
  return (
    <div className='chart'>
      <h2 className='title'>My Weekly Flight</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name"></XAxis>
          <YAxis></YAxis>
          <Tooltip contentStyle={{background: "#151c2c", border: "none"}}></Tooltip>
          <Legend></Legend>
          <Line type="monotone" dataKey="flight" stroke='#8884d8' strokeDasharray="5 5"></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default chart