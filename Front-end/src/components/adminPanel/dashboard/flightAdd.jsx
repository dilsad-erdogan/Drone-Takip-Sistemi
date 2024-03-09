import '../../ui/panel.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();
import PermissionModel from '../../../../../Back-end/connections/permission.js';
const permissionModel = new PermissionModel();
import PilotModel from '../../../../../Back-end/connections/pilot.js';
const pilotModel = new PilotModel();
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const flightAdd = ({ socket }) => {
    const[users, setUsers] = useState([]);
    const[drones, setDrones] = useState([]);
    const[pilots, setPilots] = useState([]);
    const navigate = useNavigate();

    const[userId, setUserId] = useState('');
    const[droneId, setDroneId] = useState('');
    const[pilotId, setPilotId] = useState('');
    const[dateAndTime, setDateAndTime] = useState('');

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
                const pilot = pilotModel.getPilot();

                if(Array.isArray(pilot)){
                    setPilots(pilot);
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
    }, [])

    const submitEvent = async (event) => {
        event.preventDefault();

        const newPermission = {
            user_id: userId,
            owner_id: userId,
            pilot_id: pilotId,
            drone_id: droneId,
            date_and_time: dateAndTime,
            startPoint: null, //mapten seçilecek
            endPoint: null, //mapten seçilecek
            is_active: true
        }
        console.log(newPermission);

        permissionModel.addPermission(newPermission).then(() =>  {
            alert("İzin ekleme işlemi başarıyla gerçekleşti.");
        }).catch((error) => {
            alert("İzin sırasında hata oluştu." + error);
        });
        
        //await socket.emit('addFlight', newFlight); //burada sadece izin eklenmeli eğer admin permission sayfasında onaylarsa uçuşa yazılmalı
        navigate('/admin');
        alert('Flight isteği bağarıyla eklendi.');
    }

    return (
        <div className='topPanel'>
            <div className="top">
                <h2>Flight Add Page</h2>
            </div>

            <div className="addPanel">
                <form action="" className="addForm" onSubmit={submitEvent}>
                    <select name='cat' id='id' onChange={(e) => [setUserId(e.target.value)]}>
                        <option>Select a user</option>
                        {users && users.map((user) => (
                            user.is_active === true ? (<option key={user.user_id} value={user.user_id}>{user.name}</option>) : (console.log())
                        ))}
                    </select>
                    <select name='cat' id='id' onChange={(e) => [setUserId(e.target.value)]}>
                        <option>Select a owner</option>
                        {users && users.map((user) => (
                            user.is_active === true ? (<option key={user.user_id} value={user.user_id}>{user.name}</option>) : (console.log())
                        ))}
                    </select>
                    <select name='cat' id='id' onChange={(e) => [setPilotId(e.target.value)]}>
                        <option>Select a pilot</option>
                        {pilots && pilots.map((pilot) => (
                            pilot.is_active === true ? (<option key={pilot.pilot_id} value={pilot.pilot_id}>{pilot.user_id}</option>) : (console.log())
                        ))}
                    </select>
                    <select name='cat' id='id' onChange={(e) => {setDroneId(e.target.value)}}>
                        <option>Select a drone</option>
                        {drones && drones.map((drone) => (
                            drone.is_active === true ? (<option key={drone.drone_id} value={drone.drone_id}>{drone.serial_number}</option>) : (console.log())
                        ))}
                    </select>
                    <input type='text' placeholder='Flight Date and Time' value={dateAndTime} onChange={(e) => {setDateAndTime(e.target.value)}}></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default flightAdd