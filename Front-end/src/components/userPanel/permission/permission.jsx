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
  const[ownerName, setOwnerName] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try{
        await permissionModel.fetchPermissionData();
        const data = permissionModel.getPermissionUserById(localStorage.getItem("userId"));

        if(Array.isArray(data)){
          setPermissions(data);
        } else{
          console.error('Hata getPermission bir dizi döndürmedi.');
        }

        const ownerPromises = permissions.map(async (data) => {
          if(data.owner_id){
            try{
              const ownerData = await userModel.getUserByName(data.owner_id);
              return { id: data.owner_id, name: ownerData };
            } catch(error){
              console.error('Error fetching user data:', error);
            }
          }
          return null;
        });

        const resolvedOwner = await Promise.all(ownerPromises);
        const ownerObject = resolvedOwner.reduce((acc, item) => {
          if(item) {
            acc[item.id] = item.name;
          }
          return acc;
        }, {});
        console.log(ownerObject);
        setOwnerName(ownerObject);
      } catch(error){
        console.error('Error fetching permission data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='topPanel'>
      <div className="top">
        <Search placeholder="Search for a permission"></Search>
      </div>
      
      <div className="permissionsCard">
        {permissions && permissions.map((flight) => (
          <div key={flight.permission_id} className='permissionCard'>
            {flight.is_active === true ? (<TbDrone></TbDrone>) : (<TbDroneOff></TbDroneOff>)}
            <div className='texts-permission'>
              <span className='title'>Pilot Name: {ownerName[flight.pilot_id]}</span>
              <span className='title'>Drone Serial Number: {flight.drone_id}</span>
              <span className='title'>Admin Name: {flight.admin_id === null ? 'NULL' : ownerName[flight.admin_id]}</span>
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