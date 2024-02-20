import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import SignIn from './components/signInPage/signIn';
import SignUp from './components/signUpPage/signUp';
import ForgotPassword from './components/signInPage/forgotPassword';
import UserPanel from './components/userPanel/userPanel';
import AdminPanel from './components/adminPanel/adminPanel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route path="/admin" element={<AdminPanel screen="dashboard"/>} />
        <Route path="/admin/map" element={<AdminPanel screen="map"/>} />
        <Route path="/admin/user" element={<AdminPanel screen="user"/>} />
        <Route path="/admin/drone" element={<AdminPanel screen="drone"/>} />
        <Route path="/admin/drone-brand" element={<AdminPanel screen="brand"/>} />
        <Route path="/admin/drone-model" element={<AdminPanel screen="model"/>} />
        <Route path="/admin/drone-type" element={<AdminPanel screen="type"/>} />
        <Route path="/admin/user-roleType" element={<AdminPanel screen="roleType"/>} />

        <Route path="/admin/userAdd" element={<AdminPanel screen="userAdd"/>} />
        <Route path="/admin/droneAdd" element={<AdminPanel screen="droneAdd"/>} />
        <Route path='/admin/flightAdd' element={<AdminPanel screen="flightAdd"/>} />
        <Route path="/admin/brandAdd" element={<AdminPanel screen="brandAdd"/>} />
        <Route path="/admin/modelAdd" element={<AdminPanel screen="modelAdd"/>} />
        <Route path="/admin/typeAdd" element={<AdminPanel screen="typeAdd"/>} />
        <Route path="/admin/roleAdd" element={<AdminPanel screen="roleAdd"/>} />

        <Route path="/admin/userUpdate/:id" element={<AdminPanel screen="userUpdate"/>} />
        <Route path="/admin/brandUpdate/:id" element={<AdminPanel screen="brandUpdate"/>} />
        <Route path="/admin/modelUpdate/:id" element={<AdminPanel screen="modelUpdate"/>} />
        <Route path="/admin/typeUpdate/:id" element={<AdminPanel screen="typeUpdate"/>} />
        <Route path="/admin/roleUpdate/:id" element={<AdminPanel screen="roleUpdate"/>} />
          
        <Route path="/user" element={<UserPanel screen="panel"/>} />
        <Route path="/user/map" element={<UserPanel screen="map"/>} />
        <Route path="/user/drone" element={<UserPanel screen="drone"/>} />
        <Route path="/user/droneAdd" element={<UserPanel screen="droneAdd"/>} />

      </Routes>
      {/* Linkte yapılan bir değişiklikte hangi sayfanın açılacağının ayarlanacağı yönlendirmeler. */}
    </Router>
  );
}

export default App;
