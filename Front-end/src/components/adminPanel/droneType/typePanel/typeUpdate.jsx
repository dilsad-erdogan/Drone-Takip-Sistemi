import { useState } from 'react';
import '../../../ui/panel.css';
import { useNavigate, useParams } from 'react-router-dom';
import TypeModel from '../../../../../../Back-end/connections/droneType.js';
const typeModel = new TypeModel();

const typeUpdate = () => {
  const [typeName, setTypeName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const submitEvent = (event) => {
    event.preventDefault();

    const updatedType = {
      type_name: typeName
    };

    typeModel.updateType(id, updatedType).then(() => {
      alert('Type başarıyla güncellendi.');
      navigate('/admin/drone-type');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
        <div className='top'>
          <h2>Drone Type Update Page</h2>
        </div>

        <div className='addPanel'>
          <form action='' className='addForm' onSubmit={submitEvent}>
            <input type='text' placeholder='Drone Type Name' value={typeName} onChange={(e) => {setTypeName(e.target.value)}}></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default typeUpdate