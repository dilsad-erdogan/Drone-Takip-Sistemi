import '../../ui/panel.css';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import { useEffect, useState } from "react";
import DeleteModal from '../../ui/commonUsage/modal.jsx';
import CertificatePermissionModel from '../../../../../Back-end/connections/certificatePermission.js';
const certificatePermissionModel = new CertificatePermissionModel();
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import PilotCertificate from '../../../../../Back-end/connections/pilotCertificate.js';
const pilotCertificate = new PilotCertificate();

const certificatePermission = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedCertificate, setDeletedCertificate] = useState();
  const [certificateData, setCertificateData] = useState([]);
  const [pilotNames, setPilotNames] = useState({});
  const [certidifateName, setCertificateName] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      await certificatePermissionModel.fetchCertificatePermissionData();
      const certificates = certificatePermissionModel.getCertificatePermission();

      if(Array.isArray(certificates)) {
        setCertificateData(certificates);

        const pilots = {}, certificate = {};
        for(const pilot of certificates){
          pilots[pilot.pilot_id] = await getUserById(pilot.pilot_id);
          certificate[pilot.certificate_id] = await getCertificateById(pilot.certificate_id)
        }
        setPilotNames(pilots);
        setCertificateName(certificate);
      } else{
        console.error('Hata: getCertificate dizi döndürmedi.');
      }
    } catch(error){
      console.error('Error:', error);
    }
  };

  async function getUserById(userId){
    if (!userId) {
      return null;
    }

    try{
      const userName = await userModel.getUserByName(userId);
      return userName;
    } catch(error){
      console.error('Hata:', error.message);
      return userId;
    }
  }

  async function getCertificateById(id){
    if(!id){
      return null;
    }

    try{
      const certificate = await pilotCertificate.getCertificateById(id);
      return certificate;
    } catch(error){
      console.error('Hata:', error.message);
      return id;
    }
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
      await certificatePermissionModel.deleteCertificatePermission(deletedCertificate).then(() => {
        setCertificateData(certificatePermissionModel.getCertificatePermission());
      });
    } catch (error){
      console.error('Hata:', error.message);
    }
  }

  const approveButtonClick = (certificatePermission) => {
    const newCertificate = {
      pilot_id: certificatePermission.pilot_id,
      certificate_id: certificatePermission.certificate_id,
      permission_status: true,
    };

    certificatePermissionModel.updateCertificatePermission(certificatePermission.certificate_id, newCertificate).then(() => {
      alert('Certificate ataması onaylandı.');
      fetchData();
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  const disapproveButtonClick = (certificatePermission) => {
    const newCertificate = {
      pilot_id: certificatePermission.pilot_id,
      certificate_id: certificatePermission.certificate_id,
      permission_status: false,
    };

    certificatePermissionModel.updateCertificatePermission(certificatePermission.certificate_id, newCertificate).then(() => {
      alert('Certificate ataması reddedildi.');
      fetchData();
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };
  
  return (
    <div className='topPanel'>

      <table className="dataTable">
        <thead>
          <tr>
            <td>Pilot Name</td>
            <td>Certificate Name</td>
            <td>Permission Status</td>
            <td>Certificate File</td>
            <td>Date and Time</td>
            <td>Active</td>
            <td>Action</td>
            <td>Transaction</td>
          </tr>
        </thead>

        <tbody>
          {certificateData && certificateData.map((certificate) => (
            <tr key={certificate.permission_id}>
              <td>{pilotNames[certificate.pilot_id]}</td>
              <td>{certidifateName[certificate.certificate_id]}</td>
              <td>{certificate.permission_status === true ? 'true' : 'false'}</td>
              <td>{certificate.certificate_file}</td>
              <td>{certificate.date_and_time}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={certificate.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                {certificate.is_active ? 
                (
                  <div className="buttons">
                    <button className="button update" onClick={() => { approveButtonClick(certificate) }}>Approve</button>
                    <button className="button delete" onClick={() => { disapproveButtonClick(certificate) }}>Disapprove</button>
                  </div>
                )
                :
                (
                  <div className='buttons'>
                    <button className='button off'>Approve</button>
                    <button className='button off'>Disapprove</button>
                  </div>
                )}
              </td>
              <td>
                <div className='buttons'>
                  <button className='button delete' onClick={() => {deleteButtonClick(certificate.permission_id)}}>Delete</button>
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

export default certificatePermission
