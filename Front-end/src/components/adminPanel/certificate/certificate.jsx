import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../ui/commonUsage/modal.jsx';
import CertificateModel from '../../../../../Back-end/connections/pilotCertificate.js';
const certificateModel = new CertificateModel();

const certificate = () => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedCertificate, setDeletedCertificate] = useState();
  const [certificateData, setCertificateData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        await certificateModel.fetchCertificateData();
        const certificates = certificateModel.getCertificate();
  
        if(Array.isArray(certificates)) {
          setCertificateData(certificates);
        } else{
          console.error('Hata: getCertificate dizi döndürmedi.');
        }
      } catch(error){
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchValue(params.get("q") || "");
  }, [location.search]);

  const addNewCertificate = () => {
    navigate('/admin/certificateAdd');
  }

  const updateButtonClick = async (certificateId) => {
    navigate(`/admin/certificateUpdate/${certificateId}`);
  }

  const deleteButtonClick = async (certificateId) => {
    setDeletedCertificate(certificateId);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const dataDeleteModal = async () => {
    try{
      await certificateModel.deleteCertificate(deletedCertificate).then(() => {
        setCertificateData(certificateModel.getCertificate());
      });
    } catch (error){
      console.error('Hata:', error.message);
    }
  }

  const filteredData = certificateData.filter((type) =>
    type.certificate_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='topPanel'>
      <div className="top">
        <Search placeholder="Search for a pilot"></Search>
        <button className="btn btn-outline-light" onClick={() => {addNewCertificate()}}>Add New Certificate</button>
      </div>

      <table className="dataTable">
        <thead>
          <tr>
            <td>Certificate Name</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((certificate) => (
            <tr key={certificate.certificate_id}>
              <td>{certificate.certificate_name}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={certificate.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(certificate.certificate_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(certificate.certificate_id)}}>Delete</button>
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

export default certificate