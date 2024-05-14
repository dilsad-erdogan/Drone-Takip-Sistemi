import { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '/dronePic.png';
import MapModal from '../../ui/commonUsage/mapModal.jsx';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
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
  const [flightsData, setFlightsData] = useState([]);
  const [clickedDrone, setClickedDrone] = useState(null);
  const [mapModal, setMapModal] = useState(false);
  const [map, setMap] = useState(null);
  const clusterer = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA4Iplfzhel3DioSkxnZjF9bcGXR-ORItw'
  });

  const fetchData = async () => {
    try {
      await flightModel.fetchFlightData();
      const flights = flightModel.getFlights();

      if (Array.isArray(flights.message)) {
        setFlightsData([]);
        setFlightsData(flights.message);
      } else {
        console.error('Hata: getFlights bir dizi döndürmedi.');
      }
    } catch (error) {
      console.error('Error fetching drone data:', error.message);
      console.error('Full error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateClusterer = () => {
    clusterer.current.clearMarkers();
    flightsData.forEach(marker => {
      if (marker.is_active) {
        const googleMarker = new window.google.maps.Marker({
          map: map,
          position: {
            lat: marker.coordinates.coordinates[0],
            lng: marker.coordinates.coordinates[1]
          },
          icon: {
            url: icon,
            scaledSize: {width: 40, height: 40}
          }
        });
  
        googleMarker.addListener('click', () => markerClick(marker));
        clusterer.current.addMarker(googleMarker);
      }
    });
  };

  useEffect(() => {
    if (isLoaded && map) {
      if (!clusterer.current) {
        clusterer.current = new MarkerClusterer({ map });
      }
  
      updateClusterer();
    }
  }, [isLoaded, flightsData, map]);

  useEffect(() => {
    const interval = setInterval(async () => {
      clusterer.current.clearMarkers();

      flightsData.forEach(async flight => {
        const startPoint = flight.startPoint.coordinates;
        const endPoint = flight.endPoint.coordinates;
        const distanceX = endPoint[0] - startPoint[0];
        const distanceY = endPoint[1] - startPoint[1];
        const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const step = 0.001;
  
        const newCoordinates = {
          coordinates: {
            type: "Point",
            coordinates: [flight.coordinates.coordinates[0] + (distanceX / totalDistance) * step, flight.coordinates.coordinates[1] + (distanceY / totalDistance) * step]
          }
        };
  
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

        if (Math.abs(newCoordinates.coordinates.coordinates[0] - endPoint[0]) < step && Math.abs(newCoordinates.coordinates.coordinates[1] - endPoint[1]) < step) {
          await flightModel.updateEndFlight(flight._id);
        } else {
          flightModel.updateFlight(flight._id, newCoordinates).then(() => {
            // Çizgiyi haritaya ekle
            flightPath.setMap(map);
          }).catch((error) => {
            console.error('Error:', error);
          });
        }
  
        clusterer.current.addMarker(new window.google.maps.Marker({
          map: map,
          position: { lat: newCoordinates.coordinates.coordinates[0], lng: newCoordinates.coordinates.coordinates[1] }
        }));
      });
  
      updateClusterer();
      fetchData();
    }, 500); //0,5 saniyede bir güncelleme
  
    return () => clearInterval(interval);
  }, [flightsData]);  
  //Airsim algoritması

  const closeMapModal = () => {
    setMapModal(false);
  };

  const onLoad = map => {
    setMap(map);
  };

  const markerClick = (marker) => {
    setClickedDrone(marker);
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

      <MapModal show={mapModal} onClose={closeMapModal} data={clickedDrone}></MapModal>
    </>
  );
};

export default googleMap;