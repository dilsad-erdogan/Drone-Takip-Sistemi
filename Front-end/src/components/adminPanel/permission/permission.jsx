import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from 'react';
import PermissionModel from '../../../../../Back-end/connections/permission.js';
const permissionModel = new PermissionModel();

const permission = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await permissionModel.fetchPermissionData();
        const data = permissionModel.getPermission();

        if (Array.isArray(data)) {
          setPermissions(data);
        } else {
          console.error('Hata getPermission bir dizi döndürmedi.');
        }
      } catch (error) {
        console.error('Error fetching permission data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  const approveButtonClick = (permission_id) => {
    const newPermission = {
      admin_id: localStorage.getItem("userId"),
      permission_status: true,
    };

    permissionModel.updatePermission(permission_id, newPermission).then(() => {
      alert('Uçuş onaylandı.');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });

    //flight eklenecek uçuş onaylanırsa
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
            <tr key={flight._id}>
              <td>{flight.owner_id}</td>
              <td>{flight.pilot_id}</td>
              <td>{flight.drone_id}</td>
              <td>{flight.admin_id}</td>
              <td>{flight.permission_status === true ? 'true' : 'false'}</td>
              <td>{flight.date_and_time}</td>
              <td>
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" checked={flight.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className="buttons">
                  <button className="button update" onClick={() => { approveButtonClick(flight._id) }}>Approve</button>
                  <button className="button delete" onClick={() => { disapproveButtonClick(flight._id) }}>Disapprove</button>
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

export default permission;