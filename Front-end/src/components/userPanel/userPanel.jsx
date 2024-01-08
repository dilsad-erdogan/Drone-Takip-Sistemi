import '../global.css';
import './userPanel.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './sidebar/sidebar';
import Dashboard from './dashboard/dashboard';
import Map from './map/map';
import Drone from './drone/drone';

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
      default:
        return null;
    }
  };

  return (
    <div className='body'>
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