import { useState, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '/pageFont.png';
import MapModal from '../../ui/commonUsage/mapModal.jsx';
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const containerStyle = {
  width: '100%',
  height: '90vh'
};
  
const center = {
  lat: 38.9639778137207, 
  lng: 35.243247985839844
};

const googleMap = () => {
  const[flightsData, setFlightsData] = useState([]);
  const[clicedDrone, setClicedDrone] = useState([]);
  const[mapModal, setMapModal] = useState(false);
  const[map, setMap] = useState(null);
  const clusterer = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA4Iplfzhel3DioSkxnZjF9bcGXR-ORItw"
  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const flightData = await userModel.getFlightById(localStorage.getItem('userId'));
        
        if(Array.isArray(flightData)) {
          setFlightsData(flightData);
        } else {
          console.error('Hata: getDrones bir dizi döndürmedi.');
        }
      } catch (error) {
        console.error('Error fetching drone data:', error.message);
        console.error('Full error:', error);
      }
    };
  
    fetchData();
  }, [localStorage.getItem('userId')]);

  useEffect(() => {
    if(isLoaded && map){
      if(!clusterer.current){
        clusterer.current = new MarkerClusterer({ map });
      }

      flightsData.forEach(marker => {
        if(marker.is_active){
          const googleMarker = new window.google.maps.Marker({
            map: map,
            position: {
              lat: marker.coordinates.coordinates[0],
              lng: marker.coordinates.coordinates[1]
            },
            icon: {
              url: icon,
              scaledSize: {width: 30, height: 30}
            }
          });

          googleMarker.addListener('click', () => markerClick(marker));
          clusterer.current.addMarker(googleMarker);
        }
      })
    }
  }, [isLoaded, flightsData, map]);

  const closeMapModal = () => {
    setMapModal(false);
  }

  const onLoad = map => {
    setMap(map);
  };

  const markerClick = async (marker) => {
    setClicedDrone(marker);
    setMapModal(true);
  };

  return (
    <>
      <div className="container-fluid">
        {isLoaded ? (
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6} options={{fullscreenControl: false}} onLoad={onLoad}></GoogleMap>
        ) : (
          <p>Harita yükleniyor...</p>
        )}
      </div>

      <MapModal show={mapModal} onClose={closeMapModal} data={clicedDrone}></MapModal>
    </>
  )
}

export default googleMap