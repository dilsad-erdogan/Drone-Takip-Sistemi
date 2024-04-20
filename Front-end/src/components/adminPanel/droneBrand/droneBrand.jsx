import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DroneBrandModel from '../../../../../Back-end/connections/droneBrand.js';
const droneBrandModel = new DroneBrandModel();
import DeleteModal from '../../ui/commonUsage/modal.jsx';

const droneBrand = () => {
  const navigate = useNavigate();
  const[droneBrandData, setDroneBrandData] = useState([]);
  const[deleteModal, setDeleteModal] = useState(false);
  const[deletedBrand, setDeletedBrand] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try{
        await droneBrandModel.fetchDroneBrandData();
        const brand = droneBrandModel.getDroneBrands();

        if(Array.isArray(brand)) {
          setDroneBrandData(brand);
        } else{
          console.error('Hata: getDroneBrands bir dizi döndürmedi.');
        }
      } catch(error) {
        console.error('Error fetching drone brand data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchValue(params.get("q") || "");
  }, [location.search]);

  const addNewBrand = () => {
    navigate('/admin/brandAdd');
  }

  const deleteButtonClick = async (brandId) => {
    setDeletedBrand(brandId);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const dataDeleteModal = async() => {
    try{
      await droneBrandModel.deleteDroneBrand(deletedBrand).then(() => {
        setDroneBrandData(droneBrandModel.getDroneBrands());
      });
    } catch (error){
      console.log('Hata:', error.message);
    }
  } 
  
  const updateButtonClick = async (brandId) => {
    navigate(`/admin/brandUpdate/${brandId}`);
  }// burada brandId değerinin update linkinde nasıl alınacağına bakmalıyım

  const filteredData = droneBrandData.filter((type) =>
    type.brand_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='topPanel'>
      <div className='top'>
        <Search placeholder="Search for a drone brand"></Search>

        <button className='btn btn-outline-light' onClick={() => {addNewBrand()}}>Add New Brand</button>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>Brand Name</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((brand) => (
            <tr key={brand.brand_id}>
              <td>{brand.brand_name}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={brand.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(brand.brand_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(brand.brand_id)}}>Delete</button>
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

export default droneBrand