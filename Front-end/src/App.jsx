import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import SignIn from './components/signInPage/signIn';
import SignUp from './components/signUpPage/signUp';
import UserPanel from './components/userPanel/userPanel';
import AdminPanel from './components/adminPanel/adminPanel';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar header">
          <div className="container-fluid">
            <Link className="navbar-brand mainPage active" style={{color: '#b7bac1'}} to="/">Ana Sayfa</Link>

            <div className="d-flex">
              <Link className="btn btn-outline-light" to="/signIn">Giriş Yap</Link>
              <Link className="btn btn-outline-light" to="/signUp" style={{ marginLeft: 5 }}>Kayıt Ol</Link>
            </div>
          </div>
        </nav>
        {/* Ana sayfaya yönlendirme linki ve sayfanın sağ tarafına yapışık sign in ve sign up buton linkleri */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/admin" element={<AdminPanel screen="dashboard"/>} />
          <Route path="/admin/map" element={<AdminPanel screen="map"/>} />
          <Route path="/admin/user" element={<AdminPanel screen="user"/>} />
          <Route path="/admin/drone" element={<AdminPanel screen="drone"/>} />
          <Route path="/user" element={<UserPanel screen="panel"/>} />
          <Route path="/user/map" element={<UserPanel screen="map"/>} />
          <Route path="/user/drone" element={<UserPanel screen="drone"/>} />
        </Routes>

        {/* Linkte yapılan bir değişiklikte hangi sayfanın açılacağının ayarlanacağı yönlendirmeler. */}
      </div>
    </Router>
  );
}

export default App;
