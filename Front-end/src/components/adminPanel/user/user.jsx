import '../../ui/panel.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../ui/commonUsage/search.jsx';
import Pagination from '../../ui/commonUsage/pagination.jsx';
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import DeleteModal from '../../ui/commonUsage/modal.jsx';

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedUser, setDeletedUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await userModel.fetchUserData();
        const users = userModel.getUsers();

        if (Array.isArray(users)) {
          setUserData(users);
        } else {
          console.error('Hata: getUsers bir dizi döndürmedi.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  const addNewUser = () => {
    navigate('/admin/userAdd');
  }

  const deleteButtonClick = async (userId) => {
    setDeletedUser(userId);
    setDeleteModal(true);
  } //tabloda delete butonuna basılınca
  
  const closeDeleteModal = () => {
    setDeleteModal(false);
  } //modalda exit butonuna tıklayınca

  const dataDeleteModal = async() => {
    try{
      await userModel.deleteUser(deletedUser).then(() => {
        setUserData(userModel.getUsers());
      }); 
    } catch (error){
      console.log('Hata:', error.message);
    }
  } //modalda delete butonuna tıklayınca

  const updateButtonClick = async (userId) => {
    navigate(`/admin/userUpdate/${userId}`);
  } //tabloda update butonuna tıklayınca

  return (
    <div className='topPanel'>
      <div className='top'>
        <Search placeholder="Search for a user"></Search>

        <button className='btn btn-outline-light' onClick={() => {addNewUser()}}>Add New User</button>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            {/* <td>Id</td>
            <td>Role Type</td> */}
            <td>Name</td>
            <td>Email</td>
            {/* <td>Password</td> */}
            <td>Certificate</td>
            <td>Drone Owner</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {userData && userData.map((user) => (
            <tr key={user.user_id}>
              {/* <td>{user.user_id}</td>
              <td>{user.roletype_id}</td> */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.pilot_certificate}</td>
              <td>{user.drone_owner === true ? 'true' : 'false'}</td>
              <td>
                <div className='form-check form-switch'>
                  <input className='form-check-input' type='checkbox' checked={user.is_active} onChange={() => {}}></input>
                </div>
              </td>
              <td>
                <div className='buttons'>
                  <button className='button update' onClick={() => {updateButtonClick(user.user_id)}}>Update</button>

                  <button className='button delete' onClick={() => {deleteButtonClick(user.user_id)}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>

      <DeleteModal show={deleteModal} deleteData={dataDeleteModal} onClose={closeDeleteModal}></DeleteModal>
    </div>
  );
};

export default User;
