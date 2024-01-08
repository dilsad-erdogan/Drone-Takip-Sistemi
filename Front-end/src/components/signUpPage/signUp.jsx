import React, { useState } from 'react'
import './signUp.css';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';
import UserModel from '../../../../Back-end/connections/user.js';
const userModel = new UserModel();

const signUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [certificate, setCertificate] = useState('null');
  const [owner, setOwner] = useState(false);
  //Kayıt bilgilerinin tutulacağı bileşenler

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
      pilot_certificate: certificate,
      drone_owner: owner
    };

    userModel.addUser(newUser).then(() => {
      alert("Kayıt işlemi başarıyla tamamlandı!");
      navigate('/signIn');
    }).catch((error) => {
      alert("Kayıt işlemi sırasında bir hata oluştu: " + error.message);
    });
    //userModel'de addUser fonksiyonu çalıştırılıyor ve gelen sonuca göre sonuç olumluysa alert ile belirtiyor ve kullanıcıyı sign in sayfasına atıyor
  }

  return (
    <>
      <div className='containerBorder'>
        <Form className='formContainer' onSubmit={submitEvent}>
          <Form.Group className='formGroup' controlId='formNameId'>
            <Form.Label>İsminizi giriniz</Form.Label>
            <Form.Control type='name' placeholder='İsminizi giriniz.' value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
          </Form.Group>

          <Form.Group className='formGroup' controlId='formEmailId'>
            <Form.Label>Email adresinizi giriniz</Form.Label>
            <Form.Control type='email' placeholder='Email adresinizi giriniz.' value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
          </Form.Group>

          <Form.Group className='formGroup' controlId='formPasswordId'>
            <Form.Label>Şifrenizi giriniz</Form.Label>
            <Form.Control type='password' placeholder='Şifrenizi giriniz.' value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
          </Form.Group>

          <Form.Group className='formGroup' controlId='formPasswordAgainId'>
            <Form.Label>Şifrenizi tekrardan giriniz</Form.Label>
            <Form.Control type='password' placeholder='Şifrenizi tekrardan giriniz.' value={password2} onChange={(e) => {setPassword2(e.target.value)}}></Form.Control>
          </Form.Group>

          <Form.Group className='formGroup' controlId='pilotCertificate'>
            <Form.Label>Pilot sertifikanızı seçiniz.</Form.Label>
            <Form.Control as='select' value={certificate} onChange={(e) => {setCertificate(e.target.value)}}>
              <option value="null">Sertifikam yok.</option>
              <option value="shgm">SHGM izin belgem var.</option>
              <option value="type1">Tip 1.</option>
              <option value="type2">Tip 2.</option>
              <option value="type3">Tip 3.</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className='formGroup' controlId='formOwnerId'>
            <Form.Label>Drone sahibi iseniz kutucuğu işaretleyiniz</Form.Label>
            <Form.Check onChange={(e) => {setOwner(e.target.value)}}></Form.Check>
          </Form.Group>

          <Form.Group className='formGroup'>
            <Button variant='success' type='submit'>Kayıt Ol</Button>
          </Form.Group>

          <p>
            Zaten bir hesabınız var mı? <Link to="/signIn">Giriş Yap</Link>
          </p>
        </Form>
      </div>
      {/* Sign In dosyasında olduğu gibi form tasarımı. */}
    </>
  )
}

export default signUp