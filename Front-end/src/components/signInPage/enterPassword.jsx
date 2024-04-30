import '../ui/sign.css';
import '../ui/homePage.css';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const enterPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
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
                    <Form.Group className='formGroup' controlId='formPassword'>
                        <Form.Label className='label'>Password</Form.Label>
                        <Form.Control className='input' type='password' placeholder='Enter your password.' value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Form.Group className='formGroup' controlId='formPassword'>
                        <Form.Label className='label'>Password Again</Form.Label>
                        <Form.Control className='input' type='password' placeholder='Enter your password again.' value={passwordAgain} onChange={(e) => {setPasswordAgain(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <div className='hr'></div>

                    <Form.Group className='formGroup' controlId='formSubmit'>
                        <Button className='button' variant='primary' type='submit'>Send</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default enterPassword