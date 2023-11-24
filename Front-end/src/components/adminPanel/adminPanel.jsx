import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';

const AdminPanel = ({ usersData }) => {
  return (
    <>
      <Container style={{marginTop:20}}>
        <h2>Users List</h2>
        <Button variant="primary">New User</Button>
        
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
            </tr>
          </thead>

          <tbody>
            {usersData.map(data => (
              <tr key={data.user_id}>
                <td>{data.user_id}</td>
                <td>{data.roletype_id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td>{data.pilot_certificate}</td>
                <td>{data.drone_owner}</td>
                <td>{data.isActive}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AdminPanel;
