import React, { useState } from 'react'
import {Card, Form} from 'react-bootstrap';

const createPanel = ({panel}) => {
    const [role, setRole] = useState();


    const handleSubmit = (event) => {

    }

    return (
        <>
        {panel === "users" ? 
            (
            <>
                <div>drone create</div>
                <Card style={{margin: 10, padding: 20}}>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formUserRole">
                            <Form.Label>Role Type</Form.Label>
                            <Form.Control type="text" placeholder="Kullanıcı rolunü seçiniz" value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Kullanıcı isminizi giriniz." value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Kullanıcı emailinizi giriniz." value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Kullanıcı passwordünüzü giriniz." value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserCheckPassword">
                            <Form.Label>Password Check</Form.Label>
                            <Form.Control type="text" placeholder="Passwordü tekrar giriniz." value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserCertificate">
                            <Form.Label>Certificate</Form.Label>
                            <Form.Control type="text" placeholder="Kullanıcı certificate seçiniz" value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUserOwner">
                            <Form.Label>Drone Owner</Form.Label>
                            <Form.Control type="text" placeholder="Drone sahibi iseniz işaretleyin." value={role} onChange={(e) => {setRole(e.target.value)}}></Form.Control>
                        </Form.Group>
                    </Form>
                </Card>
            </>
            ) 
            : 
            (
            <>
                <div>user create</div>
                <Card>
                    <Form onSubmit={handleSubmit}>

                    </Form>
                </Card>
            </>
            )
        }
        </>
    )
}

export default createPanel