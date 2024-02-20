import { useEffect, useState } from 'react';
import '../panel.css'
import { useNavigate } from 'react-router-dom';

const transactions = ({socket}) => {
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        socket.on('flights', (data) => {
            setFlights(data);
        });
    });

    const addNewFlight = () => {
        navigate('/admin/flightAdd');
    }
    
    return (
        <div className='transactions'>
            <div className='top'>
                <h2 className='transTitle'>Flights</h2>
                <button className='btn btn-outline-light'onClick={() => {addNewFlight()}}>Add New Flight</button>
            </div>
  
            <table className='transTable'>
                <thead>
                    <tr>
                        <td><b>Flight Number</b></td>
                        <td><b>Start Point</b></td>
                        <td><b>End Point</b></td>
                        <td><b>Created At</b></td>
                        <td><b>Updated At</b></td>
                        <td><b>Coordinates</b></td>
                    </tr>
                </thead>

                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight._id}>
                            <td>{flight.flight_number}</td>
                            <td>{flight.startPoint}</td>
                            <td>{flight.endPoint}</td>
                            <td>{flight.createdAt}</td>
                            <td>{flight.updatedAt}</td>
                            <td>{flight.coordinates.coordinates}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default transactions