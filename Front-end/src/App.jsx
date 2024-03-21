import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import SignIn from './components/signInPage/signIn';
import SignUp from './components/signUpPage/signUp';
import ForgotPassword from './components/signInPage/forgotPassword';
import UserPanel from './components/userPanel/userPanel';
import AdminPanel from './components/adminPanel/adminPanel';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route path="/admin" element={<AdminPanel screen="dashboard" socket={socket}/>} />
        <Route path="/admin/map" element={<AdminPanel screen="map" socket={socket}/>} />
        <Route path="/admin/user" element={<AdminPanel screen="user" socket={socket}/>} />
        <Route path="/admin/pilot" element={<AdminPanel screen="pilot" socket={socket}/>} />
        <Route path="/admin/drone" element={<AdminPanel screen="drone" socket={socket}/>} />
        <Route path="/admin/permissions" element={<AdminPanel screen="permissions" socket={socket}/>} />
        <Route path='/admin/settings' element={<UserPanel screen="settings" socket={socket}/>} />

        <Route path="/admin/drone-brand" element={<AdminPanel screen="brand" socket={socket}/>} />
        <Route path="/admin/drone-model" element={<AdminPanel screen="model" socket={socket}/>} />
        <Route path="/admin/drone-type" element={<AdminPanel screen="type" socket={socket}/>} />
        <Route path="/admin/user-roleType" element={<AdminPanel screen="roleType" socket={socket}/>} />
        <Route path="/admin/certificate" element={<AdminPanel screen="certificate" socket={socket}/>} />
        <Route path="/admin/certificatePermission" element={<AdminPanel screen="certificatePermission" socket={socket}/>} />

        <Route path="/admin/userAdd" element={<AdminPanel screen="userAdd" socket={socket}/>} />
        <Route path="/admin/pilotAdd" element={<AdminPanel screen="pilotAdd" socket={socket}/>} />
        <Route path="/admin/droneAdd" element={<AdminPanel screen="droneAdd" socket={socket}/>} />
        <Route path='/admin/flightAdd' element={<AdminPanel screen="flightAdd" socket={socket}/>} />
        <Route path="/admin/brandAdd" element={<AdminPanel screen="brandAdd" socket={socket}/>} />
        <Route path="/admin/modelAdd" element={<AdminPanel screen="modelAdd" socket={socket}/>} />
        <Route path="/admin/typeAdd" element={<AdminPanel screen="typeAdd" socket={socket}/>} />
        <Route path="/admin/roleAdd" element={<AdminPanel screen="roleAdd" socket={socket}/>} />
        <Route path="/admin/certificateAdd" element={<AdminPanel screen="certificateAdd" socket={socket}/>} />

        <Route path="/admin/userUpdate/:id" element={<AdminPanel screen="userUpdate" socket={socket}/>} />
        <Route path="/admin/pilotUpdate/:id" element={<AdminPanel screen="pilotUpdate" socket={socket}/>} />
        <Route path="/admin/brandUpdate/:id" element={<AdminPanel screen="brandUpdate" socket={socket}/>} />
        <Route path="/admin/modelUpdate/:id" element={<AdminPanel screen="modelUpdate" socket={socket}/>} />
        <Route path="/admin/typeUpdate/:id" element={<AdminPanel screen="typeUpdate" socket={socket}/>} />
        <Route path="/admin/roleUpdate/:id" element={<AdminPanel screen="roleUpdate" socket={socket}/>} />
        <Route path="/admin/certificateUpdate/:id" element={<AdminPanel screen="certificateUpdate" socket={socket}/>} />

        <Route path="/user" element={<UserPanel screen="panel" socket={socket}/>} />
        <Route path="/user/map" element={<UserPanel screen="map" socket={socket}/>} />
        <Route path="/user/drone" element={<UserPanel screen="drone" socket={socket}/>} />
        <Route path="/user/permissions" element={<UserPanel screen="permissions" socket={socket}/>} />
        <Route path="/user/droneAdd" element={<UserPanel screen="droneAdd" socket={socket}/>} />
        <Route path='/user/flightAdd' element={<UserPanel screen="flightAdd" socket={socket}/>} />
        <Route path='/user/settings' element={<UserPanel screen="settings" socket={socket}/>} />

      </Routes>
      {/* Linkte yapılan bir değişiklikte hangi sayfanın açılacağının ayarlanacağı yönlendirmeler. */}
    </Router>
  );
}

export default App;
