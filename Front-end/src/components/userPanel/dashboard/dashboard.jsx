import './dashboard.css';
import Card from './card/card';
import Transactions from './transctions/transactions';
import Chart from './chart/chart';

const dashboard = () => {
  return (
    <div className='wrapper'>
      <div className='main'>
        <div className='cards'>
          <Card></Card>
          <Card></Card>
        </div>
        <Transactions></Transactions>
        <Chart></Chart>
      </div>
    </div>
  )
}

export default dashboard