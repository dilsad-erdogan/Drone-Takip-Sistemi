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
  })

  const addCertificate = () => {
    const newCertificate = {
      pilot_id: localStorage.getItem("userId"),
      certificate_id: certificateId,
      permission_status: false,
      certificate_file: selectedFile
    };

    certificatePermissionModel.addCertificatePermission(newCertificate).then(() => {
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

      <div className='addForm'>
        <select name='cat' id='id' onChange={(e) => {setCertificateId(e.target.value)}}>
          <option>Select a certificate</option>
          {certificate && certificate.map((data) => (
            data.is_active === true ? (<option key={data.certificate_id} value={data.certificate_id}>{data.certificate_name}</option>) : (console.log())
          ))}
        </select>
        <input type='file' onChange={handleFileChange}></input>
      </div>
      
    </div>
  )
}

export default settings