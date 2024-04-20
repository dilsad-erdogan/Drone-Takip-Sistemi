import '../../ui/panel.css';
import { useNavigate } from 'react-router-dom';
import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import RoleModel from '../../../../../Back-end/connections/roleType.js';
const roleModel = new RoleModel();
import DeleteModal from '../../ui/commonUsage/modal.jsx';
import { useEffect, useState } from 'react';

const userRoleType = () => {
  const navigate = useNavigate();
  const[roleData, setRoleData] = useState([]);
  const[deleteModal, setDeleteModal] = useState(false);
  const[deletedRole, setDeletedRole] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try{
        await roleModel.fetchUserRoleData();
        const role = roleModel.getUserRole();

        if(Array.isArray(role)){
          setRoleData(role);
        } else{
          console.error('Hata getUserRole bir dizi döndürmedi.');
        }
      } catch(error) {
        console.error('Error fetching role data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchValue(params.get("q") || "");
  }, [location.search]);

  const addNewRole = () => {
    navigate('/admin/roleAdd');
  }

  const deleteButtonClick = async (roleId) => {
    setDeletedRole(roleId);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const dataDeleteModal = async() => {
    try{
      await roleModel.deleteUserRole(deletedRole).then(() => {
        setRoleData(roleModel.getUserRole());
      }); 
    } catch (error) {
      console.log('Hata:', error.message);
    }
  }

  const updateButtonClick = async (roleId) => {
    navigate(`/admin/roleUpdate/${roleId}`);
  }

  const filteredData = roleData.filter((type) =>
    type.role_type.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='topPanel'>
      <div className='top'>
        <Search placeholder="Search for a user role type"></Search>

        <button className='btn btn-outline-light' onClick={() => {addNewRole()}}>Add New Role</button>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>Role Name</td>
            <td>Explanation</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((role) => (
            <tr key={role.roletype_id}>
              <td>{role.role_type}</td>
              <td>{role.explanation}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={role.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(role.roletype_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(role.roletype_id)}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>

      <DeleteModal show={deleteModal} deleteData={dataDeleteModal} onClose={closeDeleteModal}></DeleteModal>
    </div>
  )
}

export default userRoleType