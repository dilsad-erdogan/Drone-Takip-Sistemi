import '../../ui/panel.css';
import { useEffect, useState } from 'react';

import Card from '../../ui/commonUsage/card.jsx';
import Transactions from '../../ui/commonUsage/transactions.jsx';
import Chart from '../../ui/commonUsage/chart.jsx';

import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

const dashboard = () => {
  const [totalUser, setTotalUser] = useState('');
  const [totalDrone, setTotalDrone] = useState('');

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
  
    fetchUserData();
    fetchDroneData();
  }, []);  

  return (
    <div className='wrapper'>
      <div className='main'>
        <div className='cards'>
          <Card title="Total User" count={totalUser}></Card>
          <Card title="Total Drone" count={totalDrone}></Card>
          <Card title="Total Flight" count="15"></Card>
        </div>
        <Transactions></Transactions>
        <Chart></Chart>
      </div>
    </div>
  )
}

export default dashboard
