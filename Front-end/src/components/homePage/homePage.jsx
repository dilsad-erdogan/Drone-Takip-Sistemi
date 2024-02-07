import '../ui/homePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='bodyPage'>
      <div className="container-fluid d-flex justify-content-between align-items-center" style={{height: 40, margin: 20}}>
        <Link className="navbar-brand active" style={{ color: '#b7bac1' }} to="/">Ana Sayfa</Link>

        <div className="d-flex">
          <Link className="btn btn-outline-light" to="/signIn">Sign In</Link>
          <Link className="btn btn-outline-light" to="/signUp" style={{ marginLeft: 5 }}>Sign Up</Link>
        </div>
      </div>

      <div className='pages'>
        <h1>Drone Takip Sistemine Hoşgeldiniz.</h1>
        <p>Burada bizim bilgilerimizi göreceksiniz.</p>
      </div>
    </div>
  );
};

export default HomePage;