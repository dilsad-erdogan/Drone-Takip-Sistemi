import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import MenuLink from './menuLink/menuLink';
import { MdOutlineDashboard } from "react-icons/md";
import { FaMapMarked } from "react-icons/fa";
import { TbDrone } from "react-icons/tb";
import { IoSettingsOutline, IoHelp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "My Panel",
        path: "/user",
        icon: <MdOutlineDashboard></MdOutlineDashboard>
      },
      {
        title: "My Drone",
        path: "/user/drone",
        icon: <TbDrone></TbDrone>
      },
      {
        title: "Map",
        path: "/user/map",
        icon: <FaMapMarked></FaMapMarked>
      }
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "#",
        icon: <IoSettingsOutline></IoSettingsOutline>
      },
      {
        title: "Help",
        path: "#",
        icon: <IoHelp></IoHelp>
      }
    ],
  },
];

const sidebar = () => {
  const navigate = useNavigate();
  const logoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    navigate('/');
  };

  return (
    <div className="sideBar">
      <div className="user">
        <img className="userImage" src='/noUser.png' alt='' width='50' height='50'></img>
        <div className="userDetail">
          <span className="userName">Dilşad Erdoğan</span>
          <span className="userTitle">User</span>
        </div>
      </div>
      <ul className="list">
        {menuItems.map((item) => (
          <li key={item.title}>
            <span className="item">{item.title}</span>
            {item.list.map((data) => (
              <MenuLink data={data} key={data.title}></MenuLink>
            ))}
          </li>
        ))}
      </ul>
      <button className="logout" onClick={logoutClick}>
        <FiLogOut></FiLogOut>
        Logout
      </button>
    </div>
  );
}

export default sidebar