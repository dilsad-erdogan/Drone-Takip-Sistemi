import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

const AdminPanel = ({ usersData , droneData }) => {
  const [action, setAction] = useState("users");
  const [page, setPage] = useState("table");
  const [userData, setUserData] = useState(usersData);
  const [dronesData, setDroneData] = useState(droneData);

  const dataHandleCheckboxChange = (data) => {
    const updatedData = userData.map(item => {
      if (item.user_id === data.user_id) {
        return { ...item, isactive: !item.isactive };
      }
      return item;
    });

    setUserData(updatedData);
  };

  const droneHandleCheckboxChange = (data) => {
    const updatedData = dronesData.map(item => {
      if (item.drone_id === data.drone_id) {
        return { ...item, isactive: !item.isactive };
      }
      return item;
    });

    setDroneData(updatedData);
  };

  return (
    <>
      <Container style={{marginTop:20}}>
        <Button onClick={() => {setAction('users')}} variant={action === "users" ? ("primary") : ("light")}>Users</Button>
        <Button onClick={() => {setAction('drones')}} variant={action === "drones" ? ("primary") : ("light")} style={{marginLeft:20}}>Drones</Button>

        {page === "table" ? 
          (
            <>
              {action === "users" ? 
                (
                  <div style={{marginTop:20}}>
                    <h2>Users List</h2>
                    <Button variant="primary" onClick={() => {setPage('adding')}}>New User</Button>
    
                    <Table style={{marginTop:50}}>
                      <thead>
                        <tr>
                          <th>User ID</th>
                          <th>Role Type</th>
                          <th>User Name</th>
                          <th>User Email</th>
                          <th>User Password</th>
                          <th>User Certificate</th>
                          <th>User Drone Owner</th>
                          <th>Active</th>
                          <th>Action</th>
                        </tr>
                      </thead>
      
                      <tbody>
                        {userData.map(data => (
                          <tr key={data.user_id}>
                            <td>{data.user_id}</td>
                            <td>{data.roletype_id}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                            <td>{data.pilot_certificate}</td>
                            {data.drone_owner === true ? (<td>true</td>) : (<td>false</td>)}
                            <td>
                              <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.isactive} onChange={() => dataHandleCheckboxChange(data)}></input>
                              </div>
                            </td>
                            <td>
                              <Button variant='primary'>Update</Button>
                              <Button variant='danger'>Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )
                  :
                (
                  <div style={{marginTop:20}}>
                    <h2>Drones List</h2>
                    <Button variant="primary" onClick={() => {setPage('adding')}}>New Drone</Button>
      
                    <Table style={{marginTop:50}}>
                      <thead>
                        <tr>
                          <th>Drone ID</th>
                          <th>Drone Info ID</th>
                          <th>Active</th>
                          <th>Drone Latitude</th>
                          <th>Drone Longitude</th>
                          <th>Drone Owner</th>
                          <th>Drone Serial Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
      
                      <tbody>
                        {dronesData.map(data => (
                          <tr key={data.drone_id}>
                            <td>{data.drone_id}</td>
                            <td>{data.droneinfo_id}</td>
                            <td>
                              <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.isactive} onChange={() => droneHandleCheckboxChange(data)}></input>
                              </div>
                            </td>
                            <td>{data.latitude}</td>
                            <td>{data.longitude}</td>
                            <td>{data.owner_id}</td>
                            <td>{data.serialnumber}</td>
                            <td>
                              <Button variant='primary'>Update</Button>
                              <Button variant='danger'>Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )
              }
            </>
          )
            :
          (
            <div>Adding screen</div>
          )
        }
      </Container>
    </>
  );
};

export default AdminPanel;
