import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '../../../../public/pageFont.png';
import MapModal from '../../ui/commonUsage/mapModal.jsx';
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
  const[clicedDrone, setClicedDrone] = useState([]);
  const[mapModal, setMapModal] = useState(false);

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

  const closeMapModal = () => {
    setMapModal(false);
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA4Iplfzhel3DioSkxnZjF9bcGXR-ORItw"
  });

  const customIcon = {
    url: icon
  };

  const onLoad = map => {
    console.log(droneData);
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
        
        googleMarker.addListener('click', () => {markerClick(marker.drone)});
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