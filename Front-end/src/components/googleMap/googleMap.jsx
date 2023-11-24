import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '/pageFont.png';
import { Modal, Row } from 'react-bootstrap';

const containerStyle = {
    width: '100%',
    height: '90vh'
};
  
const center = {
    lat: 38.9639778137207, 
    lng: 35.243247985839844
};

const googleMap = () => {
    const [markers, setMarkers] = useState([]);
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
        markers.forEach(marker => {
          const googleMarker = new window.google.maps.Marker({
            position: {
                lat: marker.latitude,
                lng: marker.longitude
            },
            map: map,
            icon: customIcon
          });
    
          googleMarker.addListener('click', () => {markerClick(marker)});
        });
    };

    const fetchData = async() => {
        try{
            const response = await fetch('http://localhost:3000/api/v1/drones');

            if(!response.ok){
                throw new Error('API isteği başarısız oldu.');
            }

            const data = await response.json();
            setMarkers(data);
        }catch (error){
            console.log("Hata: ", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                <Modal.Header closeButton>Drone'in seri numarası: {clicedDrone.serialnumber}</Modal.Header>

                <Modal.Body>
                        <Row>Drone id'si: {clicedDrone.drone_id}</Row>
                        <Row>Drone latitude: {clicedDrone.latitude}</Row>
                        <Row>Drone longitude: {clicedDrone.longitude}</Row>
                        <Row>Drone sahibi: {clicedDrone.owner_id}</Row>
                        <Row>Drone aktifliği: {clicedDrone.isactive}</Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default googleMap