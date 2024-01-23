import '../../ui/panel.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import DeleteModal from '../../ui/commonUsage/modal.jsx';

import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

const drone = () => {
  const navigate = useNavigate();
  const [droneData, setDroneData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedDrone, setDeletedDrone] = useState();

  useEffect(() => {
    const fetchData = async() => {
      try{
        const dronesData = await userModel.getDroneById(localStorage.getItem('userId'));
        setDroneData(dronesData);
      } catch(error){
        console.error('Hata:', error.message);
      }
    };

    if(localStorage.getItem('userId')){
      fetchData();
    }
  }, [localStorage.getItem('userId')]);

  const addNewDrone = () => {
    navigate('user/droneAdd');
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
        setDroneData(userModel.getDroneById(localStorage.getItem('userId')));
      });
    } catch(error){
      console.error('Hata:', error.message);
    }
  }

  const updateButtonClick = (droneId) => {
    navigate(`/user/droneUpdate/${droneId}`);
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
            <td>Serial Number</td>
            <td>Drone Type</td>
            <td>Drone Model</td>
            <td>Battery Health</td>
            <td>Airframe Name</td>
            <td>Propeller Size</td>
            <td>Material</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {droneData && droneData.map((data) => (
            data.drone.is_active === true ? (
              <tr key={data.drone.drone_id}>
                <td>{data.drone.serial_number}</td>
                <td>{data.drone_info.dronetype_id}</td>
                <td>{data.drone_info.model_id}</td>
                <td>{data.drone_info.battery_health}</td>
                <td>{data.drone_info.airframe_name}</td>
                <td>{data.drone_info.propeller_size}</td>
                <td>{data.drone_info.material}</td>
                <td>
                  <div className='buttons'>
                    <button className='button update' onClick={() => {updateButtonClick(data.drone.drone_id)}}>Update</button>
                    <button className='button delete' onClick={() => {deleteButtonClick(data.drone.drone_id)}}>Delete</button>
                  </div>
                </td>
              </tr>
            ) : (console.log())
          ))}
        </tbody>
      </table>

      <Pagination></Pagination>
      <DeleteModal show={deleteModal} deleteData={dataDeleteModal} onClose={closeDeleteModal}></DeleteModal>
    </div>
  )
}

export default drone