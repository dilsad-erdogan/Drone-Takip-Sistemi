import '../../../ui/panel.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PilotModel from '../../../../../../Back-end/connections/pilot';
const pilotModel = new PilotModel();
import UserModel from '../../../../../../Back-end/connections/user';
const userModel = new UserModel();

const pilotAdd = () => {
    const [userData, setUserData] = useState([]);
    const [userId, setUderId] = useState('');
    const [certificate, setCertificate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try{
            await userModel.fetchUserData();
            const user = userModel.getUsers();
    
            if(Array.isArray(user)) {
              setUserData(user);
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
    
        const newPilot = {
          user_id: userId,
          pilot_certificate: certificate
        };
    
        pilotModel.addPilot(newPilot).then(() => {
          alert("Pilot ekleme işlemi başarıyla tamamlandı.");
          navigate('/admin/pilot');
        }).catch((error) => {
          alert('Ekleme işlemi sırasında bir hata oluştu:' + error.message);
        });
    }

    return (
      <div className='addUpdatePage'>
        <div className='addUpdatePanel'>
            <div className='top'>
                <h2>Pilot Add Page</h2>
            </div>
    
            <div className='addPanel'>
                <form action='' className='addForm' onSubmit={submitEvent}>
                    <select name='cat' id='cat' onChange={(e) => {setUderId(e.target.value)}}>
                        <option>Select a user</option>
                        {userData && userData.map((user) => (
                            <option key={user.user_id} value={user.user_id}>{user.name}</option>
                        ))}
                    </select>
                    <input type='text' placeholder='Pilot Certificate' value={certificate} onChange={(e) => {setCertificate(e.target.value)}}></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
      </div>
    )
}

export default pilotAdd
