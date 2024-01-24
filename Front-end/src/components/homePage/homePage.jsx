import '../ui/homePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <nav className="navbar header">
        <div className="container-fluid">
          <Link className="navbar-brand mainPage active" style={{ color: '#b7bac1' }} to="/">
            Ana Sayfa
          </Link>

          <div className="d-flex">
            <Link className="btn btn-outline-light" to="/signIn">
              Sign In
            </Link>
            <Link className="btn btn-outline-light" to="/signUp" style={{ marginLeft: 5 }}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className='container'>
        <div className='pages'>
          <h1>Drone Takip Sistemine Hoşgeldiniz.</h1>
          <p>Burada bizim bilgilerimizi göreceksiniz.</p>
        </div>


      </div>
    </>
  );
};

export default HomePage;