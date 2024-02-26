import '../../ui/panel.css';
import Search from '../../ui/commonUsage/search';

const json = [
  {
    permission_id: "1",
    owner_id: "1",
    pilot_id: "2",
    drone_id: "1",
    admin_id: "2",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    coordinate: null,
    is_active: true,
  },
  {
    permission_id: "2",
    owner_id: "2",
    pilot_id: "2",
    drone_id: "2",
    admin_id: "3",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    coordinate: null,
    is_active: true,
  },
  {
    permission_id: "3",
    owner_id: "2",
    pilot_id: "2",
    drone_id: "5",
    admin_id: "1",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    coordinate: null,
    is_active: true,
  },
  {
    permission_id: "4",
    owner_id: "3",
    pilot_id: "2",
    drone_id: "8",
    admin_id: "1",
    permission_status: false,
    permission_date: "",
    date_and_time: null,
    coordinate: null,
    is_active: true,
  }
];


const permission = ({ socket }) => {
  return (
    <div className='topPanel'>
      <div className="top">
        <Search placeholder="Search for a permission"></Search>
      </div>
      
      <div className="permissionsCard">
        {json && json.map((flight) => (
          <div key={flight.permission_id} className='permissionCard'>
            {flight.admin_id}
          </div>
        ))}
      </div>
    </div>
  )
}

export default permission