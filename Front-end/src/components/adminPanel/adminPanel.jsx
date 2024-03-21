import '../ui/panel.css';
import '../global.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiThMenuOutline } from "react-icons/ti";

import SideBar from './sideBar/sideBar';
import Dashboard from './dashboard/dashboard';
import Map from './map/map';
import User from './user/user';
import Pilot from './pilot/pilot';
import Drone from './drone/drone';
import Permissions from './permission/permission';
import DroneBrand from './droneBrand/droneBrand';
import DroneModel from './droneModel/droneModel';
import DroneType from './droneType/droneType';
import UserRoleType from './userRoleType/userRoleType';
import Certificate from './certificate/certificate';
import CertificatePermission from './certificatePermission/certificatePermission';
import Settings from './settings/settings';

import UserAdd from './user/userPanel/userAdd';
import PilotAdd from './pilot/pilotPanel/pilotAdd';
import DroneAdd from './drone/dronePanel/droneAdd';
import FlightAdd from './dashboard/flightAdd';
import BrandAdd from './droneBrand/brandPanel/brandAdd';
import ModelAdd from './droneModel/modelPanel/modelAdd';
import TypeAdd from './droneType/typePanel/typeAdd';
import RoleAdd from './userRoleType/rolePanel/roleAdd';
import CertificateAdd from './certificate/certificatePanel/certificateAdd';

import UserUpdate from './user/userPanel/userUpdate';
import PilotUpdate from './pilot/pilotPanel/pilotUpdate';
import BrandUpdate from './droneBrand/brandPanel/brandUpdate';
import ModelUpdate from './droneModel/modelPanel/modelUpdate';
import TypeUpdate from './droneType/typePanel/typeUpdate';
import RoleUpdate from './userRoleType/rolePanel/roleUpdate';
import CertificateUpdate from './certificate/certificatePanel/certificateUpdate';

const adminPanel = ({ screen, socket }) => {
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
        return <Dashboard socket={socket}></Dashboard>;
      case 'map':
        return <Map></Map>;
      case 'user':
        return <User></User>;
      case 'pilot':
        return <Pilot></Pilot>;
      case 'drone':
        return <Drone></Drone>;
      case 'permissions':
        return <Permissions></Permissions>;
      case 'brand':
        return <DroneBrand></DroneBrand>;
      case 'model':
        return <DroneModel></DroneModel>;
      case 'type':
        return <DroneType></DroneType>;
      case 'roleType':
        return <UserRoleType></UserRoleType>;
      case 'certificate':
        return <Certificate></Certificate>;
      case 'certificatePermission':
        return <CertificatePermission></CertificatePermission>;
      case 'settings':
        return <Settings></Settings>;
      case 'userAdd':
        return <UserAdd></UserAdd>;
      case 'pilotAdd':
        return <PilotAdd></PilotAdd>;
      case 'droneAdd':
        return <DroneAdd></DroneAdd>;
      case 'flightAdd':
        return <FlightAdd socket={socket}></FlightAdd>;
      case 'brandAdd':
        return <BrandAdd></BrandAdd>;
      case 'modelAdd':
        return <ModelAdd></ModelAdd>;
      case 'typeAdd':
        return <TypeAdd></TypeAdd>;
      case 'roleAdd':
        return <RoleAdd></RoleAdd>; 
      case 'certificateAdd':
        return <CertificateAdd></CertificateAdd>;
      case 'userUpdate':
        return <UserUpdate></UserUpdate>;
      case 'pilotUpdate':
        return <PilotUpdate></PilotUpdate>;
      case 'brandUpdate':
        return <BrandUpdate></BrandUpdate>;
      case 'modelUpdate':
        return <ModelUpdate></ModelUpdate>;
      case 'typeUpdate':
        return <TypeUpdate></TypeUpdate>;
      case 'roleUpdate':
        return <RoleUpdate></RoleUpdate>;
      case 'certificateUpdate':
        return <CertificateUpdate></CertificateUpdate>;
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