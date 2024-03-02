import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from 'react';
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
        const data = permissionModel.getPermission();

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
  }, [])

  const approveButtonClick = (permission_id) => {
    const newPermission = {
      permission_status: true,
    };

    permissionModel.updatePermission(permission_id, newPermission).then(() => {
      alert('Uçuş onaylandı.');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  const disapproveButtonClick = (permission_id) => {
    const newPermission = {
      permission_status: false,
    };

    permissionModel.updatePermission(permission_id, newPermission).then(() => {
      alert('Uçuş reddedildi.');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  return (
    <div className="topPanel">
      <div className="top">
        <Search placeholder="Search for a permission"></Search>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>Owner Name</td>
            <td>Pilot Name</td>
            <td>Drone Serial Number</td>
            <td>Admin Name</td>
            <td>Permission Status</td>
            <td>Date and Time</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {permissions && permissions.map((flight) => (
            <tr key={flight.permission_id}>
              <td>{ownerName[flight.owner_id]}</td>
              <td>{ownerName[flight.pilot_id]}</td>
              <td>{flight.drone_id}</td>
              <td>{ownerName[flight.admin_id]}</td>
              <td>{flight.permission_status === true  ? 'true' : 'false'}</td>
              <td>{flight.date_and_time}</td>
              <td>
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" checked={flight.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className="buttons">
                  <button className="button update" onClick={() => {approveButtonClick(flight.permission_id)}}>Approve</button>

                  <button className="button delete" onClick={() => {disapproveButtonClick(flight.permission_id)}}>Disapprove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>
    </div>
  )
}

export default permission