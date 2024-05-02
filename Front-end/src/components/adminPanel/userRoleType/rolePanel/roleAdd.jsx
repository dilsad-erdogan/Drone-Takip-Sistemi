import '../../../ui/panel.css';
import RoleModel from '../../../../../../Back-end/connections/roleType.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const roleModel = new RoleModel();

const roleAdd = () => {
  const [roleName, setRoleName] = useState('');
  const [explanation, setExplanation] = useState('');
  const navigate = useNavigate();

  const submitEvent = (event) => {
    event.preventDefault();

    const newRole = {
      role_type: roleName,
      explanation: explanation
    };

    roleModel.addRole(newRole).then(() => {
      alert("Role ekleme işlemi başarıyla tamamlandı.");
      navigate('/admin/user-roleType');
    }).catch((error) => {
      alert('Ekleme işlemi sırasında bir hata oluştu:' + error.message);
    });
  }

  return (
    <div className='addUpdatePage'>
      <div className='topPanel'>
          <div className='top'>
              <h2>User Role Add Page</h2>
          </div>

          <div className='addPanel'>
              <form action='' className='addForm' onSubmit={submitEvent}>
                  <input type='text' placeholder='Role Type Name' value={roleName} onChange={(e) => {setRoleName(e.target.value)}}></input>
                  <input type='text' placeholder='Explanation' value={explanation} onChange={(e) => {setExplanation(e.target.value)}}></input>
                  <button type='submit'>Submit</button>
              </form>
          </div>
      </div>
    </div>
  )
}

export default roleAdd