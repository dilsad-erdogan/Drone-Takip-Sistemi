import React, { useEffect, useState } from 'react';
import { Row, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DroneModel from '../../../../Back-end/models/drone.js';
const droneModel = new DroneModel();

const userPanel = ({}) => {
  const [droneData, setDroneData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //Token kontrolü
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if(!token || !tokenExpiry){
      navigate('/'); //token yoksa eğer localStorage de anasayfaya yönlendiriyor kullanıcıyı
    }else{
      const currentTime = Date.now();

      if(currentTime > parseInt(tokenExpiry)){
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        navigate('/'); //eğer zaman biterse yine kullanıcıyı ana sayfaya yönlendiriyor 
      }else{
        droneModel.fetchDroneData().then(() => {
          setDroneData(droneModel.getDrone());
        });
        //eğer kullanıcı süresi halen daha devam ediyorsa droneModel ile drone bilgileri alınıyor ve setDroneData değerine bütün drone bilgileri ekleniyor.
      }
    }
  }, [navigate]);
  //useEffect sayfa yüklendiğinde direkt çalışmaya başlar

  return (
    <>
      <div>
        <h2>Drones</h2>
        <br/>

        <Card>
          <Card.Body>
            <Row>
              {droneData.map(drone => (
                  <Card key={drone.drone_id}>
                    <Row><bolt>Drone ID: </bolt>{drone.drone_id}</Row>
                    <Row><bolt>Drone Information ID: </bolt>{drone.droneinfo_id}</Row>
                    <Row><bolt>Drone Active: </bolt>{drone.isactive}</Row>
                    <Row><bolt>Drone Latitude: </bolt>{drone.latitude}</Row>
                    <Row><bolt>Drone Longitude: </bolt>{drone.longitude}</Row>
                    <Row><bolt>Drone Owner ID: </bolt>{drone.owner_id}</Row>
                    <Row><bolt>Drone Serial Number: </bolt>{drone.serialnumber}</Row>
                  </Card>
                ))}
            </Row>
          </Card.Body>
        </Card>
      </div>
      {/* droneData modelinden alınan bilgiler tek tek card bileşenlerinde sayfaya aktarılıyor */}
    </>
  )
}

export default userPanel