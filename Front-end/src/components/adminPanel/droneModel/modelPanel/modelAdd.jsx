import '../../../ui/panel.css';
import { useEffect, useState } from "react";
import DroneBrandModel from "../../../../../../Back-end/connections/droneBrand.js";
import { useNavigate } from 'react-router-dom';
const droneBrandModel = new DroneBrandModel();
import DroneModelModel from '../../../../../../Back-end/connections/droneModel.js';
const droneModelModel = new DroneModelModel();

const modelAdd = () => {
  const[droneBrandData, setDroneBrandData] = useState([]);
  const[modelBrand, setModelBrand] = useState('');
  const[modelName, setModelName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try{
        await droneBrandModel.fetchDroneBrandData();
        const brand = droneBrandModel.getDroneBrands();

        if(Array.isArray(brand)) {
          setDroneBrandData(brand);
        } else{
          console.error('Hata: getDroneBrands bir dizi döndürmedi.');
        }
      } catch(error) {
        console.error('Error fetching drone brand data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  const submitEvent = (event) => {
    event.preventDefault();

    const newModel = {
      brand_id: modelBrand,
      model_name: modelName
    };

    droneModelModel.addModel(newModel).then(() => {
      alert("Model ekleme işlemi başarıyla tamamlandı.");
      navigate('/admin/drone-model');
    }).catch((error) => {
      alert('Ekleme işlemi sırasında bir hata oluştu:' + error.message);
    });
  }

  return (
    <div className='addUpdatePage'>
      <div className='topPanel'>
          <div className='top'>
              <h2>Drone Model Add Page</h2>
          </div>

          <div className='addPanel'>
              <form action='' className='addForm' onSubmit={submitEvent}>
                <select name='cat' id='cat' onChange={(e) => {setModelBrand(e.target.value)}}>
                  {droneBrandData && droneBrandData.map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                  ))}
                </select>
                <input type='text' placeholder='Model Name' value={modelName} onChange={(e) => {setModelName(e.target.value)}}></input>
                <button type='submit'>Submit</button>
              </form>
          </div>
      </div>
    </div>
  )
}

export default modelAdd