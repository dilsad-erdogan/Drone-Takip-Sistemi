import '../../ui/panel.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import DeleteModal from '../../ui/commonUsage/modal.jsx';

import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

const drone = () => {
  const navigate = useNavigate();
  const[droneData, setDroneData] = useState([]);
  const[deleteModal, setDeleteModal] = useState(false);
  const[deletedDrone, setDeletedDrone] = useState();

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

  const addNewDrone = () => {
    navigate('/admin/droneAdd');
  }

  const deleteButtonClick = (droneId) => {
    setDeletedDrone(droneId);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const dataDeleteModal = async() => {
    try{
      await droneModel.deleteDrone(deletedDrone).then(() => {
        setDroneData(droneModel.getDrones());
      });
    } catch(error){
      console.error('Hata:', error.message);
    }
  }
  
  const updateButtonClick = (droneId) => {
    navigate(`/admin/droneUpdate/${droneId}`);
  }

  return (
    <div className='topPanel'>
      <div className='top'>
        <Search placeholder="Search for a drone"></Search>
        <button className='btn btn-outline-light' onClick={() => {addNewDrone()}}>Add New Drone</button>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>Owner</td>
            <td>Serial Number</td>
            <td>Latitude</td>
            <td>Longitude</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {droneData && droneData.map((drone) => (
            <tr key={drone.drone_id}>
              <td>{drone.owner_id}</td>
              <td>{drone.serial_number}</td>
              <td>{drone.latitude}</td>
              <td>{drone.longitude}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={drone.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(drone.drone_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(drone.drone_id)}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>
      <DeleteModal show={deleteModal} deleteData={dataDeleteModal} onClose={closeDeleteModal}></DeleteModal>
    </div>
  )
}

export default drone