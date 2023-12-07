import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar, Modal, Form } from 'react-bootstrap';
import Map from '../googleMap/googleMap.jsx';
import AdminPanel from '../adminPanel/adminPanel.jsx';
import UserPanel from '../userPanel/userPanel.jsx';

const navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [drone, setDrone] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [certificate, setCertificate] = useState('null');
  const [owner, setOwner] = useState(false);

  const [page, setPage] = useState('admin');
  const [action, setAction] = useState('signIn');

  const getUserData= async () => {
    try{
      const response = await fetch('http://localhost:3000/api/v1/users');

      if(!response.ok){
        throw new Error('API isteği başarısız oldu.');
      }

      const userData = await response.json();
      console.log(userData);
      setData(userData);
    }
    catch(error){
      console.log("Hata", error.message);
    }
  }

  const getDroneData = async() => {
    try{
        const response = await fetch('http://localhost:3000/api/v1/drones');

        if(!response.ok){
            throw new Error('API isteği başarısız oldu.');
        }

        const droneData = await response.json();
        setDrone(droneData);
    }catch (error){
        console.log("Hata: ", error.message);
    }
  };

  useEffect(() => {
    getDroneData();
    getUserData();
  }, []);

  const handleSignInClick = async () => {
    setAction('signIn');
    setShowModal(true);
    setEmail('');
    setPassword('');
  };

  const handleSignUpClick = () => {
    setAction('signUp');
    setShowModal(true);
    setName('');
    setEmail('');
    setPassword('');
    setPassword2('');
    setCertificate('null');
    setOwner(false);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if(action === 'signIn'){ //data sorgulama
      data.forEach(element => {
        element.email === email ? ( element.password === password ? ( element.roletype_id === 3 ? (setPage('user')) : (setPage('admin')) ) : ( console.log("onaysiz1") ) ) : ( console.log("onaysiz2") );
        setShowModal(false);
      });
    }else{ //data ekleme
      let kayitliMi = false;
      data.forEach(element => {
        if(element.email === email){
          kayitliMi = !kayitliMi;
        }
      });

      if(password !== password2){
        alert("Password değerleri uyuşmuyor, lütfen kontrol ediniz.");
        return;
      }

      if(kayitliMi){
        alert("Kullanıcı bilgileri daha önce kullanılmış.");
        return;
      }

      const newUser = {
        name: name,
        email: email,
        password: password,
        pilot_certificate: certificate,
        drone_owner: owner
      };
      
      try{
        const response = await fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if(response.ok){
          console.log('Kullanıcı eklendi.');
          alert("Kullanıcı eklendi.");
        }else{
          console.log('Kullanıcı eklenirken hata oluştu.');
        }
      } catch(error){
        console.log("İstek gönderilirken bir hata oluştu.", error);
      }
    }
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <Nav.Link onClick={handleSignInClick}>Sign In</Nav.Link>
          <Nav.Link onClick={handleSignUpClick}>Sign Up</Nav.Link>
          {page !== "map" ? (<Nav.Link onClick={() => {setPage("map")}}>Quit</Nav.Link>) : (<div></div>)}
        </Nav>
      </Navbar>

      {page === "map" ? <Map markers={drone}></Map> : (page === "user" ? <UserPanel droneData={drone}></UserPanel> : <AdminPanel usersData={data} droneData={drone}></AdminPanel>)}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          {action === 'signIn' ? <Modal.Title>Sign In</Modal.Title> : <Modal.Title>Sign Up</Modal.Title>}
        </Modal.Header>

        <Modal.Body>          
          <Form onSubmit={handleSubmit}>
            {action === 'signIn' ? <div></div>:
              <Form.Group controlId="formBasicName">
                <Form.Label>İsim</Form.Label>
                <Form.Control type="name" placeholder="İsminizi giriniz." value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
              </Form.Group>
            }

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email adresi</Form.Label>
              <Form.Control type="email" placeholder="Email adresinizi giriniz." value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
            </Form.Group>
    
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control type="password" placeholder="Şifresinizi giriniz." value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
            </Form.Group>

            {action === 'signIn' ? <div></div>:
              <div>
                <Form.Group controlId="formBasicPassword2">
                  <Form.Label>Şifre tekrarı</Form.Label>
                  <Form.Control type="password" placeholder="Şifrenizi tekrardan giriniz." value={password2} onChange={(e) => {setPassword2(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group controlId='pilotCertificate'>
                  <Form.Label>Pilot sertifikanızı seçiniz.</Form.Label>
                  <Form.Control as='select' value="null" onChange={(e) => {setCertificate(e.target.value)}}>
                    <option value="null">Sertifikam yok.</option>
                    <option value="shgm">SHGM izin belgem var.</option>
                    <option value="type1">Tip 1.</option>
                    <option value="type2">Tip 2.</option>
                    <option value="type3">Tip 3.</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='droneOwner'>
                  <Form.Label>Drone sahibi iseniz kutucuğu işaretleyiniz.</Form.Label>
                  <Form.Check onChange={(e) => {setOwner(e.target.value)}}></Form.Check>
                </Form.Group>
              </div>
            }
    
            <Form.Group>
              {action === 'signIn' ? <Button variant="primary" type="submit">Giriş</Button> : <Button variant='success' type='submit'>Kayıt Ol</Button>}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default navbar;