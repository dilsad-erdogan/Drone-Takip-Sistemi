import { useState } from 'react';
import '../../../ui/panel.css';
import { useNavigate, useParams } from 'react-router-dom';
import UserModel from '../../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const userUpdate = () => {
  const [roleName, setRoleName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pilotCertificate, setPilotCertificate] = useState('');
  const [droneOwner, setDroneOwner] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const submitEvent = (event) => {
    event.preventDefault();

    if(!validateForm()) {
      return;
    }

    const updatedUser = {
      roletype_id: roleName,
      name: name,
      email: email,
      password: password,
      pilot_certificate: pilotCertificate,
      drone_owner: droneOwner,
      is_active: true
    };

    userModel.updateUser(id, updatedUser).then(() => {
      alert('Kullanıcı başarıyla güncellendi.');
      navigate('/admin/user');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  }

  const validateForm = () => {
    if (!roleName.trim()) {alert("User role is required.")} 
    else if (!name.trim()) {alert("User name is required.")}
    else if (!email.trim()) {alert("User email is required.")}
    else if (!password.trim()) {alert("USer password is required.")}
    else if (!pilotCertificate.trim()) {alert("Pilot certificate is required.")}
    else if (!droneOwner.trim()) {alert("Drone owner is required.")}
    else { return 1 }
  }

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
        <div className='top'>
          <h2>User Update Page</h2>
        </div>

        <div className='addPanel'>
          <form action='' className='addForm' onSubmit={submitEvent}>
            <input type='text' placeholder='Role Type' value={roleName} onChange={(e) => {setRoleName(e.target.value)}}></input>
            <input type='text' placeholder='User Name' value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <input type='text' placeholder='User Email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            <input type='text' placeholder='User Password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            <input type='text' placeholder='User Pilot Certificate' value={pilotCertificate} onChange={(e) => {setPilotCertificate(e.target.value)}}></input>
            <input type='text' placeholder='User Drone Owner' value={droneOwner} onChange={(e) => {setDroneOwner(e.target.value)}}></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default userUpdate