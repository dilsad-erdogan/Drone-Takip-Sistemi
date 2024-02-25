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
  return (
    <div className='topPanel'>
      <div className="top">
        <Search placeholder="Search for a permission"></Search>
      </div>
      
    </div>
  )
}

export default permission