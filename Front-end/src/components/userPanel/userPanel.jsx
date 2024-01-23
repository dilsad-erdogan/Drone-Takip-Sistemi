import '../global.css';
import '../ui/panel.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiThMenuOutline } from "react-icons/ti";

import SideBar from './sidebar/sidebar';
import Dashboard from './dashboard/dashboard';
import Map from './map/map';
import Drone from './drone/drone';
import DroneAdd from './drone/dronePanel/droneAdd';
import DroneUpdate from './drone/dronePanel/droneUpdate';

const userPanel = ({ screen }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if(!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry, 10))){
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      navigate('/');
    }
  }, [navigate]);

  const content = () => {
    switch (screen) {
      case 'panel':
        return <Dashboard></Dashboard>;
      case 'map':
        return <Map></Map>;
      case 'drone':
        return <Drone></Drone>;
      case 'droneAdd':
        return <DroneAdd></DroneAdd>;
      case 'droneUpdate':
        return <DroneUpdate></DroneUpdate>;
      default:
        return null;
    }
  };

  const toggleSideBar = () => {
    const body = document.querySelector('.body');
    body.classList.toggle('active');
  }

  return (
    <div className='body'>
      <div className='toggle-button' onClick={toggleSideBar}>
        <TiThMenuOutline></TiThMenuOutline>
      </div>

      <div className='menu'>
        <SideBar></SideBar>
      </div>

      <div className='content'>
        {content()}
      </div>
    </div>
  )
}

export default userPanel