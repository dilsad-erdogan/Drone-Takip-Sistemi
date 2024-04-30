import '../../ui/panel.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();
import PermissionModel from '../../../../../Back-end/connections/permission.js';
const permissionModel = new PermissionModel();
import PilotModel from '../../../../../Back-end/connections/pilot.js';
const pilotModel = new PilotModel();
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const containerStyle = {
    width: '100%',
    height: '50vh'
};

const center = {
    lat: 38.9639778137207,
    lng: 35.243247985839844
};

const flightAdd = ({ socket }) => {
    const[users, setUsers] = useState([]);
    const[drones, setDrones] = useState([]);
    const[pilots, setPilots] = useState([]);
    const navigate = useNavigate();

    const[userId, setUserId] = useState('');
    const[droneId, setDroneId] = useState('');
    const[pilotId, setPilotId] = useState('');
    const[dateAndTime, setDateAndTime] = useState('');
    const[startPoint, setStartPoint] = useState('');
    const[endPoint, setEndPoint] = useState('');

    const[userNames, setUserNames] = useState('');
    const[clickCount, setClickCount] = useState(0);
    const[markers, setMarkers] = useState([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA4Iplfzhel3DioSkxnZjF9bcGXR-ORItw"
    });

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

        const fetchPilotData = async () => {
            try{
                await pilotModel.fetchPilotData();
                const pilots = pilotModel.getPilot();

                if(Array.isArray(pilots)){
                    setPilots(pilots);

                    const users = {};
                    for(const pilot of pilots){
                        users[pilot.user_id] = await getUserById(pilot.user_id);
                    }
                    setUserNames(users);
                }else{
                    console.error('Hata getPilot bir dizi döndürmedi.');
                }
            }catch(error){
                console.error('Error fetching pilot data:', error.message);
                console.error('Full error:', error);
            }
        }

        const fetchUserData = async () => {
            try {
              await userModel.fetchUserData();
              const users = userModel.getUsers();
      
              if (Array.isArray(users)) {
                setUsers(users);
              } else {
                console.error('Hata: getUsers bir dizi döndürmedi.');
              }
            } catch (error) {
              console.error('Error fetching user data:', error.message);
              console.error('Full error:', error);
            }
        };

        fetchDroneData();
        fetchPilotData();
        fetchUserData();
    }, []);

    async function getUserById(userId){
        try{
          const userName = await userModel.getUserByName(userId);
          return userName;
        } catch(error){
          console.error('Hata:', error.message);
          return userId;
        }
    }

    const submitEvent = async (event) => {
        event.preventDefault();

        const newPermission = {
            user_id: userId,
            pilot_id: pilotId,
            drone_id: droneId,
            date_and_time: dateAndTime,
            startPoint: {
                type: "Point",
                coordinates: [startPoint.split(', ')[0], startPoint.split(', ')[1]]
            },
            endPoint: {
                type: "Point",
                coordinates: [endPoint.split(', ')[0], endPoint.split(', ')[1]]
            },
            is_active: true
        }
        console.log(newPermission);

        permissionModel.addPermission(newPermission).then(() =>  {
            alert("İzin isteğiniz başarıyla yönlendirildi.");
        }).catch((error) => {
            alert("İzin sırasında hata oluştu." + error);
        });
        
        navigate('/admin');
    }

    const handleMapClick = (ev) => {
        if(clickCount === 0){
            setStartPoint(`${ev.latLng.lat()}, ${ev.latLng.lng()}`);
            setClickCount(1);
            setMarkers([{ lat: ev.latLng.lat(), lng: ev.latLng.lng(), type: 'start' }]);
        } else if(clickCount === 1) {
            setEndPoint(`${ev.latLng.lat()}, ${ev.latLng.lng()}`);
            setClickCount(2);
            setMarkers([...markers, { lat: ev.latLng.lat(), lng: ev.latLng.lng(), type: 'end' }]);
        }
    }

    return (
        <div className='topPanel'>
            <div className="top">
                <h2>Flight Add Page</h2>
            </div>

            <div className="addPanel">
                <form action="" className="addForm" onSubmit={submitEvent}>
                    <select name='cat' id='id' onChange={(e) => [setUserId(e.target.value)]}>
                        <option>Select a owner</option>
                        {users && users.map((user) => (
                            user.is_active === true ? (<option key={user.user_id} value={user.user_id}>{user.name}</option>) : (console.log())
                        ))}
                    </select>
                    <select name='cat' id='id' onChange={(e) => [setPilotId(e.target.value)]}>
                        <option>Select a pilot</option>
                        {pilots && pilots.map((pilot) => (
                            pilot.is_active === true ? (<option key={pilot.pilot_id} value={pilot.pilot_id}>{userNames[pilot.user_id]}</option>) : (console.log())
                        ))}
                    </select>
                    <select name='cat' id='id' onChange={(e) => {setDroneId(e.target.value)}}>
                        <option>Select a drone</option>
                        {drones && drones.map((drone) => (
                            drone.is_active === true ? (<option key={drone.drone_id} value={drone.drone_id}>{drone.serial_number}</option>) : (console.log())
                        ))}
                    </select>
                    <input type='datetime-local' placeholder='Flight Date and Time' value={dateAndTime} onChange={(e) => {setDateAndTime(e.target.value)}}></input>
                    {/* <Datetime value={dateAndTime} onChange={setDateAndTime} inputProps={{ placeholder: 'Flight Date and Time' }}></Datetime> */}
                    <div className='container-fluid'>
                        {isLoaded ? (
                            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6} onClick={handleMapClick}>
                                {markers.map((marker, index) => (
                                    <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} icon={'https://maps.google.com/mapfiles/ms/icons/red-dot.png'} />
                                ))}
                            </GoogleMap>
                        ) : (
                            <p>Map is loading...</p>
                        )}
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default flightAdd