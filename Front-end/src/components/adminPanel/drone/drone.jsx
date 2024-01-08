import './drone.css';
import { useEffect, useState } from "react";
import Search from '../user-drone/search/search.jsx';
import Pagination from '../user-drone/pagination/pagination.jsx';
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

const drone = () => {
  const[droneData, setDroneData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        await droneModel.fetchDroneData();
        const drone = droneModel.getDrones();

        if(Array.isArray(drone)) {
          setDroneData(drone);
        } else {
          console.error('Hata: getDrones bir dizi döndürmedi.');
        }
      } catch (error) {
        console.error('Error fetching drone data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='drone'>
      <div className='top'>
        <Search placeholder="Search for a drone"></Search>

        <button className='btn btn-outline-light'>Add New Drone</button>
      </div>

      <table className='droneTable'>
        <thead>
          <tr>
            {/* <td>Id</td>
            <td>Info Id</td> */}
            <td>Owner</td>
            <td>Serial Number</td>
            <td>Latitude</td>
            <td>Longitude</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {droneData && droneData.map((drone) => (
            <tr key={drone.drone_id}>
              {/* <td>{drone.drone_id}</td>
              <td>{drone.droneinfo_id}</td> */}
              <td>{drone.owner_id}</td>
              <td>{drone.serial_number}</td>
              <td>{drone.latitude}</td>
              <td>{drone.longitude}</td>
              <td>
                <div className='buttons'>
                  <button className='button update'>Update</button>

                  <button className='button delete'>Delete</button>
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

export default drone