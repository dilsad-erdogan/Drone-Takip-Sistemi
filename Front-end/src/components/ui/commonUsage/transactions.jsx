import '../panel.css'
import { useNavigate } from 'react-router-dom';

const transactions = ({ flights }) => {
    const navigate = useNavigate();

    const addNewFlight = () => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.endsWith('/admin') ? '/admin/flightAdd' : '/user/flightAdd';
        navigate(newPath);
    }
    
    return (
        <div className='transactions'>
            <div className='top'>
                <h2 className='transTitle'>Flights</h2>
                <button className='btn btn-outline-light' onClick={() => {addNewFlight()}}>Add New Flight</button>
            </div>
  
            <table className='dataTable'>
                <thead>
                    <tr>
                        <td>Flight Number</td>
                        <td>Owner</td>
                        <td>Pilot</td>
                        <td>Drone</td>
                        <td>Coordinates</td>
                        <td>Created At</td>
                    </tr>
                </thead>

                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight._id}>
                            <td>{flight.flight_number}</td>
                            <td>{flight.owner_id}</td>
                            <td>{flight.pilot_id}</td>
                            <td>{flight.drone_id}</td>
                            <td>{flight.coordinates.coordinates[0] + '-' + flight.coordinates.coordinates[0]}</td>
                            <td>{flight.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default transactions