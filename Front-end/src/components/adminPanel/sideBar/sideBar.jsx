import { MdOutlineDashboard, MdOutlineMergeType } from "react-icons/md";
import { FaMapMarked, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { TbDrone, TbBrandAppgallery, TbBoxModel2 } from "react-icons/tb";
import { VscTypeHierarchy } from "react-icons/vsc";
import { IoSettingsOutline, IoHelp } from "react-icons/io5";
import MenuLink from '../../ui/commonUsage/menuLink.jsx';
import '../../ui/panel.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import UserModel from '../../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: <MdOutlineDashboard></MdOutlineDashboard>,
      },
      {
        title: "Users",
        path: "/admin/user",
        icon: <FaUser></FaUser>
      },
      {
        title: "Drones",
        path: "/admin/drone",
        icon: <TbDrone></TbDrone>
      },
      {
        title: "Map",
        path: "/admin/map",
        icon: <FaMapMarked></FaMapMarked>
      },
    ],
  },
  {
    title: "Database Features",
    list: [
      {
        title: "Drone Brand",
        path: "/admin/drone-brand",
        icon: <TbBrandAppgallery></TbBrandAppgallery>
      },
      {
        title: "Drone Model",
        path: "/admin/drone-model",
        icon: <TbBoxModel2></TbBoxModel2>
      },
      {
        title: "Drone Type",
        path: "/admin/drone-type",
        icon: <VscTypeHierarchy></VscTypeHierarchy>
      },
      {
        title: "User Role Type",
        path: "/admin/user-roleType",
        icon: <MdOutlineMergeType></MdOutlineMergeType>
      },
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

const SideBar = () => {
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
      try {
        const userData = await userModel.getUserById(localStorage.getItem('userId'));
        setUser(userData);
      } catch (error) {
        console.error('Hata:', error.message);
      }
    };
  
    // Sadece userId değiştiğinde fetchUser fonksiyonunu çağır
    if (localStorage.getItem('userId')) {
      fetchUser();
    }
  }, [localStorage.getItem('userId')]); // userId değiştiğinde useEffect'i çalıştır

  return (
    <div className="sideBar">
      <div className="user">
        <img className="userImage" src='/noUser.png' alt='' width='50' height='50'></img>
        <div className="userDetail">
          <span className="userName">{user.name}</span>
          <span className="userTitle">Admin</span>
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
};

export default SideBar;
