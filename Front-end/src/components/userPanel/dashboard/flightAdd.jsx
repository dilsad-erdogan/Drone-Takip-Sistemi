import '../../ui/panel.css';
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        await socket.emit('addFlight', newFlight);
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