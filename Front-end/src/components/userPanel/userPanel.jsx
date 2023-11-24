import React from 'react';
import { Row, Card, Button, Container, Table } from 'react-bootstrap';

const userPanel = ({ usersData }) => {
  return (
    <Container>
      <h2>Drones</h2>
      <br/>

      <Card>
        <Card.Body>
          <Row>
            {usersData.map(data => (
                <Card key={data.user_id}>
                  <Row>{data.user_id}</Row>
                  <Row>{data.roletype_id}</Row>
                  <Row>{data.name}</Row>
                  <Row>{data.email}</Row>
                  <Row>{data.password}</Row>
                  <Row>{data.pilot_certificate}</Row>
                  <Row>{data.drone_owner}</Row>
                  <Row>{data.isActive}</Row>
                </Card>
              ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default userPanel