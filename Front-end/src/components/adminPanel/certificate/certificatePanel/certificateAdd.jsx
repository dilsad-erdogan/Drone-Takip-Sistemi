import '../../../ui/panel.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateModel from '../../../../../../Back-end/connections/pilotCertificate';
const certificateModel = new CertificateModel();

const certificateAdd = () => {
  const navigate = useNavigate();
  const [certificateName, setCertificateName] = useState('');

  const submitEvent = (event) => {
    event.preventDefault();

    const newCertificate = {
      certificate_name: certificateName
    };

    certificateModel.addCertificate(newCertificate).then(() => {
      alert("Certificate ekleme işlemi başarıyla tamamlandı.");
      navigate('/admin/certificate');
    }).catch((error) => {
      alert('Ekleme işlemi sırasında bir hata oluştu:' + error.message);
    });
  }

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
        <div className='top'>
            <h2>Certificate Add Page</h2>
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

export default certificateAdd