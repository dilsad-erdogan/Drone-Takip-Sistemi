import '../panel.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '1st Week',
    flight: 30,
  },
  {
    name: '2nd Week',
    flight: 14,
  },
  {
    name: '3rd Week',
    flight: 40,
  },
  {
    name: '4th Week',
    flight: 80,
  }
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