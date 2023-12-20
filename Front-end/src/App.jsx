import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import SignIn from './components/signInPage/signIn';
import SignUp from './components/signUpPage/signUp';
import UserPanel from './components/userPanel/userPanel';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand active" to="/">Ana Sayfa</Link>

            <div className="d-flex">
              <Link className="btn btn-outline-danger" to="/signIn">Sign In</Link>
              <Link className="btn btn-outline-danger" to="/signUp" style={{ marginLeft: 5 }}>Sign Up</Link>
            </div>
          </div>
        </nav>
        {/* Ana sayfaya yönlendirme linki ve sayfanın sağ tarafına yapışık sign in ve sign up buton linkleri */}

        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/signIn" element={<SignIn></SignIn>} />
          <Route path="/signUp" element={<SignUp></SignUp>} />
          <Route path="/userPanel" element={<UserPanel></UserPanel>} />
        </Routes>
        {/* Linkte yapılan bir değişiklikte hangi sayfanın açılacağının ayarlanacağı yönlendirmeler. */}
      </div>
    </Router>
  );
}

export default App;
