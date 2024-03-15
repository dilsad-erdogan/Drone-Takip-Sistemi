import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from 'react';
import PermissionModel from '../../../../../Back-end/connections/permission.js';
const permissionModel = new PermissionModel();
import FlightModel from '../../../../../Back-end/connections/flight.js';
const flightModel = new FlightModel();
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const permission = () => {
  const [permissions, setPermissions] = useState([]);
  const [userNames, setUserNames] = useState({});

  const fetchData = async () => {
    try {
      await permissionModel.fetchPermissionData();
      const data = permissionModel.getPermission();

      if (Array.isArray(data)) {
        setPermissions(data);

        // Kullanıcı isimlerini önceden yükleme
        const users = {};
        for (const flight of data) {
          users[flight.owner_id] = await getUserById(flight.owner_id);
        }
        setUserNames(users);
      } else {
        console.error('Hata getPermission bir dizi döndürmedi.');
      }
    } catch (error) {
      console.error('Error fetching permission data:', error.message);
      console.error('Full error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveButtonClick = (permission) => {
    const newPermission = {
      admin_id: localStorage.getItem("userId"),
      permission_status: true,
    };

    permissionModel.updatePermission(permission._id, newPermission).then(() => {
      alert('Uçuş onaylandı.');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });

    //flight eklenecek uçuş onaylanırsa
    const newFlight = {
      user_id: permission.owner_id,
      pilot_id: permission.pilot_id,
      drone_id: permission.drone_id,
      startPoint: permission.startPoint,
      endPoint: permission.endPoint,
      coordinates: {
        type: "Point",
        coordinates: [permission.startPoint, permission.endPoint]
      }
    }

    console.log(newFlight);

    flightModel.addFlight(newFlight).then(() => {
      alert("Uçuş başarıyla onaylandı.");
      fetchData();
    }).catch((error) => {
      alert("Uçuş onaylanırken bir hata gerçekleşti:" + error.message);
    });
  };

  const disapproveButtonClick = (permission_id) => {
    const newPermission = {
      admin_id: localStorage.getItem("userId"),
      permission_status: false,
    };

    permissionModel.updatePermission(permission_id, newPermission).then(() => {
      alert('Uçuş reddedildi.');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  async function getUserById(userId){
    try{
      const userName = await userModel.getUserByName(userId);
      return userName;
    } catch(error){
      console.error('Hata:', error.message);
      return userId;
    }
  }

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
          {permissions.map((flight) => (
            <tr key={flight._id}>
              <td>{userNames[flight.owner_id]}</td>
              <td>{userNames[flight.pilot_id]}</td>
              <td>{flight.drone_id}</td>
              <td>{userNames[flight.admin_id]}</td>
              <td>{flight.permission_status === true ? 'true' : 'false'}</td>
              <td>{flight.date_and_time}</td>
              <td>
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" checked={flight.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                {flight.is_active ? 
                (
                  <div className="buttons">
                    <button className="button update" onClick={() => { approveButtonClick(flight) }}>Approve</button>
                    <button className="button delete" onClick={() => { disapproveButtonClick(flight._id) }}>Disapprove</button>
                  </div>
                )
                :
                (
                  <div className='buttons'>
                    <button className='button off'>Approve</button>
                    <button className='button off'>Disapprove</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>
    </div>
  )
}

export default permission;
