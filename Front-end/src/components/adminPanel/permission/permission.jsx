import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from 'react';
import PermissionModel from '../../../../../Back-end/connections/permission.js';
const permissionModel = new PermissionModel();

const permission = () => {
  const[permissions, setPermissions] = useState([]);

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
      } catch(error){
        console.error('Error fetching permission data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, [])

  const approveButtonClick = (permission_id) => {
    console.log("Onayla");
    permissions.forEach(flight => {
      if(flight.permission_id === permission_id){
        flight.permission_status = true;
        flight.is_active = false;
        console.log("Burada admin ataması ve izin verilen tarihin de atanması gerçekleşecek.");
      }
    });
  };

  const disapproveButtonClick = (permission_id) => {
    console.log("Onaylama");
    permissions.forEach(flight => {
      if(flight.permission_id === permission_id){
        flight.permission_status = false;
        flight.is_active = false;
        console.log("Burada admin ataması ve izin verilmeyen tarihin de ataması gerçekleşecek.");
      }
    })
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
            <td>Permission Date</td>
            <td>Date and Time</td>
            <td>Drone Coordinate</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {permissions && permissions.map((flight) => (
            <tr key={flight.permission_id}>
              <td>{flight.owner_id}</td>
              <td>{flight.pilot_id}</td>
              <td>{flight.drone_id}</td>
              <td>{flight.admin_id}</td>
              <td>{flight.permission_status}</td>
              <td>{flight.permission_date}</td>
              <td>{flight.date_and_time}</td>
              <td>{flight.coordinate}</td>
              <td>{flight.is_active}</td>
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