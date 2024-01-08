import './transactions.css';

const transactions = () => {
  return (
    <div className='transactions'>
        <h2 className='transTitle'>Flights</h2>
        <table className='transTable'>
            <thead>
                <tr>
                    <td><b>Name</b></td>
                    <td><b>Code</b></td>
                    <td><b>Pilot Name</b></td>
                    <td><b>Flight Destination</b></td>
                    <td><b>Flight Time</b></td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Drone 1</td>
                    <td>f123</td>
                    <td>Abc Def</td>
                    <td>Ankara</td>
                    <td>14.00</td>
                </tr>
                <tr>
                    <td>Drone 2</td>
                    <td>f234</td>
                    <td>Def Abc</td>
                    <td>Konya</td>
                    <td>15.00</td>
                </tr>
                <tr>
                    <td>Drone 3</td>
                    <td>f345</td>
                    <td>Xyz Def</td>
                    <td>İstanbul</td>
                    <td>16.00</td>
                </tr>
                <tr>
                    <td>Drone 4</td>
                    <td>f456</td>
                    <td>Def Xyz</td>
                    <td>Eskişehir</td>
                    <td>17.00</td>
                </tr>
                
            </tbody>
        </table>
    </div>
  )
}

export default transactions