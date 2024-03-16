import { useState } from 'react';
import '../../../ui/panel.css';
import BrandModel from '../../../../../../Back-end/connections/droneBrand.js';
import { useNavigate } from 'react-router-dom';
const brandModel = new BrandModel();

const brandAdd = () => {
  const[brandName, setBrandName] = useState('');
  const navigate = useNavigate();

  const submitEvent = (event) => {
    event.preventDefault();

    const newBrand = {
      brand_name: brandName
    };

    brandModel.addBrand(newBrand).then(() => {
      alert("Brand ekleme işlemi başarıyla tamamlandı.");
      navigate('/admin/drone-brand');
    }).catch((error) => {
      alert('Ekleme işlemi sırasında bir hata oluştu:' + error.message);
    });
  }

  return (
    <div className='topPanel'>
      <div className='top'>
        <h2>Drone Brand Add Page</h2>
      </div>

      <div className='addPanel'>
        <form action='' className='addForm' onSubmit={submitEvent}>
          <input type='text' placeholder='Drone Brand Name' value={brandName} onChange={(e) => {setBrandName(e.target.value)}}></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default brandAdd