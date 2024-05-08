import { useState } from 'react';
import '../../../ui/panel.css';
import { useNavigate, useParams } from 'react-router-dom';
import RoleModel from '../../../../../../Back-end/connections/roleType.js';
const roleModel = new RoleModel();

const roleUpdate = () => {
  const [roleName, setRoleName] = useState('');
  const [explanation, setExplanation] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const submitEvent = (event) => {
    event.preventDefault();

    if(!validateForm()) {
      return;
    }

    const updatedRole = {
      role_type: roleName,
      explanation: explanation
    };

    roleModel.updateRole(id, updatedRole).then(() => {
      alert('Role başarıyla güncellendi.');
      navigate('/admin/user-roleType');
    }).catch((error) => {
      console.error('Hata:', error.message);
    });
  };

  const validateForm = () => {
    if (!roleName.trim()) {alert("Role name is required.")} 
    else if (!explanation.trim()) {alert("Explanation is required.")}
    else { return 1 }
  }

  return (
    <div className='addUpdatePage'>
      <div className='addUpdatePanel'>
        <div className='top'>
          <h2>User Role Type Update Page</h2>
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

export default roleUpdate