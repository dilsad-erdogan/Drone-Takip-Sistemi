import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search';

const json = [
  {
    permission_id: "1",
    user_id: "1",
    drone_id: "1",
    admin_id: "2",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    is_active: true,
  },
  {
    permission_id: "2",
    user_id: "2",
    drone_id: "2",
    admin_id: "3",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    is_active: true,
  },
  {
    permission_id: "3",
    user_id: "2",
    drone_id: "5",
    admin_id: "1",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    is_active: true,
  },
  {
    permission_id: "4",
    user_id: "3",
    drone_id: "8",
    admin_id: "1",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    is_active: true,
  }
];

const permission = ({ socket }) => {

  const approveButtonClick = (permission_id) => {
    console.log("Onayla");
    json.forEach(flight => {
      if(flight.permission_id === permission_id){
        flight.permission_status = true;
        flight.is_active = false;
        console.log("Burada admin ataması ve izin verilen tarihin de atanması gerçekleşecek.");
      }
    });
  };

  const disapproveButtonClick = (permission_id) => {
    console.log("Onaylama");
    json.forEach(flight => {
      if(flight.permission_id === permission_id){
        flight.permission_status = false;
        flight.is_active = false;
        console.log("Burada admin ataması ve izin verilmeyen tarihin de ataması gerçekleşecek.");
      }
    })
  };

  return (
    <div className="topPanel">
      <div className="top">
        <Search placeholder="Search for a permission"></Search>
      </div>

      <table className='dataTable'>
        <thead>
          <tr>
            <td>User Name</td>
            <td>Drone Serial Number</td>
            <td>Admin Name</td>
            <td>Permission Status</td>
            <td>Permission Date</td>
            <td>Date and Time</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {json && json.map((flight) => (
            <tr key={flight.permission_id}>
              <td>{flight.user_id}</td>
              <td>{flight.drone_id}</td>
              <td>{flight.admin_id}</td>
              <td>{flight.permission_status}</td>
              <td>{flight.permission_date}</td>
              <td>{flight.date_and_time}</td>
              <td>{flight.is_active}</td>
              <td>
                <div className="buttons">
                  <button className="button update" onClick={() => {approveButtonClick(flight.permission_id)}}>Approve</button>

                  <button className="button delete" onClick={() => {disapproveButtonClick(flight.permission_id)}}>Disapprove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default permission