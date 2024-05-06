import '../../../ui/panel.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DroneTypeModel from '../../../../../../Back-end/connections/droneType.js';
const droneTypeModel = new DroneTypeModel();
import DroneModel from '../../../../../../Back-end/connections/drone.js';
const droneConnectionModel = new DroneModel();
import DroneBrandModel from '../../../../../../Back-end/connections/droneBrand.js';
const droneBrandModel = new DroneBrandModel();

const droneAdd = () => {
  const[droneTypeData, setDroneTypeData] = useState([]);
  const[droneBrandData, setDroneBrandData] = useState([]);
  const[droneModelData, setDroneModelData] = useState([]);
  const navigate = useNavigate();

  const[serialNumber, setSerialNumber] = useState('');
  const[droneType, setDroneType] = useState('');
  const[droneBrand, setDroneBrand] = useState('');
  const[droneModel, setDroneModel] = useState('');
  const[sizeHeight, setSizeHeight] = useState('');
  const[sizeWidth, setSizeWidth] = useState('');
  const[sizeDept, setSizeDept] = useState('');
  const[weight, setWeight] = useState('');
  const[airframe, setAirframe] = useState('');
  const[propeller, setPropeller] = useState('');
  const[material, setMaterial] = useState('');
  
  useEffect(() => {
    const fetchDataType = async () => {
      try{
        await droneTypeModel.fetchDroneTypeData();
        const type = droneTypeModel.getDroneTypes();

        if(Array.isArray(type)){
          setDroneTypeData(type);
        } else{
          console.error('Hata getDroneTypes bir dizi döndürmedi.');
        }
      } catch(error) {
        console.error('Error fetching drone type data:', error.message);
        console.error('Full error:', error);
      }
    };

    const fetchDataBrand = async () => {
      try{
        await droneBrandModel.fetchDroneBrandData();
        const brand = droneBrandModel.getDroneBrands();

        if(Array.isArray(brand)){
          setDroneBrandData(brand);
        } else{
          console.error('Hata getDroneBrands bir dizi döndürmedi.');
        }
      } catch(error) {
        console.error('Error fetching drone brand data:', error.message);
        console.error('Full error:', error);
      }
    }

    fetchDataType();
    fetchDataBrand();
  }, []);

  const fetchDataModel = (brandId) => {
    try {
      droneBrandModel.droneBrandModel(brandId)
        .then(models => {
          setDroneModelData(models);
        })
        .catch(error => {
          console.error('Error drone model data:', error.message);
          console.error('Full error:', error);
        });
    } catch (error) {
      console.error('Error drone model data:', error.message);
      console.error('Full error:', error);
    }
  };

  const onChangeBrand = (value) => {
    setDroneBrand(value);
    fetchDataModel(value);
  };

  const submitEvent = async (event) => {
    event.preventDefault();

    const newDrone = {
      serial_number: serialNumber,
      owner_id: localStorage.getItem('userId'),
      dronetype_id: droneType,
      model_id: droneModel,
      battery_health: null,
      size_height: sizeHeight,
      size_width: sizeWidth,
      size_dept: sizeDept,
      weight: weight,
      airframe_name: airframe,
      propeller_size: propeller,
      material: material
    };

    droneConnectionModel.addDrone(newDrone).then(() => {
      alert("Drone ekleme işlemi başarıyla tamamlandı.");
      navigate('/admin/drone');
    }).catch((error) => {
      alert('Ekleme işleminde hata:' + error.message);
    });
  }

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
          <div className='top'>
              <h2>Drone Add Page</h2>
          </div>

          <div className='addPanel'>
              <form action='' className='addForm' onSubmit={submitEvent}>
                  <select name='cat' id='cat' onChange={(e) => {setDroneType(e.target.value)}}>
                    <option>Select a drone type</option>
                    {droneTypeData && droneTypeData.map((type) => (
                      <option key={type.dronetype_id} value={type.dronetype_id}>{type.type_name}</option>
                    ))}
                  </select>
                  <select name='cat' id='cat' value={droneBrand} onChange={(e) => {onChangeBrand(e.target.value)}}>
                    <option>Select a brand</option>
                    {droneBrandData && droneBrandData.map((brand) => (
                      <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                    ))}
                  </select>
                  <select name='cat' id='cat' value={droneModel} onChange={(e) => {setDroneModel(e.target.value)}}>
                    <option>Select a model</option>
                    {droneModelData && droneModelData.map((data) => (
                      <option key={data.model_id} value={data.model_id}>{data.model_name}</option>
                    ))} 
                  </select>
                  <input type='number' placeholder='Drone Size Height' value={sizeHeight} onChange={(e) => {setSizeHeight(e.target.value)}}></input>
                  <input type='number' placeholder='Drone Size Width' value={sizeWidth} onChange={(e) => {setSizeWidth(e.target.value)}}></input>
                  <input type='number' placeholder='Drone Size Dept' value={sizeDept} onChange={(e) => {setSizeDept(e.target.value)}}></input>
                  <input type='number' placeholder='Drone Weight' value={weight} onChange={(e) => {setWeight(e.target.value)}}></input>
                  <input type='text' placeholder='Drone Airframe Name' value={airframe} onChange={(e) => {setAirframe(e.target.value)}}></input>
                  <input type='text' placeholder='Drone Propeller Size' value={propeller} onChange={(e) => {setPropeller(e.target.value)}}></input>
                  <input type='text' placeholder='Drone Material' value={material} onChange={(e) => {setMaterial(e.target.value)}}></input>
                  <input type='text' placeholder='Drone Serial Number' value={serialNumber} onChange={(e) => {setSerialNumber(e.target.value)}}></input>
                  <button type='submit'>Submit</button>
              </form>
          </div>
      </div>
    </div>
  )
}

export default droneAdd