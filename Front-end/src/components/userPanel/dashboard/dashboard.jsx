import '../../ui/panel.css';
import { useEffect, useState } from 'react';

import Card from '../../ui/commonUsage/card.jsx';
import Transactions from '../../ui/commonUsage/transactions.jsx';
import Chart from '../../ui/commonUsage/chart.jsx';

import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

const dashboard = ({ socket }) => {
  const [totalDrone, setTotalDrone] = useState('');
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchDroneData = async () => {
      try{
        const result = await droneModel.fetchTotalUserDrone(localStorage.getItem('userId'));

        if(result && result.success){
          setTotalDrone(result.data);
        } else{
          console.error('Error fetching total drone count:', result && result.message);
        }
      } catch(error){
        console.error('Error fetching total drone count:', error.message);
      }
    };

    const fetchData = async () => {
      try{
        const flightData = await userModel.getFlightById(localStorage.getItem('userId'));
        
        if(Array.isArray(flightData)) {
          setFlights(flightData);
        } else {
          console.error('Hata: getDrones bir dizi döndürmedi.');
        }
      } catch (error) {
        console.error('Error fetching drone data:', error.message);
        console.error('Full error:', error);
      }
    };

    if(localStorage.getItem('userId')){
      fetchDroneData();
      fetchData();
    }
  }, [localStorage.getItem('userId')]);

  return (
    <div className='wrapper'>
      <div className='main'>
        <div className='cards'>
          <Card title="Total My Drone" count={totalDrone}></Card>
          <Card title="Total My Flight" count="5"></Card>
        </div>
        <Transactions flights={flights}></Transactions>
        <Chart></Chart>
      </div>
    </div>
  )
}

export default dashboard