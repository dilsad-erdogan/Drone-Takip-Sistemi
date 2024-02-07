import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '/pageFont.png';
import MapModal from '../../ui/commonUsage/mapModal.jsx';
import DroneModel from '../../../../../Back-end/connections/drone.js';
const droneModel = new DroneModel();

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
  const [clicedDrone, setClicedDrone] = useState([]);
  const[mapModal, setMapModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const dronesData = await droneModel.allDrone();
  
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

  const closeMapModal = () => {
    setMapModal(false);
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCikvnBT7o7eo62eqUnjjx8oMiCcm21k6I"
  });

  const customIcon = {
    url: icon
  };

  const onLoad = map => {
    droneData.map(marker =>{
      if(marker.is_active === true){
        const googleMarker = new window.google.maps.Marker({
          position: {
            lat: marker.latitude,
            lng: marker.longitude
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
    setMapModal(true);
  };

  return (
    <>
      <div className="container-fluid">
        {isLoaded ? (<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6} onLoad={onLoad}></GoogleMap>) : (<p>Harita yükleniyor...</p>)}
      </div>

      <MapModal show={mapModal} onClose={closeMapModal} data={clicedDrone}></MapModal>
    </>
  )
}

export default googleMap