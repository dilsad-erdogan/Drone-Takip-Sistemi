import React from 'react';
import { Row, Card, Button, Container, Table } from 'react-bootstrap';

const userPanel = ({ droneData }) => {
  return (
    <Container>
      <h2>Drones</h2>
      <br/>

      <Card>
        <Card.Body>
          <Row>
            {droneData.map(data => (
                <Card key={data.drone_id}>
                  <Row><bolt>Drone ID: </bolt>{data.drone_id}</Row>
                  <Row><bolt>Drone Information ID: </bolt>{data.droneinfo_id}</Row>
                  <Row><bolt>Drone Active: </bolt>{data.isactive}</Row>
                  <Row><bolt>Drone Latitude: </bolt>{data.latitude}</Row>
                  <Row><bolt>Drone Longitude: </bolt>{data.longitude}</Row>
                  <Row><bolt>Drone Owner ID: </bolt>{data.owner_id}</Row>
                  <Row><bolt>Drone Serial Number: </bolt>{data.serialnumber}</Row>
                </Card>
              ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default userPanel