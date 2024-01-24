import { useNavigate } from 'react-router-dom';
import MenuLink from '../../ui/commonUsage/menuLink.jsx';
import '../../ui/panel.css';
import { MdOutlineDashboard } from "react-icons/md";
import { FaMapMarked } from "react-icons/fa";
import { TbDrone } from "react-icons/tb";
import { IoSettingsOutline, IoHelp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import UserModel from '../../../../../Back-end/connections/user.js';
import { useEffect, useState } from 'react';
const userModel = new UserModel();

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
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const logoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userId');
    navigate('/');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const userData = await userModel.getUserById(localStorage.getItem('userId'));
        setUser(userData);
      } catch(error){
        console.error('Hata:', error.messaga);
      }
    };

    if(localStorage.getItem('userId')){
      fetchUser();
    }
  }, [localStorage.getItem('userId')]);

  return (
    <div className="sideBar">
      <div className="user">
        <img className="userImage" src='/noUser.png' alt='' width='50' height='50'></img>
        <div className="userDetail">
          <span className="userName">{user.name}</span>
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