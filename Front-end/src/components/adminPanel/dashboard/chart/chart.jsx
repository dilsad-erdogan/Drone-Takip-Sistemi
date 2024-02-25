import './chart.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Monday',
    flight: 3000,
  },
  {
    name: 'Tuesday',
    flight: 1400,
  },
  {
    name: 'Wednesday',
    flight: 4000,
  },
  {
    name: 'Thursday',
    flight: 8000,
  },
  {
    name: 'Friday',
    flight: 3500,
  },
  {
    name: 'Saturday',
    flight: 2000,
  },
  {
    name: 'Sunday',
    flight: 10000,
  },
];

const chart = () => {
  return (
    <div className='chart'>
      <h2 className='title'>Weekly Flight</h2>
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background: "#151c2c", border: "none"}}/>
          <Legend />
          <Line type="monotone" dataKey="flight" stroke="#8884d8" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default chart