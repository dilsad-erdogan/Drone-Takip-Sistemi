import './transactions.css';

const transactions = () => {
  return (
    <div className='transactions'>
      <h2 className='transTitle'>My Flights</h2>
      <table className='transTable'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Code</td>
            <td>Pilot Name</td>
            <td>Flight Destination</td>
            <td>Flight Time</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Drone 1</td>
            <td>d123</td>
            <td>Asd Fgh</td>
            <td>Ankara</td>
            <td>20.30</td> 
          </tr>
          <tr>
            <td>Drone 2</td>
            <td>d456</td>
            <td>Fgh Jkl</td>
            <td>Konya</td>
            <td>17.45</td> 
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default transactions