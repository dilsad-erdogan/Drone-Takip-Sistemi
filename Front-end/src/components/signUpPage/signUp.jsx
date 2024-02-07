import '../ui/sign.css';
import '../ui/homePage.css';
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';

import UserModel from '../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const signUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const submitEvent = (event) => {
    event.preventDefault();

    if(password !== password2){
      alert("Password değerleri uyuşmuyor, lütfen kontrol ediniz.");
      return;
    }

    const newUser = {
      roletype_id: "3",
      name: name,
      email: email,
      password: password,
      pilot_certificate: 'null',
      drone_owner: false
    };

    userModel.addUser(newUser).then(() => {
      alert("Kayıt işlemi başarıyla tamamlandı!");
      navigate('/signIn');
    }).catch((error) => {
      alert("Kayıt işlemi sırasında bir hata oluştu: " + error.message);
    });
  }

  return (
    <>
      <div className='bodyPage'>
        <div className="container-fluid d-flex justify-content-between align-items-center" style={{height: 40, margin: 20}}>
          <Link className="navbar-brand active" style={{ color: '#b7bac1' }} to="/">Ana Sayfa</Link>

          <div className="d-flex">
            <Link className="btn btn-outline-light" to="/signIn">Sign In</Link>
            <Link className="btn btn-outline-light" to="/signUp" style={{ marginLeft: 5 }}>Sign Up</Link>
          </div>
        </div>

        <div className='pages'>
          <Form className='formContainer' onSubmit={submitEvent}>
            <Form.Group className='formGroup' controlId='formNameId'>
              <Form.Label className='label'>İsminizi giriniz</Form.Label>
              <Form.Control className='input' type='name' placeholder='İsminizi giriniz.' value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group className='formGroup' controlId='formEmailId'>
              <Form.Label className='label'>Email adresinizi giriniz</Form.Label>
              <Form.Control className='input' type='email' placeholder='Email adresinizi giriniz.' value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group className='formGroup' controlId='formPasswordId'>
              <Form.Label className='label'>Şifrenizi giriniz</Form.Label>
              <Form.Control className='input' type='password' placeholder='Şifrenizi giriniz.' value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group className='formGroup' controlId='formPasswordAgainId'>
              <Form.Label className='label'>Şifrenizi tekrardan giriniz</Form.Label>
              <Form.Control className='input' type='password' placeholder='Şifrenizi tekrardan giriniz.' value={password2} onChange={(e) => {setPassword2(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group className='formGroup' controlId='formSubmit'>
              <Button className='button' variant='success' type='submit'>Kayıt Ol</Button>
            </Form.Group>

            <div className='hr'></div>

            <Form.Group className='foot-lnk'>
              <p>If you have an account, <Link to="/signIn">Giriş Yap</Link></p>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default signUp