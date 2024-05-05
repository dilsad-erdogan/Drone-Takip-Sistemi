import '../../../ui/panel.css';
import TypeModel from '../../../../../../Back-end/connections/droneType.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const typeModel = new TypeModel();

const typeAdd = () => {
  const[typeName, setTypeName] = useState('');
  const navigate = useNavigate();

  const submitEvent = (event) => {
    event.preventDefault();

    const newType = {
      type_name: typeName
    };

    typeModel.addType(newType).then(() => {
      alert("Type ekleme işlemi başarıyla tamamlandı.");
      navigate('/admin/drone-type');
    }).catch((error) => {
      alert('Ekleme işlemi sırasında bir hata oluştu:' + error.message);
    });
  }

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
          <div className='top'>
              <h2>Drone Type Add Page</h2>
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

export default typeAdd