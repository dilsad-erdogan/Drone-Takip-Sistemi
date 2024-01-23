import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '/pageFont.png';
import { Modal, Row } from 'react-bootstrap';
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const containerStyle = {
  width: '100%',
  height: '90vh'
};
  
const center = {
  lat: 38.9639778137207, 
  lng: 35.243247985839844
};

const googleMap = () => {
  const[droneData, setDroneData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const dronesData = await userModel.getDroneById(localStorage.getItem('userId'));
  
        if(Array.isArray(dronesData)) {
          setDroneData(dronesData);
        } else {
          console.error('Hata: getDrones bir dizi döndürmedi.');
        }
      } catch (error) {
        console.error('Error fetching drone data:', error.message);
        console.error('Full error:', error);
      }
    };
  
    fetchData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [clicedDrone, setClicedDrone] = useState([]);
    
  const handleCloseModal = () => {
      setShowModal(false);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCikvnBT7o7eo62eqUnjjx8oMiCcm21k6I"
  });

  const customIcon = {
    url: icon
  };

  const onLoad = map => {
    droneData.map(marker =>{
      if(marker.drone.is_active === true){
        const googleMarker = new window.google.maps.Marker({
          position: {
            lat: marker.drone.latitude,
            lng: marker.drone.longitude
          },
          map: map,
          icon: customIcon
        });
        
        googleMarker.addListener('click', () => {markerClick(marker)});
      }
    });
  };

  const markerClick = async (marker) => {
    setClicedDrone(marker);
    setShowModal(true);
  };

  return (
    <>
      <div className="container-fluid">
        {isLoaded ? (<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6} onLoad={onLoad}></GoogleMap>) : (<p>Harita yükleniyor...</p>)}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          Drone seri numarası: {clicedDrone.serial_number}
        </Modal.Header>

        <Modal.Body>
          <Row>Drone id: {clicedDrone.drone_id}</Row>
          <Row>Drone latitude: {clicedDrone.latitude}</Row>
          <Row>Drone longitude: {clicedDrone.longitude}</Row>
          <Row>Drone sahibi: {clicedDrone.owner_id}</Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default googleMap