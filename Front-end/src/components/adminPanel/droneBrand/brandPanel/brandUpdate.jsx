import { useState } from 'react';
import '../../../ui/panel.css';
import BrandModel from '../../../../../../Back-end/connections/droneBrand';
import { useNavigate, useParams } from 'react-router-dom';
const brandModel = new BrandModel();

const brandUpdate = () => {
  const [brandName, setBrandName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const submitEvent = (event) => {
    event.preventDefault();

    const updatedBrand = {
      brand_name: brandName
    };

    brandModel.updateDrone(id, updatedBrand).then(() => {
      alert('Brand başarıyla güncellendi.');
      navigate('/admin/drone-brand');
    }).catch((error) => {
      console.error('Hata:', error.message);
    }); //id değerinin buraya link veya başka şekilde gelmesi lazım ki tıklanan değer değişsin.
  };

  return (
    <div className='topPanel'>
      <div className='top'>
        <h2>Drone Brand Update Page</h2>
      </div>

      <div className='addPanel'>
        <form action='' className='addForm' onSubmit={submitEvent}>
          <input type='text' placeholder='Brand Name' value={brandName} onChange={(e) => {setBrandName(e.target.value)}}></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default brandUpdate