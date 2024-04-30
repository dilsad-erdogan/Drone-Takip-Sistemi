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

    // const fetchData = async () => {
    //     const owners = {}, pilots= {}, serials = {};
    //     for (const flight of flights) {
    //         owners[flight.owner_id] = await getUserById(flight.owner_id);
    //         pilots[flight.pilot_id] = await getUserById(flight.pilot_id);
    //         serials[flight.drone_id] = await getSerialNumberById(flight.drone_id);
    //     }
    //     setOwnerNames(owners);
    //     setPilotNames(pilots);
    //     setSerialNumbers(serials);
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [flights]);    

    useEffect(() => {
        // Veri tabanından kullanıcı ve drone bilgilerini tek seferde alıp saklayın
        const fetchData = async () => {
            try {
                const ownerIds = flights.map(flight => flight.owner_id);
                const pilotIds = flights.map(flight => flight.pilot_id);
                const droneIds = flights.map(flight => flight.drone_id);

                const [ownerResults, pilotResults, droneResults] = await Promise.all([
                    Promise.all(ownerIds.map(id => getUserById(id))),
                    Promise.all(pilotIds.map(id => getUserById(id))),
                    Promise.all(droneIds.map(id => getSerialNumberById(id)))
                ]);

                const owners = ownerIds.reduce((acc, id, index) => {
                    acc[id] = ownerResults[index];
                    return acc;
                }, {});

                const pilots = pilotIds.reduce((acc, id, index) => {
                    acc[id] = pilotResults[index];
                    return acc;
                }, {});

                const serials = droneIds.reduce((acc, id, index) => {
                    acc[id] = droneResults[index];
                    return acc;
                }, {});

                setOwnerNames(owners);
                setPilotNames(pilots);
                setSerialNumbers(serials);
            } catch (error) {
                console.error('Error fetching user or drone data:', error.message);
            }
        };

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
                            <td>{flight.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default transactions