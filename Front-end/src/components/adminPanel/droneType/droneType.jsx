import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DroneTypeModel from '../../../../../Back-end/connections/droneType.js';
const droneTypeModel = new DroneTypeModel();
import DeleteModal from '../../ui/commonUsage/modal.jsx';

const droneType = () => {
  const navigate = useNavigate();
  const [droneTypeData, setDroneTypeData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedType, setDeletedType] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try{
        await droneTypeModel.fetchDroneTypeData();
        const type = droneTypeModel.getDroneTypes();

        if(Array.isArray(type)){
          setDroneTypeData(type);
        } else{
          console.error('Hata getDroneTypes bir dizi döndürmedi.');
        }
      } catch(error) {
        console.error('Error fetching drone type data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchValue(params.get("q") || "");
  }, [location.search]);

  const addNewType = () => {
    navigate('/admin/typeAdd');
  }

  const deleteButtonClick = async (typeId) => {
    setDeletedType(typeId);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const dataDeleteModal = async() => {
    try{
      await droneTypeModel.deleteDroneType(deletedType).then(() => {
        setDroneTypeData(droneTypeModel.getDroneTypes());
      }); 
    } catch (error) {
      console.log('Hata:', error.message);
    }
  }
  
  const updateButtonClick = async (typeId) => {
    navigate(`/admin/typeUpdate/${typeId}`);
  }

  const filteredDroneTypeData = droneTypeData.filter((type) =>
    type.type_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='topPanel'>
      <div className='top'>
        <Search placeholder="Search for a drone type"></Search>

        <button className='btn btn-outline-light' onClick={() => {addNewType()}}>Add New Type</button>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>Type Name</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {filteredDroneTypeData.map((type) => (
            <tr key={type.dronetype_id}>
              <td>{type.type_name}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={type.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(type.dronetype_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(type.dronetype_id)}}>Delete</button>
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

export default droneType