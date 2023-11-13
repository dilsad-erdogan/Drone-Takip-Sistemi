import React, { useState } from 'react';
import './App.css';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import ComponentNavbar from './components/navbar/navbar.jsx';

const containerStyle = {
  width: '100%',
  height: '90vh'
};

const center = {
  lat: 38.9639778137207, 
  lng: 35.243247985839844
}

function App() {
  const [markers, setMarkers] = useState([
    {position: {lat: 38.02676, lng: 32.51030}},
    {position: {lat: 37.23526574584819, lng: 32.123123047764885}}
  ]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCikvnBT7o7eo62eqUnjjx8oMiCcm21k6I"
  });

  const markerClick = async (markerPosition) => {
    console.log("Marker clicked at position: ", markerPosition);

    try{
      const response = await fetch('http://localhost:3000/api/v1/users');

      if(!response.ok){
        throw new Error('API isteği başarısız oldu.');
      }

      const userData = await response.json();
      console.log(userData);
      // userData.forEach(data => {
      //   console.log("Name: ", data.name, "Email: ", data.email);
      // });
    }
    catch(error){
      console.log("Hata", error.message);
    }
  };

  const onLoad = map => {
    markers.forEach(marker => {
      const googleMarker = new window.google.maps.Marker({
        position: marker.position,
        map: map,
      });

      googleMarker.addListener('click', () => {markerClick(marker.position)});
    });
  };

  return(
    <>
      <ComponentNavbar></ComponentNavbar>
      <div class="container-fluid">
        {isLoaded ? (<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6} onLoad={onLoad}></GoogleMap>) : (<p>Harita yükleniyor...</p>)}
      </div>
    </>
  )
}

export default App