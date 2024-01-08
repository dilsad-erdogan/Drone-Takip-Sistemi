import './adminPanel.css';
import '../global.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './sideBar/sideBar';
import Dashboard from './dashboard/dashboard';
import Map from './map/map';
import User from './user/user';
import Drone from './drone/drone';

const adminPanel = ({ screen }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if(!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry, 10))){
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      localStorage.removeItem('userId');
      navigate('/');
    }
  }, [navigate]);

  const content = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard></Dashboard>;
      case 'map':
        return <Map></Map>;
      case 'user':
        return <User></User>;
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
  );
}

export default adminPanel

//Sayfa yönlendirmesini yapıyor bunu console ile görebiliriz 
//ancak sayfada yönlendirme yapamıyorum 