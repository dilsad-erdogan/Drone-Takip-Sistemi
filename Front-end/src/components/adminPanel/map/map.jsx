import { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import icon from '/drone.png';
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

  useEffect(() => {
    if (isLoaded && map) {
      if(!clusterer.current){
        clusterer.current = new MarkerClusterer({ map });
      }

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
              scaledSize: {width: 30, height: 30}
            }
          });
          
          googleMarker.addListener('click', () => markerClick(marker));
          clusterer.current.addMarker(googleMarker);
        }
      });
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
            coordinates: [flight.coordinates.coordinates[0] + (distanceX / totalDistance) * step, flight.coordinates.coordinates[1] + (distanceY / totalDistance) * step]
          }
        };

        flightModel.updateFlight(flight._id, newCoordinates).then(() => {
          console.log("updated coordinates");

          if(flight.flightPath){
            flight.flightPath.setMap(null);
          }

          // Eski ve yeni koordinatlar arasında bir çizgi oluştur
          const flightPath = new window.google.maps.Polyline({
            path: [
              { lat: flight.startPoint.coordinates[0], lng: flight.startPoint.coordinates[1] },
              { lat: newCoordinates.coordinates.coordinates[0], lng: newCoordinates.coordinates.coordinates[1] }
            ],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

          // Çizgiyi haritaya ekle
          flightPath.setMap(map);

          if(Math.abs(newCoordinates.coordinates.coordinates[0] - endPoint[0]) < step && Math.abs(newCoordinates.coordinates.coordinates[1] - endPoint[1]) < step) {
            alert("Uçuş hedef noktasına ulaştı.");
          }
        }).catch((error) => {
          console.error('Error:', error);
        });

        // const newEndPoint = {
        //   endPoint: {
        //     type: "Point",
        //     coordinates: [flight.coordinates.coordinates[0], flight.coordinates.coordinates[1]]
        //   }
        // };

        // flightModel.updateEndFlight(flight._id, newEndPoint).then(() => {
        //   alert(`${flight.drone_id}, seri numaralı drone hedefine ulaştı.`);
        // });
      });

      fetchData();
    }, 30000); //yarı Dakika başı güncelleme

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
