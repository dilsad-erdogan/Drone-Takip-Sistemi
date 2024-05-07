import '../../../ui/panel.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CertificateModel from '../../../../../../Back-end/connections/pilotCertificate';
const certificateModel = new CertificateModel();

const certificateUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [certificateName, setCertificateName] = useState('');
  const [error, setError] = useState('');

  const submitEvent = (event) => {
    event.preventDefault();

    if(!validateInput(certificateName)) {
      return;
    }

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

  const validateInput = (value) => {
    if(!value) {
      setError('Bu alan boş olamaz.');
      return false;
    }

    setError('');
    return true;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCertificateName(value);
    validateInput(value);
  };

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
        <div className='top'>
          <h2>Pilot Certificate Update Page</h2>
        </div>

        <div className='addPanel'>
          <form action='' className='addForm' onSubmit={submitEvent}>
            <div className='inputContainer'>
              <input type='text' placeholder='Certificate Name' value={certificateName} onChange={handleChange}></input>
              {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default certificateUpdate