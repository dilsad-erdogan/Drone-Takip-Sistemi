import '../ui/panel.css';
import '../global.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiThMenuOutline } from "react-icons/ti";

import SideBar from './sideBar/sideBar';
import Dashboard from './dashboard/dashboard';
import Map from './map/map';
import User from './user/user';
import Drone from './drone/drone';
import DroneBrand from './droneBrand/droneBrand';
import DroneModel from './droneModel/droneModel';
import DroneType from './droneType/droneType';
import UserRoleType from './userRoleType/userRoleType';

import UserAdd from './user/userPanel/userAdd';
import DroneAdd from './drone/dronePanel/droneAdd';
import BrandAdd from './droneBrand/brandPanel/brandAdd';
import ModelAdd from './droneModel/modelPanel/modelAdd';
import TypeAdd from './droneType/typePanel/typeAdd';
import RoleAdd from './userRoleType/rolePanel/roleAdd';

import UserUpdate from './user/userPanel/userUpdate';
import DroneUpdate from './drone/dronePanel/droneUpdate';
import BrandUpdate from './droneBrand/brandPanel/brandUpdate';
import ModelUpdate from './droneModel/modelPanel/modelUpdate';
import TypeUpdate from './droneType/typePanel/typeUpdate';
import RoleUpdate from './userRoleType/rolePanel/roleUpdate';

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
      case 'brand':
        return <DroneBrand></DroneBrand>;
      case 'model':
        return <DroneModel></DroneModel>;
      case 'type':
        return <DroneType></DroneType>;
      case 'roleType':
        return <UserRoleType></UserRoleType>;
      case 'userAdd':
        return <UserAdd></UserAdd>;
      case 'droneAdd':
        return <DroneAdd></DroneAdd>;
      case 'brandAdd':
        return <BrandAdd></BrandAdd>;
      case 'modelAdd':
        return <ModelAdd></ModelAdd>;
      case 'typeAdd':
        return <TypeAdd></TypeAdd>;
      case 'roleAdd':
        return <RoleAdd></RoleAdd>; 
      case 'userUpdate':
        return <UserUpdate></UserUpdate>;
      case 'droneUpdate':
        return <DroneUpdate></DroneUpdate>;
      case 'brandUpdate':
        return <BrandUpdate></BrandUpdate>;
      case 'modelUpdate':
        return <ModelUpdate></ModelUpdate>;
      case 'typeUpdate':
        return <TypeUpdate></TypeUpdate>;
      case 'roleUpdate':
        return <RoleUpdate></RoleUpdate>;             
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
  );
}

export default adminPanel