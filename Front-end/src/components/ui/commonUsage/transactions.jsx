import '../panel.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserModel from '../../../../../Back-end/connections/user';
const userModel = new UserModel();
import DroneModel from '../../../../../Back-end/connections/drone';
const droneModel = new DroneModel();

const transactions = ({ flights }) => {
    const navigate = useNavigate();
    const [ownerNames, setOwnerNames] = useState({});
    const [pilotNames, setPilotNames] = useState({});
    const [serialNumbers, setSerialNumbers] = useState({});

    const addNewFlight = () => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.endsWith('/admin') ? '/admin/flightAdd' : '/user/flightAdd';
        navigate(newPath);
    };

    const fetchData = async () => {
        const owners = {}, pilots= {}, serials = {};
        for (const flight of flights) {
            owners[flight.owner_id] = await getUserById(flight.owner_id);
            pilots[flight.pilot_id] = await getUserById(flight.pilot_id);
            serials[flight.drone_id] = await getSerialNumberById(flight.drone_id);
        }
        setOwnerNames(owners);
        setPilotNames(pilots);
        setSerialNumbers(serials);
    }

    useEffect(() => {
        fetchData();
    }, [flights]);    

    async function getUserById(userId){
        if (!userId) {
          return null;
        }
    
        try{
          const userName = await userModel.getUserByName(userId);
          return userName;
        } catch(error){
          console.error('Hata:', error.message);
          return userId;
        }
    }

    async function getSerialNumberById(droneId){
        if(!droneId){
            return null;
        }

        try{
            const droneSerial = await droneModel.getSerialNumberById(droneId);
            return droneSerial;
        } catch(error){
            console.error('Hata:', error.message);
            return droneId;
        }
    }
    
    return (
        <div className='transactions'>
            <div className='top'>
                <h2 className='transTitle'>Flights</h2>
                <button className='btn btn-outline-light' onClick={() => {addNewFlight()}}>Add New Flight</button>
            </div>
  
            <table className='dataTable'>
                <thead>
                    <tr>
                        <td>Flight Number</td>
                        <td>Owner</td>
                        <td>Pilot</td>
                        <td>Drone</td>
                        <td>Coordinates</td>
                        <td>Created At</td>
                    </tr>
                </thead>

                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight._id}>
                            <td>{flight.flight_number}</td>
                            <td>{ownerNames[flight.owner_id]}</td>
                            <td>{pilotNames[flight.pilot_id]}</td>
                            <td>{serialNumbers[flight.drone_id]}</td>
                            <td>{flight.coordinates.coordinates[0] + '-' + flight.coordinates.coordinates[0]}</td>
                            <td>{flight.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default transactions