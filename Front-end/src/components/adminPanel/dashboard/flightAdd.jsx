import { useEffect, useState } from 'react';
import '../../ui/panel.css';
import { useNavigate } from 'react-router-dom';
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

const flightAdd = () => {
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
                } else{
                    console.error('Hata getDrones bir dizi döndürmedi.');
                }
            } catch(error) {
                console.error('Error fetching drone data:', error.message);
                console.error('Full error:', error);
            }
        };

        fetchDroneData();
    }, [])

    const submitEvent = async (event) => {
        event.preventDefault();
        
        //     "flight_number": "FLY54",
        //     "drone_id": 4,
        //     "startPoint": 123,
        //     "endPoint": 456,
        //     "coordinates": {
        //         "type": "Point",
        //         "coordinates": [40.7128, -74.0060]
        
        const newFlight = {
            flight_number: flightNumber,
            drone_id: droneId
        }

        console.log(newFlight);
        navigate('/admin/dashboard');
    }

    return (
        <div className='topPanel'>
            <div className="top">
                <h2>Flight Add Page</h2>
            </div>

            <div className="addPanel">
                <form action="" className="addForm" onSubmit={submitEvent}>
                    <input type='text' placeholder='Flight Number' value={flightNumber} onChange={(e) => {setFlightNumber(e.target.value)}}></input>
                    <select name='cat' id='id' onChange={(e) => {setDroneId(e.target.value)}}>
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