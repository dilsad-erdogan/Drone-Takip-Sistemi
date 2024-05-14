import { useEffect, useState } from 'react';
import '../../ui/panel.css';
import CertificateModel from '../../../../../Back-end/connections/pilotCertificate';
const certificateModel = new CertificateModel();
import CertificatePermissionModel from '../../../../../Back-end/connections/certificatePermission';
const certificatePermissionModel = new CertificatePermissionModel();

const settings = () => {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchCertificateData = async () => {
      try{
        await certificateModel.fetchCertificateData();
        const data = certificateModel.getCertificate();

        if(Array.isArray(data)){
          setCertificate(data);
        } else{
          console.error('Hata getCertificate bir dizi döndürmedi.');
        }
      } catch(error) {
        console.error('Error fetching certificate data:', error.message);
        console.error('Full error:', error);
      }
    }

    fetchCertificateData();
  }, []);

  const addCertificate = () => {
    const newCertificate = {
      certificate_file: selectedFile
    };

    certificatePermissionModel.addCertificatePermission(localStorage.getItem("userId"), certificateId, selectedFile).then(() => {
      alert("Sertifika isteğiniz başarıyla yönlendirilmiştir.");
    }).catch((error) => {
      alert("İzin sırasında bir hata oluştu." + error);
    });
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className='topPanel'>
      <div className='top'>
        <div style={{fontSize: 20}}>Select your pilot certificate</div>
        <button className='btn btn-outline-light' onClick={() => {addCertificate()}}>Add Certificate</button>
      </div>

      <form className='addForm' method='post' encType='multipart/form-data'>
        <select name='cat' id='id' onChange={(e) => {setCertificateId(e.target.value)}}>
          <option>Select a certificate</option>
          {certificate && certificate.map((data) => (
            data.is_active === true ? (<option key={data.certificate_id} value={data.certificate_id}>{data.certificate_name}</option>) : (console.log())
          ))}
        </select>
        <input type='file' name='avatar' accept='.pdf' onChange={handleFileChange}></input>
      </form>
      
    </div>
  )
}

export default settings