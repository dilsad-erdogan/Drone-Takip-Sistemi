import '../../../ui/panel.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DroneTypeModel from '../../../../../../Back-end/connections/droneType.js';
const droneTypeModel = new DroneTypeModel();
import DroneModelModel from '../../../../../../Back-end/connections/droneModel.js';
const droneModelModel = new DroneModelModel();
import DroneModel from '../../../../../../Back-end/connections/drone.js';
const droneConnectionModel = new DroneModel();

const droneAdd = () => {
  const[droneTypeData, setDroneTypeData] = useState([]);
  const[droneModelData, setDroneModelData] = useState([]);
  const navigate = useNavigate();

  const[serialNumber, setSerialNumber] = useState('');
  const[ownerId, setOwnerId] = useState('');
  const[droneType, setDroneType] = useState('');
  const[droneModel, setDroneModel] = useState('');
  const[batteryHealth, setBatteryHealth] = useState('');
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

    const fetchDataModel = async () => {
      try{
        await droneModelModel.fetchDroneModelData();
        const model = droneModelModel.getDroneModel();

        if(Array.isArray(model)){
          setDroneModelData(model);
        } else{
          console.error('Hata getModel dizi döndürmedi.');
        }
      } catch(error){
        console.error('Error drone model data:', error.message);
        console.error('Full error:', error);
      }
    }

    fetchDataType();
    fetchDataModel();
  }, []);

  const submitEvent = async (event) => {
    event.preventDefault();

    const newDrone = {
      serial_number: serialNumber,
      owner_id: ownerId,
      dronetype_id: droneType,
      model_id: droneModel,
      battery_health: batteryHealth,
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
    <div className='topPanel'>
        <div className='top'>
            <h2>Drone Add Page</h2>
        </div>

        <div className='addPanel'>
            <form action='' className='addForm' onSubmit={submitEvent}>
                <select name='cat' id='cat' onChange={(e) => {setDroneType(e.target.value)}}>
                  {droneTypeData && droneTypeData.map((type) => (
                    <option key={type.dronetype_id} value={type.dronetype_id}>{type.type_name}</option>
                  ))}
                </select>
                <select name='cat' id='cat' value={droneModel} onChange={(e) => {setDroneModel(e.target.value)}}>
                  {droneModelData && droneModelData.map((model) => (
                    <option key={model.model_id} value={model.model_id}>{model.model_name}</option>
                  ))}
                </select>
                <input type='number' placeholder='Drone Batery Health' value={batteryHealth} onChange={(e) => {setBatteryHealth(e.target.value)}}></input>
                <input type='number' placeholder='Drone Size Height' value={sizeHeight} onChange={(e) => {setSizeHeight(e.target.value)}}></input>
                <input type='number' placeholder='Drone Size Width' value={sizeWidth} onChange={(e) => {setSizeWidth(e.target.value)}}></input>
                <input type='number' placeholder='Drone Size Dept' value={sizeDept} onChange={(e) => {setSizeDept(e.target.value)}}></input>
                <input type='number' placeholder='Drone Weight' value={weight} onChange={(e) => {setWeight(e.target.value)}}></input>
                <input type='text' placeholder='Drone Airframe Name' value={airframe} onChange={(e) => {setAirframe(e.target.value)}}></input>
                <input type='text' placeholder='Drone Propeller Size' value={propeller} onChange={(e) => {setPropeller(e.target.value)}}></input>
                <input type='text' placeholder='Drone Material' value={material} onChange={(e) => {setMaterial(e.target.value)}}></input>
                <input type='text' placeholder='Drone Owner' value={ownerId} onChange={(e) => {setOwnerId(e.target.value)}}></input>
                <input type='text' placeholder='Drone Serial Number' value={serialNumber} onChange={(e) => {setSerialNumber(e.target.value)}}></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default droneAdd