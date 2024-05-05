import { useState } from 'react';
import '../../../ui/panel.css';
import { useNavigate, useParams } from 'react-router-dom';
import ModelModel from '../../../../../../Back-end/connections/droneModel.js';
const modelModel = new ModelModel();

const modelUpdate = () => {
  const [modelName, setModelName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const submitEvent = (event) => {
    event.preventDefault();

    const updatedModel = {
      model_name: modelName
    };

    modelModel.updateModel(id, updatedModel).then(() => {
      alert('Model başarıyla güncellendi.');
      navigate('/admin/drone-model');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
        <div className='top'>
          <h2>Drone Model Update Page</h2>
        </div>

        <div className='addPanel'>
          <form action='' className='addForm' onSubmit={submitEvent}>
            <input type='text' placeholder='Drone Model Name' value={modelName} onChange={(e) => {setModelName(e.target.value)}}></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default modelUpdate