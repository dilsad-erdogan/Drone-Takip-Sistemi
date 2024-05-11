import '../../ui/panel.css';
import { useEffect, useState } from 'react';

import Card from '../../ui/commonUsage/card.jsx';
import Transactions from '../../ui/commonUsage/transactions.jsx';
import Chart from '../../ui/commonUsage/chart.jsx';

import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();
import FlightModel from '../../../../../Back-end/connections/flight.js';
const flightModel = new FlightModel();

const dashboard = () => {
  const [totalUser, setTotalUser] = useState('');
  const [totalDrone, setTotalDrone] = useState('');
  const [totalFlight, setTotalFlight] = useState('');
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await userModel.fetchTotalUser();
  
        if (result && result.success) {
          setTotalUser(result.totalUserCount);
        } else {
          console.error('Error fetching total user count:', result && result.message);
        }
      } catch (error) {
        console.error('Error fetching total user count:', error.message);
      }
    };

    const fetchDroneData = async () => {
      try{
        const result = await droneModel.fetchTotalDrone();

        if(result && result.success){
          setTotalDrone(result.totalDroneCount);
        } else{
          console.error('Error fetching total drone count:', result && result.message);
        }
      } catch(error) {
        console.error('Error fetching total drone count:', error.message);
      }
    };

    const fetchFlightData = async () => {
      try{
        const result = await flightModel.fetchTotalFlight();

        if(result && result.success){
          setTotalFlight(result.message);
        } else{
          console.error('Error fetchning total flight count:', result && result.message);
        }
      } catch(error) {
        console.error('Error fetching total flight count:', error.message);
      }
    };

    const fetchData = async () => {
      try {
        await flightModel.fetchFlightData();
        const data = flightModel.getFlights();

        if(Array.isArray(data.message)) {
          setFlights(data.message);
        }
      } catch(error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchUserData();
    fetchDroneData();
    fetchFlightData();
    fetchData();
  }, [socket]);  

  return (
    <div className='wrapper'>
      <div className='main'>
        <div className='cards'>
          <Card title="Total User" count={totalUser}></Card>
          <Card title="Total Drone" count={totalDrone}></Card>
          <Card title="Total Flight" count={totalFlight}></Card>
        </div>
        <Transactions flights={flights}></Transactions>
        <Chart></Chart>
      </div>
    </div>
  )
}

export default dashboard
