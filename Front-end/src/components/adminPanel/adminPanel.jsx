import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import Create from '../createPanel/createPanel.jsx';

import UserModel from '../../../../Back-end/models/user.js';
const userModel = new UserModel();

const AdminPanel = ({ droneData }) => {
  const [action, setAction] = useState("users");
  const [page, setPage] = useState("table");
  const [userData, setUserData] = useState([]);
  const [dronesData, setDroneData] = useState(droneData);

  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState();
  const [role, setRole] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [certificate, setCertificate] = useState();
  const [owner, setOwner] = useState();

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

  useEffect(() => {
    userModel.fetchUserData().then(() => {
      setUserData(userModel.getUsers());
    });
  }, []);

  const deleteUser = async (dataId) => {
    userModel.deleteUser(dataId).then(() => {
      setUserData(userData.filter(user => user.user_id !== dataId));
    });
  };

  const handleOpenModal = (data) => {
    setShowModal(true);
    setId(data.user_id);
    setRole(data.roletype_id);
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    setCertificate(data.pilot_certificate);
    setOwner(data.drone_owner);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                        {userData && userData.map(data => (
                          <tr key={data.user_id}>
                            <td>{data.user_id}</td>
                            <td>{data.roletype_id}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                            <td>{data.pilot_certificate}</td>
                            {data.drone_owner === true ? (<td>true</td>) : (<td>false</td>)}
                            <td>
                              <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.isactive} onChange={() => dataHandleCheckboxChange(data)}></input>
                              </div>
                            </td>
                            <td>
                              <Button variant='primary' onClick={() => {handleOpenModal(data)}}>Update</Button>
                              <Button variant='danger' onClick={() => {deleteUser(data.user_id)}}>Delete</Button>
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
                              <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.isactive} onChange={() => droneHandleCheckboxChange(data)}></input>
                              </div>
                            </td>
                            <td>{data.latitude}</td>
                            <td>{data.longitude}</td>
                            <td>{data.owner_id}</td>
                            <td>{data.serialnumber}</td>
                            <td>
                              <Button variant='primary' onClick={() => {setShowModal(true)}}>Update</Button>
                              <Button variant='danger' onClick={() => {deleteDrone(data.drone_id)}}>Delete</Button>
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
            <Create panel={action} droneData={dronesData}></Create>
          )
        }
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          {action === "users" ? (<Modal.Title>User Edit</Modal.Title>) : (<Modal.Title>Drone Edit</Modal.Title>)}
        </Modal.Header>

        <Modal.Body>
          {action === "users" ?
            (
              <Form>
                <Form.Group controlId='formRoleId'>
                  <Form.Label>Role Type ID</Form.Label>
                  <Form.Control type="text" placeholder="Kullanıcı rolunü seçiniz" value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='formName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Kullanıcı isminizi giriniz." value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='formEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Kullanıcı emailinizi giriniz." value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Kullanıcı passwordünüzü giriniz." value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='formCertificate'>
                  <Form.Label>Certificate</Form.Label>
                  <Form.Control as="select" value={certificate} onChange={(e) => {setCertificate(e.target.value)}}>
                                <option value="null">Sertifikam yok</option>
                                <option value="shgm">SHGM izin belgem var</option>
                                <option value="type1">Tip 1</option>
                                <option value="type2">Tip 2</option>
                                <option value="type3">Tip 3</option>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='formOwner'>
                  <Form.Label>Drone Owner</Form.Label>
                  <Form.Check onChange={(e) => {setOwner(e.target.value)}}></Form.Check>
                </Form.Group>
              </Form>
            )
            :
            (<div></div>)
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant='warning'>Edit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPanel;
