import '../../../ui/panel.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateModel from '../../../../../../Back-end/connections/pilotCertificate';
const certificateModel = new CertificateModel();

const certificateAdd = () => {
  const navigate = useNavigate();
  const [certificateName, setCertificateName] = useState('');
  const [error, setError] = useState('');

  const submitEvent = (event) => {
    event.preventDefault();

    if(!validateInput(certificateName)) {
      return;
    }

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

  const validateInput = (value) => {
    if(!value) {
      setError('Certificate Name boş olamaz.');
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
            <h2>Certificate Add Page</h2>
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

export default certificateAdd