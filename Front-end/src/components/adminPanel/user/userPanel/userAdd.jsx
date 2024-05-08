import '../../../ui/panel.css';
import UserModel from '../../../../../../Back-end/connections/user.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const userModel = new UserModel();

const userAdd = () => {  
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [certificate, setCertificate] = useState('');
  const navigate = useNavigate();

  const submitEvent = (event) => {
    event.preventDefault();

    if(password !== password2){
      alert("Password değerleri uyuşmuyor, lütfen kontrol ediniz.");
      return;
    }

    if(!validateForm()) {
      return;
    }

    const newUser = {
      roletype_id: role,
      name: name,
      email: email,
      password: password,
      pilot_certificate: certificate,
      drone_owner: "false"
    };

    userModel.addUser(newUser).then(() => {
      alert("Kayıt işlemi başarıyla tamamlandı.");
      navigate('/admin/user');
    }).catch((error) => {
      alert('Ekleme işlemi sırasında bir hata oluştu:' + error.message);
    });
  }

  const validateForm = () => {
    if (!role.trim()) {alert("User role is required.")} 
    else if (!name.trim()) {alert("User name is required.")}
    else if (!email.trim()) {alert("User email is required.")}
    else if (!password.trim()) {alert("User password is required.")}
    else if (!password2.trim()) {alert("User password again is required.")}
    else if (!certificate.trim()) {alert("Certificate is required.")}
    else { return 1 }
  }

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
        <div className='top'>
          <h2>User Add Page</h2>
        </div>

        <div className='addPanel'>
          <form action='' className='addForm' onSubmit={submitEvent}>
              <input type='text' placeholder='User Role Type' value={role} onChange={(e) => {setRole(e.target.value)}}></input>
              <input type='text' placeholder='User Name'value={name} onChange={(e) => {setName(e.target.value)}}></input>
              <input type='text' placeholder='User Email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
              <input type='password' placeholder='User Password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
              <input type='password' placeholder='User Password Again' value={password2} onChange={(e) => {setPassword2(e.target.value)}}></input>
              <input type='text' placeholder='User Certificate' value={certificate} onChange={(e) => {setCertificate(e.target.value)}}></input>
              <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default userAdd