import '../../ui/panel.css';
import { useNavigate } from 'react-router-dom';
import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import DroneModelModel from '../../../../../Back-end/connections/droneModel.js';
const droneModelModel = new DroneModelModel();
import DroneBrandModel from '../../../../../Back-end/connections/droneBrand.js';
const droneBrandModel = new DroneBrandModel();
import DeleteModal from '../../ui/commonUsage/modal.jsx';
import { useEffect, useState } from 'react';

const droneModel = () => {
  const navigate = useNavigate();
  const [droneModelData, setDroneModelData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedModel, setDeletedModel] = useState([]);
  const [brandNames, setBrandNames]= useState('');

  useEffect(() => {
    const fetchData = async () => {
      try{
        await droneModelModel.fetchDroneModelData();
        const model = droneModelModel.getDroneModel();

        if(Array.isArray(model)){
          setDroneModelData(model);

          const brands = {};
          for(const brand of model){
            brands[brand.brand_id] = await getBrandById(brand.brand_id);
          }
          setBrandNames(brands);

        } else{
          console.error('Hata getDroneModel bir dizi döndürmedi.');
        }
      } catch(error){
        console.error('Error fetching model data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, [])

  async function getBrandById(brandId){
    try{
      const brandName = await droneBrandModel.getBrandById(brandId);
      return brandName;
    } catch(error){
      console.error('Hata:', error.message);
      return brandId;
    }
  }

  const addNewModel = () => {
    navigate('/admin/modelAdd');
  }

  const deleteButtonClick = async (modelId) => {
    setDeletedModel(modelId);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const dataDeleteModal = async() => {
    try{
      await droneModelModel.deleteDroneModel(deletedModel).then(() => {
        setDroneModelData(droneModelModel.getDroneModel());
      });
    } catch(error) {
      console.log('Hata:', error.message);
    }
  }

  const updateButtonClick = async (modelId) => {
    navigate(`/admin/modelUpdate/${modelId}`);
  }

  return (
    <div className='topPanel'>
      <div className='top'>
        <Search placeholder="Search for a drone model"></Search>

        <button className='btn btn-outline-light' onClick={() => {addNewModel()}}>Add New Model</button>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>Brand Name</td>
            <td>Model Name</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {droneModelData && droneModelData.map((model) => (
            <tr key={model.model_id}>
              <td>{brandNames[model.brand_id]}</td>
              <td>{model.model_name}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={model.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(model.model_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(model.model_id)}}>Delete</button>
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

export default droneModel