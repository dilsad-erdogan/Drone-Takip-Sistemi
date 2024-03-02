import '../../ui/panel.css';
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PermissionModel from '../../../../../Back-end/connections/permission.js';
const permissionModel = new PermissionModel();

const flightAdd = ({ socket }) => {
    const[drones, setDrones] = useState([]);
    const navigate = useNavigate();

    const[flightNumber, setFlightNumber] = useState('');
    const[droneId, setDroneId] = useState('');

    useEffect(() => {
        const fetchDroneData = async () => {
            try{
                await droneModel.fetchDroneData();
                const drone = droneModel.getDrones();

                if(Array.isArray(drone)){
                    setDrones(drone);
                }else{
                    console.error('Hata getDrones bir dizi döndürmedi.');
                }
            }catch(error){
                console.error('Error fetching drone data:', error.message);
                console.error('Full error:', error);
            }
        };

        fetchDroneData();
    }, [])

    const submitEvent = async (event) => {
        event.preventDefault();

        const newFlight = {
            flight_number: flightNumber,
            drone_id: droneId
        }
        console.log(newFlight);

        const newPermission = {
            user_id: localStorage.getItem("userId"),
            pilot_id: null, //pilot için selection option input bloğu yap sonra eklenecek
            drone_id: droneId,
            admin_id: null,
            coordinates: {
                type: "Point",
                coordinates: [] //coordinates map eklenip başlangıç ve bitiş konumu seçilerek girilecek
            },
            id_active: true
        }
        console.log(newPermission);

        permissionModel.addPermission(newPermission).then(() =>  {
            alert("İzin ekleme işlemi başarıyla gerçekleşti.");
        }).catch((error) => {
            alert("İzin sırasında hata oluştu." + error);
        });

        await socket.emit('addFlight', newFlight); //burada sadece izin eklenmeli eğer admin permission sayfasında onaylarsa uçuşa yazılmalı
        navigate('/user');
        alert('Flight isteğiniz admine yönlendirildi.');
    }

    return (
        <div className='topPanel'>
            <div className="top">
                <h2>Flight Add Page</h2>
            </div>

            <div className="addPanel">
                <form action="" className="addForm" onSubmit={submitEvent}>
                    <input type="text" placeholder='Flight Number' value={flightNumber} onChange={(e) => {setFlightNumber(e.target.value)}}/>
                    <select name="cat" id="id" onChange={(e) => {setDroneId(e.target.value)}}>
                        <option>Select a drone</option>
                        {drones && drones.map((drone) => (
                            drone.is_active === true ? (<option key={drone.drone_id} value={drone.drone_id}>{drone.serial_number}</option>) : (console.log())
                        ))}
                    </select>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default flightAdd