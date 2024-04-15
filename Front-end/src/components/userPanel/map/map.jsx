import { useState, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '/dronePic.png';
import MapModal from '../../ui/commonUsage/mapModal.jsx';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();
import FlightModel from '../../../../../Back-end/connections/flight.js';
const flightModel = new FlightModel();

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

  useEffect(() => {  
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

  useEffect(() => {
    const interval = setInterval(() => {
      clusterer.current.clearMarkers();
      
      flightsData.forEach(flight => {
        const startPoint = flight.startPoint.coordinates;
        const endPoint = flight.endPoint.coordinates;
        const distanceX = endPoint[0] - startPoint[0];
        const distanceY = endPoint[1] - startPoint[1];
        const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const step = 0.001;

        const newCoordinates = {
          coordinates: {
            type: "Point",
            //coordinates: [flight.coordinates.coordinates[0]+1, flight.coordinates.coordinates[1]+1]
            coordinates: [flight.coordinates.coordinates[0] + (distanceX / totalDistance) * step, flight.coordinates.coordinates[1] + (distanceY / totalDistance) * step]
          }
        };

        flightModel.updateFlight(flight._id, newCoordinates).then(() => {
          console.log("updated coordinates");

          // Eski ve yeni koordinatlar arasında bir çizgi oluştur
          const flightPath = new window.google.maps.Polyline({
            path: [
              { lat: flight.coordinates.coordinates[0], lng: flight.coordinates.coordinates[1] },
              { lat: newCoordinates.coordinates.coordinates[0], lng: newCoordinates.coordinates.coordinates[1] }
            ],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

          // Çizgiyi haritaya ekle
          flightPath.setMap(map);
        }).catch((error) => {
          console.error('Error:', error);
        });
      });

      fetchData();
    }, 30000); //yarı Dakika başı güncelleme

    return () => clearInterval(interval);
  }, [flightsData]);
  //Airsim algoritması

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