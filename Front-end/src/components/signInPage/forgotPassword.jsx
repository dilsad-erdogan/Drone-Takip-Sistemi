import '../ui/sign.css';
import '../ui/homePage.css';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const forgotPassword = () => {
    const [email, setEmail] = useState('');
    const submitEvent = async(event) => {
        event.preventDefault();
    };

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
                <Form className='formContainer' onSubmit={submitEvent}>
                    <Form.Group className='formGroup' controlId='formEmailId'>
                        <Form.Label className='label'>Email Address</Form.Label>
                        <Form.Control className='input' type='email' placeholder='Enter your email address.' value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Form.Group className='formGroup' controlId='formSubmit'>
                        <Button className='button' variant='primary' type='submit'>Send</Button>
                    </Form.Group>

                    <div className='hr'></div>

                    <Form.Group className='foot-lnk'>
                        <p>If you remember your password, <Link to="/signIn">click here</Link></p>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default forgotPassword