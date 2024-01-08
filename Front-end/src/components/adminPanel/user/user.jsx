import './user.css';
import { useEffect, useState } from 'react';
import Search from '../user-drone/search/search.jsx';
import Pagination from '../user-drone/pagination/pagination.jsx';
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const User = () => {
  const [userData, setUserData] = useState([]);

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

  return (
    <div className='user'>
      <div className='top'>
        <Search placeholder="Search for a user"></Search>

        <button className='btn btn-outline-light'>Add New User</button>
      </div>

      <table className='userTable'>
        <thead>
          <tr>
            {/* <td>Id</td>
            <td>Role Type</td> */}
            <td>Name</td>
            <td>Email</td>
            {/* <td>Password</td> */}
            <td>Certificate</td>
            <td>Drone Owner</td>
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
                <div className='buttons'>
                  <button className='button update'>Update</button>

                  <button className='button delete'>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>
    </div>
  );
};

export default User;
