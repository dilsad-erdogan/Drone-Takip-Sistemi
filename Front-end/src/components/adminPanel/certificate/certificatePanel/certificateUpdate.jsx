import '../../../ui/panel.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CertificateModel from '../../../../../../Back-end/connections/pilotCertificate';
const certificateModel = new CertificateModel();

const certificateUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [certificateName, setCertificateName] = useState('');

  const submitEvent = (event) => {
    event.preventDefault();

    const updatedCertificate = {
      certificate_name: certificateName
    };

    certificateModel.updateCertificate(id, updatedCertificate).then(() => {
      alert('Certificate başarıyla güncellendi.');
      navigate('/admin/certificate');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  return (
    <div className='addUpdatePage'>
      <div className='topPanel'>
        <div className='top'>
          <h2>Pilot Certificate Update Page</h2>
        </div>

        <div className='addPanel'>
          <form action='' className='addForm' onSubmit={submitEvent}>
            <input type='text' placeholder='Certificate Name' value={certificateName} onChange={(e) => {setCertificateName(e.target.value)}}></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default certificateUpdate