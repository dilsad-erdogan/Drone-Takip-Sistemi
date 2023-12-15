import React, { useEffect, useState } from 'react'
import {Card, Form, Button} from 'react-bootstrap';
import UserModel from '../../../../Back-end/models/userModel.js';

const userModel = new UserModel();

const createPanel = ({panel, droneData}) => {
    const [role, setRole] = useState('3');
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [certificate, setCertificate] = useState();
    const [owner, setOwner] = useState();

    const [users, setUsers] = useState();
    const [drones, setDrones] = useState(droneData);

    useEffect(() => {
        userModel.fetchUserData().then(() => {
            setUsers(userModel.getUsers());
        });
    }, []);

    const handleSubmitUser = async(event) => {
        event.preventDefault();

        let kayitliMi = false;
        users.forEach(data => {
            if(data.email === email){
                kayitliMi = !kayitliMi;
            }
        });

        if(password !== password2){
            alert("Password değerleri uyuşmuyor, lütfen kontrol ediniz.");
            return;
        }

        if(kayitliMi){
            alert("Kullanıcı bilgileri daha önce kullanılmıştır.");
            return;
        }

        const newUser = {
            roletype_id: role,
            name: name,
            email: email,
            password: password,
            pilot_certificate: certificate,
            drone_owner: owner
        }

        userModel.addUser(newUser);
    }

    const handleSubmitDrone = (event) => {

    }

    return (
        <>
        {panel === "users" ? 
            (
            <>
                <Card style={{margin: 10, padding: 20, gap:2}}>
                    <Form onSubmit={handleSubmitUser}>
                        <Form.Group controlId="formUserRole">
                            <Form.Label>Role Type</Form.Label>
                            <Form.Control type="text" placeholder="Kullanıcı rolunü seçiniz" value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Kullanıcı isminizi giriniz." value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Kullanıcı emailinizi giriniz." value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Kullanıcı passwordünüzü giriniz." value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserCheckPassword">
                            <Form.Label>Password Check</Form.Label>
                            <Form.Control type="password" placeholder="Passwordü tekrar giriniz." value={password2} onChange={(e) => {setPassword2(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserCertificate">
                            <Form.Label>Certificate</Form.Label>
                            <Form.Control as="select" value="null" onChange={(e) => {setCertificate(e.target.value)}}>
                                <option value="null">Sertifikam yok</option>
                                <option value="shgm">SHGM izin belgem var</option>
                                <option value="type1">Tip 1</option>
                                <option value="type2">Tip 2</option>
                                <option value="type3">Tip 3</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserOwner">
                            <Form.Label>Drone Owner</Form.Label>
                            <Form.Check onChange={(e) => {setOwner(e.target.value)}}></Form.Check>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">Kayıt</Button>
                        </Form.Group>
                    </Form>
                </Card>
            </>
            ) 
            : 
            (
            <>
                <Card style={{margin: 10, padding: 20, gap:2}}>
                    <Form onSubmit={handleSubmitDrone}>

                    </Form>
                </Card>
            </>
            )
        }
        </>
    )
}

export default createPanel