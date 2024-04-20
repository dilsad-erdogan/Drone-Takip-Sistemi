import '../../ui/panel.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import DeleteModal from '../../ui/commonUsage/modal.jsx';

import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();
import ModelModel from '../../../../../Back-end/connections/droneModel.js';
const modelModel = new ModelModel();
import TypeModel from '../../../../../Back-end/connections/droneType.js';
const typeModel = new TypeModel();
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const drone = () => {
  const navigate = useNavigate();
  const[droneData, setDroneData] = useState([]);
  const[deleteModal, setDeleteModal] = useState(false);
  const[deletedDrone, setDeletedDrone] = useState();
  const[modelNames, setModelNames] = useState({});
  const[typeNames, setTypeNames] = useState({});
  const[ownerName, setOwnerName] = useState({});
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try{
        const dronesData = await droneModel.allDrone();

        if(Array.isArray(dronesData)) {
          setDroneData(dronesData);
        } else {
          console.error('Hata: getDrones bir dizi döndürmedi.');
        }

        const modelNamePromises = dronesData.map(async (data) => {
          if (data.drone_information.model_id) {
            try {
              const modelData = await modelModel.getModelById(data.drone_information.model_id);
              return { id: data.drone_id, name: modelData }; // Model ismi ve drone id'sini bir araya getir
            } catch (error) {
              console.error('Error fetching model data:', error);
            }
          }
          return null; // Model id olmayanlar için null döndür
        });

        const resolvedModelNames = await Promise.all(modelNamePromises);
        const modelNamesObject = resolvedModelNames.reduce((acc, item) => {
          if (item) {
            acc[item.id] = item.name;
          }
          return acc;
        }, {});
        setModelNames(modelNamesObject);

        const typePromises = dronesData.map(async (data) => {
          if (data.drone_information.dronetype_id) {
            try {
              const typeData = await typeModel.getTypeById(data.drone_information.dronetype_id);
              return { id: data.drone_id, name: typeData }; // Tip adı ve drone id'sini bir araya getir
            } catch (error) {
              console.error('Error fetching type data:', error);
            }
          }
          return null; // Type id olmayanlar için null döndür
        });

        const resolvedTypes = await Promise.all(typePromises);
        const typeNamesObject = resolvedTypes.reduce((acc, item) => {
          if (item) {
            acc[item.id] = item.name;
          }
          return acc;
        }, {});
        setTypeNames(typeNamesObject);

        const ownerPromises = dronesData.map(async (data) => {
          if (data.owner_id) {
            try {
              const ownerData = await userModel.getUserByName(data.owner_id);
              return { id: data.owner_id, name: ownerData }; // Tip adı ve drone id'sini bir araya getir
            } catch (error) {
              console.error('Error fetching type data:', error);
            }
          }
          return null; // Type id olmayanlar için null döndür
        });

        const resolvedOwner = await Promise.all(ownerPromises);
        const ownerObject = resolvedOwner.reduce((acc, item) => {
          if (item) {
            acc[item.id] = item.name;
          }
          return acc;
        }, {});
        console.log(ownerObject);
        setOwnerName(ownerObject);
      } catch (error) {
        console.error('Error fetching drone data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchValue(params.get("q") || "");
  }, [location.search]);

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

  const filteredData = droneData.filter((type) =>
    type.serial_number.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='topPanel'>
      <div className='top'>
        <Search placeholder="Search for a drone serial number"></Search>
        <button className='btn btn-outline-light' onClick={() => {addNewDrone()}}>Add New Drone</button>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>Owner</td>
            <td>Serial Number</td>
            <td>Drone Type</td>
            <td>Drone Model</td>
            <td>Battery Health</td>
            <td>Airframe Name</td>
            <td>Propeller Size</td>
            <td>Material</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((drone) => (
            <tr key={drone.drone_id}>
              <td>{ownerName[drone.owner_id]}</td>
              <td>{drone.serial_number}</td>
              <td>{typeNames[drone.drone_id]}</td>
              <td>{modelNames[drone.drone_id]}</td>
              <td>{drone.drone_information.battery_health}</td>
              <td>{drone.drone_information.airframe_name}</td>
              <td>{drone.drone_information.propeller_size}</td>
              <td>{drone.drone_information.material}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={drone.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
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