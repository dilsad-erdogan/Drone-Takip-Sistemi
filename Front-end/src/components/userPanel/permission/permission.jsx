import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search';
import { TbDrone, TbDroneOff } from "react-icons/tb";
import { useState, useEffect } from 'react';
import PermissionModel from '../../../../../Back-end/connections/permission.js';
const permissionModel = new PermissionModel();
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const permission = () => {
  const[permissions, setPermissions] = useState([]);
  const[userNames, setUserNames] = useState([]);
  const[adminNames, setAdminNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        await permissionModel.fetchPermissionData();
        //const data = permissionModel.getPermissionUserById(localStorage.getItem("userId"));
        const data = permissionModel.getPermission();
        
        if(Array.isArray(data)){
          setPermissions(data);

          const users = {}, admins = {};
          for(const flight of data){
            users[flight.pilot_id] = await getUserById(flight.pilot_id);
            admins[flight.admin_id] = await getUserById(flight.admin_id);
          }
          setUserNames(users);
          setAdminNames(admins);
        } else{
          console.error('Hata getPermission bir dizi döndürmedi.');
        }
      } catch(error){
        console.error('Error fetching permission data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  async function getUserById(userId){
    if (!userId) {
      return null;
    }

    try{
      const userName = await userModel.getUserByName(userId);
      return userName;
    } catch(error){
      console.error('Hata:', error.message);
    }
  }

  return (
    <div className='topPanel'>
      <div className="top">
        <Search placeholder="Search for a permission"></Search>
      </div>
      
      <div className="permissionsCard">
        {permissions && permissions.map((flight) => (
          <div key={flight._id} className='permissionCard'>
            {flight.is_active === true ? (<TbDrone></TbDrone>) : (<TbDroneOff></TbDroneOff>)}
            <div className='texts-permission'>
              <span className='title'>Pilot Name: {userNames[flight.pilot_id]}</span>
              <span className='title'>Drone Serial Number: {flight.drone_id}</span>
              <span className='title'>Admin Name: {flight.admin_id === null ? 'NULL' : adminNames[flight.admin_id]}</span>
              <span className='title'>Permission Status: {flight.permission_status === true ? 'true' : 'false'}</span>
              <span className='title'>Date and Time: {flight.date_and_time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default permission